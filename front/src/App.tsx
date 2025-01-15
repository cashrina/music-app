import Artists from './features/artists/components/Artists.tsx';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <>
      <main>
        <Routes>
          <Route path='/' element={<Artists />} />
        </Routes>
      </main>
    </>
  )
};

export default App
