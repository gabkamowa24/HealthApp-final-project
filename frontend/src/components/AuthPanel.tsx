import type { FormEvent } from 'react';
import { useState } from 'react';
import { login, register } from '../services/api';
import { useAppContext } from '../context/AppContext';
import { StatusMessage } from './StatusMessage';

export const AuthPanel = () => {
  const { token, setToken } = useAppContext();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const payload =
        mode === 'register'
          ? await register(form)
          : await login({ email: form.email, password: form.password });
      setToken(payload.token);
      setStatus({ type: 'success', text: `Signed in as ${payload.name}` });
    } catch (error) {
      setStatus({ type: 'error', text: 'Authentication failed. Try again.' });
    }
  };

  if (token) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-white p-6 text-sm text-slate-600 shadow-sm">
        <p>You are signed in. Bookmarked topics will sync across devices.</p>
        <button
          type="button"
          className="mt-4 rounded-full border border-slate-200 px-4 py-2 text-xs"
          onClick={() => setToken(null)}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <form
      className="space-y-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
      onSubmit={handleSubmit}
    >
      <div className="flex gap-2">
        <button
          type="button"
          className={`flex-1 rounded-full px-3 py-2 text-sm ${
            mode === 'login' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'
          }`}
          onClick={() => setMode('login')}
        >
          Login
        </button>
        <button
          type="button"
          className={`flex-1 rounded-full px-3 py-2 text-sm ${
            mode === 'register' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'
          }`}
          onClick={() => setMode('register')}
        >
          Register
        </button>
      </div>
      {mode === 'register' && (
        <input
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          placeholder="Full name"
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          required
        />
      )}
      <input
        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
        placeholder="Email address"
        type="email"
        value={form.email}
        onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
        required
      />
      <input
        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
        required
      />
      <button
        type="submit"
        className="w-full rounded-full bg-primary px-4 py-2 text-sm font-medium text-white"
      >
        {mode === 'login' ? 'Sign in' : 'Create account'}
      </button>
      {status && (
        <StatusMessage message={status.text} variant={status.type === 'error' ? 'error' : 'info'} />
      )}
    </form>
  );
};

