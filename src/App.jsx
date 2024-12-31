import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import LoginAuth from './components/authPages/Login'
import UserPage from './components/authPages/ActiveUsers'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginAuth />} />
        <Route path="/auth" element={<HomePage />} />
        <Route path="/userPage" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
