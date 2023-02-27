import React, { createContext, useState } from 'react';
import Navbar from './components/Navbar';
import MyRoutes from './MyRoutes';
import ReactSwitch from 'react-switch';

export const ThemeContext = createContext(null);

let toggledTheme;
let mode;

function App() {
  const [theme, setTheme] = useState('dark');

  toggledTheme = function toggleTheme() {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  };

  mode = theme;

  return (
    <ThemeContext.Provider value={{ theme, toggledTheme }}>
      <div id={theme}>
        <Navbar />
        <MyRoutes />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;

export function reactSwitch() {
  return <ReactSwitch onChange={toggledTheme} checked={mode === 'dark'} />;
}
