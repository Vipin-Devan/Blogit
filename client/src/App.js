// import logo from './images/logo.png';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Create from './pages/Create';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SingleBlog from './pages/SingleBlog';
import Navbar from './Components/Navbar';
import UserPage from './pages/UserPage';
import { createContext, useState } from 'react';
import Edit from './pages/Edit';
import Profile from './pages/Profile';
export const AuthContext = createContext();
function App() {
  const [reload, setReload] = useState(false);
  const [auth, setAuth] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <AuthContext.Provider value={{ auth, setAuth, reload, setReload, searchTerm, setSearchTerm }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/create" element={<Create />}></Route>
          <Route path="/blog/:id" element={<SingleBlog />}></Route>
          <Route path="/edit/:id" element={<Edit />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/userpage" element={<UserPage />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
