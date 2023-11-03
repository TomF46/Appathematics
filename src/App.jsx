import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home/Home';
import Play from './pages/Play/Play';
import Leaderboards from './pages/Leaderboards/Leaderboards';
import Header from './components/Header/Header';
import ManageCustomSets from './pages/Custom/Manage/ManageCustomSets';
import ManageCustomSet from './pages/Custom/Manage/ManageCustomSet';
import ManageCustomSetGuide from './pages/Custom/Manage/ManageCustomSetGuide';

const App = () => {
  return (
    <>
      <div className='bg-background'>
        <Header />
        <div className='app-container container mx-auto px-4 lg:px-0 mb-4'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='games/:id/play' element={<Play />} />
            <Route path='/leaderboards' element={<Leaderboards />} />
            <Route path='/custom' element={<ManageCustomSets />} />
            <Route path='/custom/guide' element={<ManageCustomSetGuide />} />
            <Route path='/custom/manage' element={<ManageCustomSet />} />
            <Route path='/custom/:id/manage' element={<ManageCustomSet />} />
            <Route path='*' element={<Home />} />
          </Routes>
        </div>
      </div>
      <ToastContainer autoClose={3000} hideProgressBar theme='colored' />
    </>
  );
};

export default App;
