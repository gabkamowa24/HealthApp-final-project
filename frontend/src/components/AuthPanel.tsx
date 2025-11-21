import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import { useUser } from '@clerk/clerk-react';
import { StatusMessage } from './StatusMessage';

export const AuthPanel = () => {
  const { user } = useUser();

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <SignedIn>
        <div className="space-y-3 text-sm text-slate-600">
          <p>
            Signed in as{' '}
            <span className="font-semibold text-slate-900">
              {user?.fullName || user?.primaryEmailAddress?.emailAddress}
            </span>
          </p>
          <p>Your bookmarks and topics will stay in sync across devices.</p>
          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
            <span className="text-xs uppercase tracking-wide text-slate-400">Account</span>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="space-y-4 text-sm text-slate-600">
          <p className="text-base font-semibold text-slate-900">Join the Health Library</p>
          <p>Create an account or sign in to save topics, manage bookmarks, and continue anywhere.</p>
          <div className="flex gap-3">
            <SignInButton mode="modal">
              <button className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-primary hover:text-primary">
                Sign in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="flex-1 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90">
                Create account
              </button>
            </SignUpButton>
          </div>
          <StatusMessage message="We use Clerk to keep your account secure." />
        </div>
      </SignedOut>
    </div>
  );
};

