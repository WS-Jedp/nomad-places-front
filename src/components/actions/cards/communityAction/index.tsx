export const CommunityCardAction:React.FC = () => {

    return (
        <article className="p-3 relative w-full flex flex-row flex-nowrap items-center justify-between border-b border-gray-300">
            <div className="flex flex-row flex-nowrap items-start">
                <figure
                    className="relative inline-flex w-7 h-7 rounded-full bg-gray-300 mr-2 shadow-md"
                />
                <section>
                    <p className="font-bold inline text-md">Username</p>
                    <p>Perfect to Study</p>
                </section>
            </div>
            <span className="font-light text-gray-600 text-xs">
                25 min ago
            </span>
        </article>
    )
}