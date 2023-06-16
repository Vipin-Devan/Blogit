import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
const Create = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('music');

  const [content, setContent] = useState('');
  const [file, setFile] = useState('');
  const [redirect, setRedirect] = useState(false);
  const onOptionChange = (e) => {
    setCategory(e.target.value);
  };

  async function createBlog(e) {
    e.preventDefault();
    const newBlog = {
      title,
      content,
      category,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      newBlog.image = filename;
      try {
        await axios.post('http://localhost:3001/upload', data);
      } catch (err) {}
    }

    const response = await fetch('http://localhost:3001/create', {
      method: 'POST',
      body: JSON.stringify(newBlog),
      headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') },
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="p-12 pr-16">
      {file && <img src={URL.createObjectURL(file)} className="ml-36 h-64 w-[70vw] object-cover rounded-md mb-5" alt="profilepic" />}
      <form className="w-[70vw] " onSubmit={createBlog}>
        <div className="flex flex-col relative ml-36 w-[70vw] mb-5">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">
            Upload Image
          </label>
          <input
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="title"
            placeholder={'Title'}
            autoFocus={true}
            className="text-lg p-2 w-[70vw] mt-5"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <button className="absolute top-0 right-0 bg-lime-600  rounded-md w-20 text-white text-sm" type="submit">
            publish
          </button>
        </div>
        <div className="border-none flex ml-36 w-[70vw]">
          <ReactQuill
            placeholder="Create your blog.."
            className="border-none w-[68vw] h-60"
            value={content}
            onChange={(newValue) => setContent(newValue)}
          />
          <div className="p-1 flex flex-col text-xs w-[10vw] m-0">
            <h1 className="text-center text-base">Category</h1>
            <div className="flex items-center">
              <input type="radio" name="category" value="Art" id="Art" checked={category === 'Art'} onChange={onOptionChange} />
              <label htmlFor="art">Art</label>
            </div>
            <div className="flex items-center">
              <input type="radio" name="category" value="Science" id="Science" checked={category === 'Science'} onChange={onOptionChange} />
              <label htmlFor="science">Science</label>
            </div>
            <div className="flex items-center">
              <input type="radio" name="category" value="Technology" id="Technology" checked={category === 'Technology'} onChange={onOptionChange} />
              <label htmlFor="Technology">Technology</label>
            </div>
            <div className="flex items-center">
              <input type="radio" name="category" value="Music" id="Music" checked={category === 'Music'} onChange={onOptionChange} />
              <label htmlFor="Music">Music</label>
            </div>
            <div className="flex items-center">
              <input type="radio" name="category" value="Sports" id="Sports" checked={category === 'Sports'} onChange={onOptionChange} />
              <label htmlFor="Sports">Sports</label>
            </div>
            <div className="flex items-center">
              <input type="radio" name="category" value="Travel" id="Travel" checked={category === 'Travel'} onChange={onOptionChange} />
              <label htmlFor="Travel">Travel</label>
            </div>
            <div className="flex items-center">
              <input type="radio" name="category" value="Food" id="Food" checked={category === 'Food'} onChange={onOptionChange} />
              <label htmlFor="Food">Food</label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Create;
