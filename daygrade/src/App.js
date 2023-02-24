import React, { createContext, useState } from 'react';
import Navbar from './components/Navbar';
import MyRoutes from './MyRoutes';

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id={theme}>
        <Navbar />
        <MyRoutes />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
