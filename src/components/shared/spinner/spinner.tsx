import './spinner.css';

type SpinnerProps = {
  description: string;
}

export default function Spinner({description}: SpinnerProps) {
  return (
    <div className='spinner'>
      <div className='spinner__element'></div>
      <span className='spinner__text'>{description}</span>
    </div>
  );
}
