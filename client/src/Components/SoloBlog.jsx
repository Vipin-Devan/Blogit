import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { faUserPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import moment from 'moment';
import { AuthContext } from '../App';

const SoloBlog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useContext(AuthContext);
  const path = location.pathname.split('/')[2];
  const [blog, setBlog] = useState({});
  const folder = 'http://localhost:3001/images/';
  useEffect(() => {
    const fetchBlog = async () => {
      const res = await axios.get(`http://localhost:3001/blog/${path}`);
      setBlog(res.data);
    };
    fetchBlog();
  }, [path]);
  const capitalize = (name) => {
    return name?.toUpperCase();
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/blog/${blog._id}`, {
        headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') },
        data: {},
      });
      navigate('/');
    } catch (err) {}
  };

  return (
    <div className="m-10">
      <div>
        <img src={folder + blog.image} className="w-full h-96 object-cover rounded-md" alt="profilepic" />
        <h1 className="text-3xl text-center">
          {blog.title}
          {auth?.username === blog.author?.username && (
            <div className="float-right text-base">
              <Link to={`/edit/${blog._id}`}>
                <FontAwesomeIcon icon={faUserPen} className="cursor-pointer  ml-3" />
              </Link>
              <FontAwesomeIcon icon={faTrashCan} className="cursor-pointer ml-3" onClick={handleDelete} />
            </div>
          )}
        </h1>
        <div className="mt-5 mb-4 flex justify-between">
          <span>Authored by:{capitalize(blog.author?.username)}</span>
          <span>{moment(blog.createdAt).fromNow()}</span>
        </div>

        <div
          className="first-letter:ml-5 first-letter:text-3xl first-letter:text-blue-600 first-letter:pr-0"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </div>
  );
};

export default SoloBlog;
