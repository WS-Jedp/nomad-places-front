import { MdImageNotSupported } from "react-icons/md";
import { User } from "../../../models/user";

type AvatarSingleCircle = {
  url?: string;
  styles?: string;
};
export const AvatarSingleCircle: React.FC<AvatarSingleCircle> = ({
  url,
  styles,
}) => {
  return (
    <figure
      className={`relative inline-flex items-center justify-center w-7 h-7 rounded-full overflow-hidden bg-gray-300 shadow-md ${
        styles ? styles : ""
      } `}
    >
      {
        url ? (
        <img
          src={url}
          alt="Discovered by image"
          className="w-full h-full object-cover"
        />
        ) : (
          <MdImageNotSupported color="white" size={15} />    
        )
      }
      
    </figure>
  );
};
