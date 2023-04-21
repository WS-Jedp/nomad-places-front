import { MouseEventHandler } from "react";

interface SimpleButtonProps {
  text: string;
  action: MouseEventHandler<HTMLButtonElement>;
}

export const SimpleButton: React.FC<SimpleButtonProps> = ({ text, action }) => {
  return (
    <button
      className="
                  bg-blue-500 text-white rounded-full py-1 px-6 mx-1 shadow-md hover:bg-blue-400
                  "
                  onClick={action}
    >
      <span className="font-medium text-md">{ text }</span>
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
