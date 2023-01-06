import Spinner from './Spinner';

const LoadingPage = () => {
  return (
    <div className="flex flex-grow items-center justify-center">
      <Spinner size={24} />
    </div>
  );
};

export default LoadingPage;
