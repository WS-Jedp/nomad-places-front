import { useTranslation } from "react-i18next";
import { PlaceSessionActions } from "../../../models/session";
import { User } from "../../../models/user";
import { AvatarSingleCircle } from "../singleCircle";

interface AvatarGrupProps {
  users: Partial<User>[];
}

export const AvatarGroup: React.FC<AvatarGrupProps> = ({
  users
}) => {
  const { t } = useTranslation();
  if (users.length === 0) {
    return (
      <span className="text-xs bg-gray-200 rounded-full p-2">
        { t('spots.messages.noUsersInSession') }
      </span>
    );
  }

  return (
    <div className="flex flex-row flex-nowwrap items-center justify-center">
      <div className="flex flex-row items-center justify-center">
        {users.length > 0 &&
          users.map((user) => (
            <AvatarSingleCircle key={user.id} url={user.profilePicture || ""} />
          ))}
      </div>

      {users.length > 0 && (
        <span className="font-light text-xs ml-4">
          {users.length}{" "}
          {users.length === 1 ? t('spots.messages.userInSession') : t('spots.messages.usersInSession')}
        </span>
      )}
    </div>
  );
};
