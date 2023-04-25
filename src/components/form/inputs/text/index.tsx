import { useState } from "react";

type TextInputProps = {
    label: string;
    placeholder: string;
    callback: (value: string) => void;
    type?: 'email' | 'password' | 'text'
    value: string;
    isError?: boolean;
    isValid?: boolean;
    feedbackMessage?: string;
}

export const TextInput: React.FC<TextInputProps> = ({ label, placeholder, callback, type = 'text', value, isError, isValid, feedbackMessage }) => {

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        callback(e.target.value)
    }

    function defineOutlineColor() {
        if(isError) return 'red'
        if(isValid) return 'green'

        return 'gray'
    }

    function defineTextColor() {
        if(isError) return 'red'
        if(isValid) return 'green'

        return 'black'
    }

    return (
        <div className="w-full flex flex-col relative items-start justify-start">
            <label className="text-sm font-semibold my-1">{ label }</label>
            <input
                className={`
                    px-3 py-2
                    bg-white
                    border border-solid border-gray-300
                    rounded-md
                    text-sm
                    text-${defineTextColor()}-500
                    w-full
                    focus:outline-1 focus:outline-${defineOutlineColor()}-500
                `}
                type={type }
                placeholder={placeholder}
                defaultValue={value || undefined}
                onChange={handleChange}
                value={value}
            />
                { isError && feedbackMessage && (
                    <span className={`
                        text-xs text-${defineTextColor()}-500 p-1
                    `}>
                        *{ feedbackMessage }
                    </span>
                )  }
        </div>

    )
}