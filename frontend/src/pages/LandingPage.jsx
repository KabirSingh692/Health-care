import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, AlertCircle, ArrowRight, FileText, Building2, Calculator, Activity } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SplineScene from '../components/SplineScene';
import LanguageSelector from '../components/LanguageSelector';
import '../landing.css';

const FEATURES = [
  { Icon: FileText, title: 'Read your policy', text: 'Upload the PDF. Limits, co-pay, room rent and exclusions become clear, checkable rules.' },
  { Icon: Building2, title: 'Rank hospitals by fit', text: 'Hospitals in your city scored by how well they match your cover, not just price or rating.' },
  { Icon: Calculator, title: 'See your share', text: 'An estimated bill and what you may pay yourself, with every step of the maths shown.' },
  { Icon: Activity, title: 'Follow the journey', text: 'Guidance from admission and pre-auth to discharge and claim settlement.' }
];

function AuthCard() {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isSignup = mode === 'signup';

  const switchMode = (next) => {
    setMode(next);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (isSignup) {
      if (!name.trim()) return setError('Please enter your full name.');
      if (!email.trim() || !email.includes('@')) return setError('Please enter a valid email address.');
      if (password.length < 6) return setError('Password must be at least 6 characters.');
      if (password !== confirmPassword) return setError('Passwords do not match.');
    } else {
      if (!email.trim()) return setError('Please enter your email address.');
      if (!password) return setError('Please enter your password.');
    }

    setLoading(true);
    try {
      if (isSignup) {
        await signup(name, email, password, confirmPassword);
      } else {
        await login(email, password);
      }
      // On success the AuthContext user is set and App switches to the upload page.
    } catch (err) {
      setError(err.message || (isSignup ? 'Sign up failed.' : 'Login failed.'));
      setLoading(false);
    }
  };

  return (
    <div className="nc-auth-card" id="nc-auth">
      <div className="nc-auth-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={!isSignup}
          className={!isSignup ? 'is-active' : ''}
          onClick={() => switchMode('login')}
        >
          Log in
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={isSignup}
          className={isSignup ? 'is-active' : ''}
          onClick={() => switchMode('signup')}
        >
          Sign up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="nc-auth-form" noValidate>
        {isSignup && (
          <label className="nc-field">
            <UserIcon size={16} aria-hidden="true" />
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </label>
        )}
        <label className="nc-field">
          <Mail size={16} aria-hidden="true" />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </label>
        <label className="nc-field">
          <Lock size={16} aria-hidden="true" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={isSignup ? 'new-password' : 'current-password'}
          />
        </label>
        {isSignup && (
          <label className="nc-field">
            <Lock size={16} aria-hidden="true" />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
          </label>
        )}

        {error && (
          <div className="nc-auth-error" role="alert">
            <AlertCircle size={15} />
            <span>{error}</span>
          </div>
        )}

        <button type="submit" className="nc-btn-primary" disabled={loading}>
          {loading ? 'Please wait…' : isSignup ? 'Create account' : 'Log in'}
          {!loading && <ArrowRight size={16} />}
        </button>
      </form>

      <p className="nc-auth-switch">
        {isSignup ? 'Already have an account?' : 'New to NEXTCARE?'}{' '}
        <button type="button" onClick={() => switchMode(isSignup ? 'login' : 'signup')}>
          {isSignup ? 'Log in' : 'Create one'}
        </button>
      </p>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="nc-landing">
      <header className="nc-top">
        <div className="nc-brand">
          <img src="/sehatsure-logo.png" alt="" className="nc-brand-logo" />
          <span>NEXTCARE</span>
        </div>
        <div className="nc-top-actions">
          <LanguageSelector compact />
        </div>
      </header>

      <section className="nc-hero">
        <div className="nc-hero-copy">
          <span className="nc-eyebrow">Health insurance · Hospitals · Your cost</span>
          <h1>
            Know what you'll pay, <em>before</em> you choose the hospital.
          </h1>
          <p className="nc-lede">
            NEXTCARE reads your insurance policy, ranks hospitals by how well they fit your cover,
            and shows your likely out-of-pocket cost in plain language.
          </p>
          <AuthCard />
        </div>

        <div className="nc-hero-visual">
          <SplineScene />
        </div>
      </section>

      <section className="nc-features" aria-label="What NEXTCARE does">
        {FEATURES.map(({ Icon, title, text }) => (
          <article className="nc-feature" key={title}>
            <div className="nc-feature-icon"><Icon size={20} strokeWidth={1.7} /></div>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <footer className="nc-foot">
        <span>NEXTCARE · Team Epigenome</span>
        <span>
          Estimates are decision support, not a guarantee of coverage or claim approval.
          Always confirm with your insurer and hospital.
        </span>
      </footer>
    </div>
  );
}
