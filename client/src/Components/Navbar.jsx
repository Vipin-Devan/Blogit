import React, { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import logo from '../images/logo.png';
import avatar from '../images/avatar.jpeg';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../App';
const Navbar = () => {
  const folder = process.env.REACT_APP_IMAGE_URL;

  let navigate = useNavigate();

  const { auth, setAuth, reload, setReload } = useContext(AuthContext);

  useEffect(() => {
    const fetchAuthUser = async () => {
      const res = await fetch('http://localhost:3001/auth', {
        method: 'GET',
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      const data = await res.json();

      if (res.ok) {
        setAuth(data);
        setReload(false);
      } else {
        setAuth(null);
      }
    };
    fetchAuthUser();
  }, [auth, reload]);
  const capitalize = (name) => {
    return name.toUpperCase();
  };
  const Logout = () => {
    localStorage.removeItem('token');
    setReload(true);
    navigate('/login');
  };

  return (
    <nav className="w-full h-12  bg-white sticky top-0 flex items-center font-lora">
      <div style={{ flex: 2 }} className="flex items-center justify-center">
        <img src={logo} className="w-30 h-10" alt="logo" />
      </div>
      <div style={{ flex: 5 }}>
        <ul className="flex justify-center m-0 p-0 list-none">
          <li className="cursor-pointer font-light text-lg mx-8">
            <Link to="/">HOME</Link>
          </li>
          {auth && (
            <li className="cursor-pointer font-light text-lg mx-8">
              <Link to="/create">CREATE</Link>
            </li>
          )}
        </ul>
      </div>
      <div style={{ flex: 5 }} className="flex items-end">
        <div>
          <div className="flex justify-center mt-2">
            {auth && (
              <>
                <div>
                  <p className="cursor-pointer font-light text-lg mr-4">
                    <Link to="/userpage">{`HI ${capitalize(auth.username)}`}</Link>
                  </p>
                </div>

                <span className="cursor-pointer font-light text-lg ml-10 mr-4" onClick={Logout}>
                  LOGOUT
                </span>

                <div>
                  <Link to="/profile">
                    <img
                      src={auth.image ? folder + auth.image : avatar}
                      className="ml-20 w-8 h-8 rounded-full items-center cursor-pointer"
                      alt="profilepic"
                    />
                  </Link>
                </div>
              </>
            )}
          </div>

          <ul className="cursor-pointer font-light text-lg mx-8">
            {!auth && (
              <>
                <Link to="/login" className="mr-5">
                  LOGIN
                </Link>
                <Link to="/register">REGISTER</Link>
              </>
            )}
          </ul>
        </div>

        <FontAwesomeIcon className="ml-2 cursor-pointer w-5 h-7" icon={faMagnifyingGlass} />
        <input type="text" placeholder="Search here" className="h-full rounded-md mr-5 ml-2 w-24" />
      </div>
    </nav>
  );
};

export default Navbar;
