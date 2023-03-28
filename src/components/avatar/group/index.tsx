import { User } from "../../../models/user";

interface AvatarGrupProps {
  users: User[];
  amountOfPeople: number;
}

export const AvatarGroup: React.FC<AvatarGrupProps> = ({
  users,
  amountOfPeople,
}) => {
  return (
    <div className="flex flex-row flex-nowwrap items-center justify-start">
      {users.length > 0 &&
        users.map((user) => (
          <figure
            key={user.id}
            className="relative inline-flex w-8 h-8 rounded-full bg-gray-300 mr-[-9px] shadow-md"
          ></figure>
        ))}
      <strong className="mx-4 font-semibold text-sm">
        {amountOfPeople > 0 ? `+${amountOfPeople}` : "?"}
      </strong>
    </div>
  );
};
