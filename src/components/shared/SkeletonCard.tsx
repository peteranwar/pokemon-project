const SkeletonCard = () => {
    return (
      <div className="p-2 rounded-lg overflow-hidden shadow-md bg-white animate-pulse w-full">
        <div className="h-40 bg-gray-200"></div>
        <div className="p-4 space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  };
  
  export default SkeletonCard;