export const SideBar = () => {
  return (
    <aside className="w-full flex flex-col gap-6 p-4 sticky top-16 z-10">
      {/* Latest News */}
      <div className="border border-gray-200 rounded-lg shadow-md overflow-hidden bg-white">
        <p className="text-lg font-semibold text-center text-black border-b border-gray-100 py-3">
          Latest News
        </p>
        <div className="h-[300px] w-full">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4ZOzVPR43BhdRWjLjWW4LbWxBXHaaD42Hyw&s"
            alt="Latest News"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Viral Stories */}
      <div className="border border-gray-200 rounded-lg shadow-md overflow-hidden bg-white">
        <p className="text-lg font-semibold text-center text-black border-b border-gray-100 py-3">
          Viral Stories
        </p>
        <div className="h-[300px] w-full">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfOv-_zk4HmJbRv5oQ0HYwh8FZ0znD6gzXsw&s"
            alt="Viral Stories"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </aside>
  );
};
