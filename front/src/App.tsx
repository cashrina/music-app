import Artists from './features/artists/components/Artists.tsx';
import Albums from './features/albums/components/Albums.tsx';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <>
      <main>
        <Routes>
          <Route path='/' element={<Artists />} />
          <Route path="/artists/:id" element={<Albums />} />
        </Routes>
      </main>
    </>
  )
};

export default App
