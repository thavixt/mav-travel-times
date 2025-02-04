import LoaderAnimation from '../assets/grid.svg';

interface LoaderProps {
  text?: string;
}

export function Loader({text}: LoaderProps) {
  return (
    <div className="size-full flex flex-col space-y-2 p-4 items-center justify-center">
      <img className='size-24 self-center' src={LoaderAnimation} alt="Loading..." />
      {text ? (<p className='text-center font-semibold text-slate-600'>{text}</p>) : null}
    </div>
  )
}