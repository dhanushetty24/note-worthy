import CreateNote from '../components/CreateNote';
import Header from '../components/Header';

const Container = () => {
  return (
    <>
      <main className='container'>
        <Header />
        <CreateNote />
      </main>
    </>
  );
};

export default Container;
