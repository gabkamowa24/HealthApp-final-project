type Props = {
  message: string;
  variant?: 'info' | 'error';
};

export const StatusMessage = ({ message, variant = 'info' }: Props) => (
  <div
    className={`rounded-xl border px-4 py-3 text-sm ${
      variant === 'error'
        ? 'border-red-200 bg-red-50 text-red-700'
        : 'border-slate-200 bg-white text-slate-600'
    }`}
  >
    {message}
  </div>
);

