/**
 * Attaches the logged-in user's token to every /api/ request, so the
 * backend's requireAuth check accepts it. If the server rejects the token
 * (expired / logged out elsewhere), the local session is cleared and the
 * page reloads to the login screen.
 */
const TOKEN_KEY = 'sehatsure_auth_token';
const originalFetch = window.fetch.bind(window);

window.fetch = async (input, init = {}) => {
  const url = typeof input === 'string' ? input : input?.url || '';
  const isApi = url.startsWith('/api/') || url.includes('/api/');
  if (!isApi) return originalFetch(input, init);

  let token = null;
  try { token = localStorage.getItem(TOKEN_KEY); } catch { /* storage blocked */ }

  const headers = new Headers(init.headers || (typeof input !== 'string' ? input.headers : undefined) || {});
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await originalFetch(input, { ...init, headers });

  const isAuthRoute = url.includes('/api/auth/login') || url.includes('/api/auth/signup');
  if (res.status === 401 && token && !isAuthRoute) {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem('sehatsure_auth_user');
      localStorage.removeItem('sehatsure_saved_hospitals');
    } catch { /* ignore */ }
    window.location.reload();
  }
  return res;
};
