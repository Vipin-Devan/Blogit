import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import avatar from '../images/avatar.jpeg';
import { AuthContext } from '../App';
const Profile = () => {
  const folder = process.env.REACT_APP_IMAGE_URL;
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { auth } = useContext(AuthContext);
  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const updateUser = {
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      updateUser.image = filename;
      try {
        await axios.post('http://localhost:3001/upload', data);
      } catch (err) {}
    }
    const response = await fetch(`http://localhost:3001/profile/${auth._id}`, {
      method: 'PUT',
      body: JSON.stringify(updateUser),
      headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') },
      credentials: 'include',
    });
    if (response.ok) {
      navigate('/');
    }
  }
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/profile/${auth._id}`, {
        headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') },
        data: {},
      });
      navigate('/');
    } catch (err) {}
  };
  return (
    <div className="mt-16 relative flex justify-center align-middle">
      <div className="relative w-6/12 p-5">
        <div className="flex ">
          <span className=" text-3xl mb-5 text-fuchsia-900 ">Update Your Account</span>
          <button
            className="w-40 ml-40 self-center border-none rounded-lg p-2.5 mt-5 cursor-pointer bg-rose-500 hover:bg-pink-950"
            onClick={handleDelete}
          >
            Delete Account
          </button>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label className="text-lg mt-5">Profile Picture</label>
          <div className="flex items-center mt-2 mb-2">
            <img
              src={file ? URL.createObjectURL(file) : auth.image ? folder + auth.image : avatar}
              className=" w-16 h-16 rounded-2xl object-cover"
              alt=""
            />
            <label className="text-lg mt-5" htmlFor="fileInput">
              <FontAwesomeIcon icon={faUserPen} className="cursor-pointer  ml-3" />
            </label>
            <input
              className="mt-2 mb-2 h-5 border-none border-b-gray-500"
              type="file"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label className="text-lg mt-5">Username</label>
          <input
            className="mt-2 mb-2 h-5 border-none border-b-gray-500"
            type="text"
            placeholder={auth.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="text-lg mt-5">Email</label>
          <input
            className="mt-2 mb-2 h-5 border-none border-b-gray-500"
            type="email"
            placeholder={auth.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="text-lg mt-5">Password</label>
          <input
            className="mt-2 mb-2 h-5 border-none border-b-gray-500"
            type="password"
            placeholder="Enter new password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className=" w-40 self-center border-none rounded-lg p-2.5 mt-5 cursor-pointer bg-cyan-500 hover:bg-cyan-600 " type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
