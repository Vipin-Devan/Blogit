import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SidebarContent from './SidebarContent';
const Sidebar = () => {
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    const fetchBlog = async () => {
      const res = await axios.get('http://localhost:3001/blog');
      setBlog(res.data.slice(2));
    };
    fetchBlog();
  }, []);
  return (
    <div style={{ flex: 3 }} className="m-5 pb-8 bg-gray-100 flex rounded-lg flex-col items-center h-full">
      <div className="sidebarItem">
        <span className="p-1.5 w-4/5 text-center  font-semibold ">CATEGORIES</span>
        <ul>
          <li className="listItems">
            <Link to={`/?cat=Music`}>Music</Link>
          </li>
          <li className="listItems">
            <Link to={`/?cat=Travel`}>Travel</Link>
          </li>
          <li className="listItems">
            <Link to={`/?cat=Technology`}>Technology</Link>
          </li>
          <li className="listItems">
            <Link to={`/?cat=Science`}>Science</Link>
          </li>
          <li className="listItems">
            <Link to={`/?cat=Art`}>Art</Link>
          </li>
          <li className="listItems">
            <Link to={`/?cat=Sports`}>Sports</Link>
          </li>
          <li className="listItems">
            <Link to={`/?cat=Food`}>Food</Link>
          </li>
        </ul>
      </div>
      <span className=" w-3/5 mt-10 text-center leading-5 font-semibold">TOP PICKS</span>
      <div className="flex flex-wrap ">{blog && blog.map((blog) => <SidebarContent key={blog._id} blog={blog} />)}</div>
    </div>
  );
};

export default Sidebar;
