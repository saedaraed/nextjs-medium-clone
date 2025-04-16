const Skelton: React.FC = () => {
    return (
      <div className="max-w-3xl mx-auto px-2 py-8 animate-pulse" role="status">
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-64 mb-5"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[600px] mb-3"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-3"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[500px] mb-3"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-3"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[600px]"></div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  };
  
  export default Skelton;
  