type SimplePlaceTypeCardProps = {
    text: string;
    icon: React.ReactNode;
    isSelected?: boolean;
    callback: () => void;
}

export const SimplePlaceTypeCard: React.FC<SimplePlaceTypeCardProps> = ({ icon, text, isSelected, callback }) => {
    return (
        <article className={`
                relative
                bg-${isSelected ? 'gray-100' : 'white'}
                ${isSelected ? 'border-2' : 'border'} border-solid border-gray-300 ${isSelected ? 'border-gray-500' : ''}
                flex flex-col items-start justify-between
                rounded-lg
                w-24 h-24
                p-3
                cursor-pointer
                hover:border-gray-500
                transiation-all duration-300
            `}
            onClick={callback}
        >

            <span className="">
                { icon }
            </span>

            <h3 className="font-semibold">
                {
                    text
                }
            </h3>
        </article>
    )
}