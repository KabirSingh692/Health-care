import React, { useEffect, useRef, useState } from 'react';
import { FileText, Building2, Calculator, ShieldCheck, ClipboardCheck } from 'lucide-react';

/**
 * Hero 3D scene for the NEXTCARE landing page.
 *
 * HOW TO ADD YOUR SPLINE SCENE:
 *   1. Make a scene on spline.design → Export → "Code Export" → copy the
 *      ".splinecode" URL (looks like https://prod.spline.design/XXXX/scene.splinecode).
 *   2. Put it in frontend/.env (and in Render's environment variables):
 *        VITE_SPLINE_SCENE_URL=https://prod.spline.design/XXXX/scene.splinecode
 *   3. Rebuild. The Spline viewer script is only downloaded when this is set.
 *
 * If the URL is empty, or the scene fails to load within 12s, the built-in
 * interactive fallback below is shown instead, so the page never breaks.
 */
const SPLINE_SCENE_URL = import.meta.env.VITE_SPLINE_SCENE_URL || '';
const SPLINE_VIEWER_SRC = 'https://unpkg.com/@splinetool/viewer@1.9.48/build/spline-viewer.js';

let viewerScriptPromise = null;
function loadSplineViewer() {
  if (viewerScriptPromise) return viewerScriptPromise;
  viewerScriptPromise = new Promise((resolve, reject) => {
    if (window.customElements && window.customElements.get('spline-viewer')) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.type = 'module';
    script.src = SPLINE_VIEWER_SRC;
    script.onload = () => resolve();
    script.onerror = () => {
      viewerScriptPromise = null;
      reject(new Error('Spline viewer failed to load'));
    };
    document.head.appendChild(script);
  });
  return viewerScriptPromise;
}

function SplineViewer({ url, onFail }) {
  const hostRef = useRef(null);
  const [ready, setReady] = useState(false);
  const readyRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    const timeout = setTimeout(() => {
      if (!cancelled && !readyRef.current) onFail();
    }, 12000);

    loadSplineViewer()
      .then(() => {
        if (cancelled || !hostRef.current) return;
        const viewer = document.createElement('spline-viewer');
        viewer.setAttribute('url', url);
        viewer.setAttribute('loading-anim-type', 'none');
        viewer.style.width = '100%';
        viewer.style.height = '100%';
        viewer.addEventListener('load-complete', () => {
          readyRef.current = true;
          if (!cancelled) setReady(true);
        });
        hostRef.current.innerHTML = '';
        hostRef.current.appendChild(viewer);
      })
      .catch(() => {
        if (!cancelled) onFail();
      });

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return (
    <div className={`nc-spline-host ${ready ? 'is-ready' : ''}`} ref={hostRef} aria-label="Interactive 3D scene" />
  );
}

const NODES = [
  { id: 'policy', Icon: FileText, label: 'Policy', text: 'Your policy PDF becomes clear rules: limits, co-pay, exclusions.', x: 14, y: 22 },
  { id: 'hospital', Icon: Building2, label: 'Hospitals', text: 'Hospitals ranked by how well they fit your cover.', x: 80, y: 18 },
  { id: 'cost', Icon: Calculator, label: 'Your cost', text: 'An estimated bill and what you may pay yourself.', x: 84, y: 74 },
  { id: 'journey', Icon: ClipboardCheck, label: 'Care journey', text: 'Guidance from admission to claim settlement.', x: 12, y: 78 }
];

function FallbackScene() {
  const sceneRef = useRef(null);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return undefined;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;

    let frame = null;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--rx', `${(-py * 14).toFixed(2)}deg`);
        el.style.setProperty('--ry', `${(px * 18).toFixed(2)}deg`);
      });
    };
    const onLeave = () => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const activeNode = NODES.find((n) => n.id === active);

  return (
    <div className="nc-scene" ref={sceneRef}>
      <div className="nc-scene-stage">
        <svg className="nc-scene-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {NODES.map((n) => (
            <line
              key={n.id}
              x1="50" y1="50" x2={n.x} y2={n.y}
              className={active === n.id ? 'is-active' : ''}
            />
          ))}
        </svg>

        <div className="nc-orb" aria-hidden="true">
          <div className="nc-orb-ring nc-orb-ring-1" />
          <div className="nc-orb-ring nc-orb-ring-2" />
          <div className="nc-shield">
            <ShieldCheck size={56} strokeWidth={1.4} />
          </div>
        </div>

        {NODES.map((n, i) => (
          <button
            key={n.id}
            type="button"
            className={`nc-node ${active === n.id ? 'is-active' : ''}`}
            style={{ left: `${n.x}%`, top: `${n.y}%`, animationDelay: `${i * 0.6}s` }}
            onMouseEnter={() => setActive(n.id)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(n.id)}
            onBlur={() => setActive(null)}
            onClick={() => setActive(active === n.id ? null : n.id)}
            aria-label={`${n.label}: ${n.text}`}
          >
            <n.Icon size={20} strokeWidth={1.7} />
            <span>{n.label}</span>
          </button>
        ))}
      </div>

      <div className="nc-scene-caption" aria-live="polite">
        {activeNode ? activeNode.text : 'One policy, connected to hospitals, costs and your care journey.'}
      </div>
    </div>
  );
}

export default function SplineScene() {
  const [failed, setFailed] = useState(false);
  if (SPLINE_SCENE_URL && !failed) {
    return (
      <div className="nc-scene nc-scene-spline">
        <SplineViewer url={SPLINE_SCENE_URL} onFail={() => setFailed(true)} />
      </div>
    );
  }
  return <FallbackScene />;
}
