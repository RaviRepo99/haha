import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const expectedEmail = ((import.meta.env.VITE_RESOURCES_EMAIL || '').trim().toLowerCase());
const expectedPassword = (import.meta.env.VITE_RESOURCES_PASSWORD || '').trim();
const PASSWORD_MIN_LENGTH = 8;

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('ccrc-resources-auth');
    if (stored === 'true') {
      navigate('/resources/dashboard');
    }
  }, [navigate]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (lockedUntil && Date.now() < lockedUntil) {
      setError('Too many failed attempts. Please wait a moment and try again.');
      return;
    }

    if (!expectedEmail || !expectedPassword) {
      setError('Access is not configured yet. Please contact the administrator.');
      return;
    }

    if (password.length < PASSWORD_MIN_LENGTH) {
      setError('Password is too short.');
      return;
    }

    setLoading(true);

    window.setTimeout(() => {
      const normalizedEmail = email.trim().toLowerCase();
      const validEmail = normalizedEmail === expectedEmail;
      const validPassword = password.length === expectedPassword.length && password === expectedPassword;

      if (!validEmail || !validPassword) {
        const nextAttempts = attempts + 1;
        setAttempts(nextAttempts);

        if (nextAttempts >= 3) {
          setLockedUntil(Date.now() + 30000);
          setError('Too many failed attempts. Please wait 30 seconds before trying again.');
        } else {
          setError('Invalid credentials. Please try again.');
        }

        setPassword('');
        setLoading(false);
        return;
      }

      setAttempts(0);
      setLockedUntil(null);

      if (rememberMe) {
        localStorage.setItem('ccrc-resources-auth', 'true');
      } else {
        localStorage.removeItem('ccrc-resources-auth');
      }

      setPassword('');
      navigate('/resources/dashboard');
    }, 600);
  };

  return (
    <section className="min-h-[calc(100vh-6rem)] flex items-center justify-center bg-white px-4 pt-40 pb-10 sm:px-6 sm:pt-48 sm:pb-12 dark:bg-slate-950">
      <div className="w-full max-w-sm rounded-[2rem] border border-red-200 bg-white p-7 shadow-[0_20px_80px_rgba(220,38,38,0.12)] backdrop-blur-xl transition-all duration-500 ease-out dark:border-red-900/40 dark:bg-slate-950/95 dark:shadow-[0_20px_80px_rgba(0,0,0,0.45)] motion-safe:transform-gpu hover:-translate-y-1">
        <div className="flex flex-col items-center gap-4 text-center">
          <img src="/ccrc_it_logo.jpg" alt="CCRC IT Club Logo" className="h-20 w-auto object-contain" />
          <div>
            <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Sign in to CCRC Resources</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">Enter your credentials to access the club's protected resources.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            autoComplete="email"
            spellCheck={false}
            className="w-full rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/20 dark:border-red-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-red-500 dark:focus:bg-slate-900"
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              className="w-full rounded-3xl border border-red-200 bg-red-50 px-5 py-4 pr-12 text-sm text-slate-900 outline-none transition focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/20 dark:border-red-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-red-500 dark:focus:bg-slate-900"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
              {showPassword ? <EyeOff className="h-4 w-4 text-red-500" /> : <Eye className="h-4 w-4 text-red-400" />}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} className="rounded border-red-300 bg-transparent accent-red-500" />
              Remember me
            </label>
            <span className="text-xs text-slate-500 dark:text-slate-400">Secure sign-in</span>
          </div>

          {error && (
            <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>
          )}

          <button type="submit" className="w-full rounded-3xl bg-rose-600 px-5 py-4 text-sm font-semibold text-white transition hover:bg-rose-700">
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">© {new Date().getFullYear()} CCRC IT CLUB | Secure • Fast • Accurate</p>
      </div>
    </section>
  );
};

export default LoginPage;
