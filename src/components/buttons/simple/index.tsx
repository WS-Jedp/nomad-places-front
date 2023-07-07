import { MouseEventHandler } from "react";
import { LoaderSpinner } from "../../loaders/spinner";

interface SimpleButtonProps {
  text: string;
  action: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean
  loading?: boolean
}

export const SimpleButton: React.FC<SimpleButtonProps> = ({ text, action, disabled = false, loading = false}) => {
  return (
    <button
      disabled={disabled}
      className={`
          w-full max-w-[300px]
          flex items-center justify-center
          bg-blue-500 text-white rounded-full py-1 px-6 mx-1 shadow-md hover:bg-blue-400
          ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
      `}
                  onClick={!disabled && !loading ? action : () => {}}
    >
      {
        loading ? (
          <LoaderSpinner />
        ) : (
          <span className="font-medium text-md">{ text }</span>
        )
      }
    </button>
  );
};

export const SimpleButtonOutline: React.FC<SimpleButtonProps> = ({ text, action }) => {
  return (
    <button
      className="
                  bg-white-500 border-solid border border-gray-400 text-black rounded-full py-1 px-6 mx-1 shadow-md hover:bg-gray-100
                "
      onClick={action}
    >
      <span className="font-medium text-md">{ text }</span>
    </button>
  );
};
