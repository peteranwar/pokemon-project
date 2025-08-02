interface ErrorDisplayProps {
    message: string;
    onRetry: () => void;
  }
  
  const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">Error: {message}</p>
        <button
          onClick={onRetry}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  };
  
  export default ErrorDisplay;