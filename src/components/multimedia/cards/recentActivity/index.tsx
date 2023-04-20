type RecentActivityCardProps = {
    callback: () => void
}

export const RecentActivityCard: React.FC<RecentActivityCardProps> = ({ callback }) => {

    return (
        <article className="
                relative overflow-hidden 
                w-12 h-12
                inline-flex items-center justify-center
                rounded-full
                bg-gray-200
                ring-2 ring-offset-2 ring-amber-400
                cursor-pointer
                transition ease-in-out
                hover:shadow-sm
            "
            onClick={callback}
        >
            <img src="" alt="" className="object-cover w-full" />
        </article>
    )
}