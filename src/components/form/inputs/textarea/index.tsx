type TextAreaInputProps = {
    label: string;
    placeholder: string;
    callback: (value: string) => void;
    value: string;
    isError?: boolean;
    isValid?: boolean;
    feedbackMessage?: string;
    rows?: number
}

export const TextAreaInput: React.FC<TextAreaInputProps> = ({ label, placeholder, callback, value, isError, isValid, feedbackMessage, rows = 5 }) => {

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
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
            <textarea
                className={`
                    px-3 py-2
                    bg-white
                    border border-solid border-gray-300
                    rounded-md
                    text-sm
                    text-${defineTextColor()}-600
                    w-full
                    focus:outline-1 focus:outline-${defineOutlineColor()}-600
                `}
                rows={rows}
                placeholder={placeholder}
                defaultValue={value || undefined}
                onChange={handleChange}
                value={value}
            />
                { isError && feedbackMessage && (
                    <span className={`
                        text-xs text-${defineTextColor()}-600 p-1
                    `}>
                        *{ feedbackMessage }
                    </span>
                )  }
        </div>

    )
}