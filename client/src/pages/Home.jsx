import Blogs from '../Components/Blogs';
import Main from '../Components/Main';
import Sidebar from '../Components/Sidebar';
const Home = () => {
  return (
    <div>
      <Main />
      <div className="flex">
        <Sidebar />
        <Blogs />
      </div>
    </div>
  );
};

export default Home;
