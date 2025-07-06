import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">CarKraze</h1>
      <nav className="flex gap-3">
        <div className="flex items-center px-4 py-2 rounded-lg bg-zinc-300">
          <span className="text-sm">Fuel</span>
          <svg viewBox="0 0 10 11" fill="none" className="ml-2 w-2.5 h-2.5">
            <path d="M9 1H1L5 9L9 1Z" stroke="black" />
          </svg>
        </div>
        <div className="flex items-center px-4 py-2 rounded-lg bg-zinc-300">
          <span className="text-sm">Maharashtra</span>
          <svg viewBox="0 0 10 11" fill="none" className="ml-2 w-2.5 h-2.5">
            <path d="M9 1H1L5 9L9 1Z" stroke="black" />
          </svg>
        </div>
      </nav>
    </header>
  );
};

export default Header;
