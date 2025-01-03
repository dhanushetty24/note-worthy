import { useContext, useEffect } from 'react';
import CreateNote from '../components/CreateNote';
import Header from '../components/Header';
import ToggleSwitch from '../components/ToggleSwitch';
import { ThemeContext } from '../context/ThemeContext';

const Container = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <>
      <Header />
      <main className='container'>
        <CreateNote />
        <ToggleSwitch />
      </main>
    </>
  );
};

export default Container;
