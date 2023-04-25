import { MouseEventHandler } from "react";

interface InputButtonProps {
  text: string;
  action: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
}

export const InputButton: React.FC<InputButtonProps> = ({ text, action, type = 'button', isLoading}) => {
  return (
    <button
      className="
                    w-full
                    flex flex-row flex-nowrap items-center justify-center
                    text-center
                   text-white rounded-lg py-2 px-6 shadow-sm
                    bg-blue-400 hover:bg-blue-300
                    outline-none focus:outline-none
                  "
                  onClick={action}
    >
      { isLoading ? (
          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
            <circle className="opacity-25 bg-blue-500" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
      ) : (
        <span className="font-semibold text-md text-center">{ text }</span>
      ) 
      
    }
      
    </button>
  );
};

