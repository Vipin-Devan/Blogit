import axios from 'axios';
import { useEffect, useState, useContext } from 'react';

import Usersolo from '../Components/Usersolo';
import { AuthContext } from '../App';
const UserPage = () => {
  const { auth } = useContext(AuthContext);
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const updateBlog = async () => {
      const res = await axios.get(`http://localhost:3001/blog?user=${auth?.username}`);

      setBlog(res.data);
    };
    updateBlog();
  }, []);
  return (
    <>
      <span className="flex flex-col font-open items-center text-3xl font-semibold italic color text-gray-800">My Blogs</span>
      <div className=" mt-10 p-10 ml-50 flex justify-center items-center">
        <div className="flex">{blog && blog.map((blog) => <Usersolo key={blog._id} blog={blog} />)}</div>
      </div>
    </>
  );
};

export default UserPage;
