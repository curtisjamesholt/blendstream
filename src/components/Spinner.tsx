import { CgSpinner } from 'react-icons/cg';

interface SpinnerProps {
  size?: number;
  className?: string;
}

const Spinner = (props: SpinnerProps) => {
  const { size, className = '' } = props;

  return <CgSpinner size={size} className={`animate-spin ${className}`} />;
};

export default Spinner;
