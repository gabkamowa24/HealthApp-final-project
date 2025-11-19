import { Link, NavLink } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAppContext } from '../context/AppContext';

const navClasses = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition ${
    isActive ? 'bg-primary text-white' : 'text-slate-700 hover:bg-slate-100'
  }`;

export const Layout = ({ children }: { children: ReactNode }) => {
  const { search, setSearch } = useAppContext();

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-6 sm:flex-nowrap">
          <Link to="/" className="text-xl font-semibold text-primary">
            Health Info Hub
          </Link>
          <nav className="flex flex-1 flex-wrap gap-2">
            <NavLink to="/" className={navClasses} end>
              Topics
            </NavLink>
            <NavLink to="/bookmarks" className={navClasses}>
              Bookmarks
            </NavLink>
          </nav>
          <input
            type="search"
            placeholder="Search topics..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm focus:border-primary focus:outline-none"
          />
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
};

