import {Link} from 'react-router-dom'
const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <img className="w-[80%]" src="404.jpg" alt="" / >
      <h1 className="text-[2rem] font-bold">Page Not Found</h1>
    </div>
  );
};

export default NotFoundPage;
