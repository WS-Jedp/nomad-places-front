import { User } from "../../../models/user";
import { AvatarSingleCircle } from "../singleCircle";

interface AvatarGrupProps {
  users: User[];
  amountOfPeople: number;
}

export const AvatarGroup: React.FC<AvatarGrupProps> = ({
  users,
  amountOfPeople,
}) => {

  function handlePeopleBadgeColor(amount: number): string {
    if (amount < 10) {
      return "bg-gray-100";
    } else if (amount < 20) {
      return "bg-yellow-100 text-yellow-900";
    } else if (amount < 30) {
      return "bg-red-100 text-red-900";
    } else {
      return "bg-purple-100 text-purple-900";
    }
  }

  return (
    <div className="flex flex-row flex-nowwrap items-center justify-start">
      {users.length > 0 ?
        users.map((user) => (
          <AvatarSingleCircle key={user.id} url={''} />
        )) : (
          <span className="text-xs bg-gray-200 rounded-full p-2">
            No users in session
          </span>
        )}
      <span className={`ml-1 text-xs font-medium ${handlePeopleBadgeColor(amountOfPeople)} rounded-full p-2`}>
        {amountOfPeople > 0 ? `+${amountOfPeople} people` : "No people"}
      </span>
    </div>
  );
};
