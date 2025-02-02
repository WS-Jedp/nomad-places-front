import React, { useEffect, useState } from "react";

interface NumberPickerProps {
  onChange: (value: number) => void;
  label: string;
  defaultValue?: number;
}

const NumberPicker: React.FC<NumberPickerProps> = ({
  onChange,
  label,
  defaultValue,
}) => {
  const [currentNumber, setCurrentNumber] = useState(defaultValue || 0);

  function handleMinusClick() {
    if(currentNumber === 0) return
    const currNumber = currentNumber - 1;
    setCurrentNumber(currNumber);
    onChange(currNumber);
  }

  function handlePlusClick() {
    const currNumber = currentNumber + 1;
    setCurrentNumber(currNumber);
    onChange(currNumber);
  }

  function handleOnChangeInput(value: number | string) {
    // Handle NaN possible error to avoid setting NaN as current number
    if (isNaN(parseInt(value.toString()))) return;

    const currNumber = parseInt(value.toString());
    setCurrentNumber(currNumber);
    onChange(currNumber);
  }

  return (
    <div className="relative w-full flex flex-col">
      <label className="text-sm font-semibold my-1 block">{label}</label>
      <div className="flex flex-row flex-nowrap">
        <div
          onClick={currentNumber > 0 ? handleMinusClick : undefined}
          className={` border border-solid border-zinc-400 rounded-md p-1 px-3 text-sm font-light text-coffi-black cursor-pointer ${currentNumber === 0 ? 'opacity-20 cursor-not-allowed' : 'bg-white cursor-pointer'}`}
        >
          -
        </div>
        <input
          value={currentNumber}
          min="0"
          onChange={(e) => handleOnChangeInput(e.target.value)}
          className="w-[72px] bg-white border border-solid border-zinc-400 rounded-md p-1 px-3 text-sm font-light text-coffi-black cursor-pointer mx-1"
          type="number"
        />
        <div
          onClick={handlePlusClick}
          className="bg-white border border-solid border-zinc-400 rounded-md p-1 px-3 text-sm font-light text-coffi-black cursor-pointer"
        >
          +
        </div>
      </div>
    </div>
  );
};

export default NumberPicker;
