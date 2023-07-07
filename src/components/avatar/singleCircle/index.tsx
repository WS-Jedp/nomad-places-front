import { User } from "../../../models/user"

type AvatarSingleCircle = {
    url: string
}
export const AvatarSingleCircle: React.FC<AvatarSingleCircle> = ({ url }) => {

    return (
        <figure
            className="relative inline-flex w-7 h-7 rounded-full bg-gray-300 mr-[-9px] shadow-md"
        ></figure>
    )
}
