import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-overlay bg-dark bg-opacity-50 z-3">
      <span className="loader"></span>
    </div>
  );
};

export default LoadingSpinner;
