import React from 'react';
import { Link } from 'react-router-dom';

const SidebarContent = (props) => {
  const { title, _id, content, image } = props.blog;
  const folder = process.env.REACT_APP_IMAGE_URL;
  return (
    <>
      <div className="sidebarItem">
        <Link to={`/blog/${_id}`}>
          <img src={folder + image} className="mt-3.5 w-full h-44 object-cover rounded-md" alt="profilepic" />
        </Link>
        <p className="text-sm items-center">
          <Link to={`/blog/${_id}`}>{title}</Link>
        </p>

        <div className="line-clamp-4 w-4/5 mt-2 mb-5 text-xs" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </>
  );
};

export default SidebarContent;
