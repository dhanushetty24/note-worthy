import Container from './pages/Container'
import ThemeContextProvider from './context/ThemeContext';

const App= () => {
  return (
    <ThemeContextProvider>
      <Container />
    </ThemeContextProvider>
  );
}

export default App;
