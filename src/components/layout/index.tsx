import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="container mx-auto">
      <div className="min-h-screen bg-blue-100 py-4 md:py-10 my-8 rounded-2xl">
        <header className="w-full text-center mb-6 p-3">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">
            Pokémon App
          </h1>
          <p className="text-md md:text-lg font-medium text-gray-500">
            Discover and explore the world of Pokémon with this app.
          </p>
        </header>
        <main className="max-w-7xl mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </div>

  );
};

export default Layout;