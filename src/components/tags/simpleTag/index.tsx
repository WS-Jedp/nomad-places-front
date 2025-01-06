import { IonLabel } from "@ionic/react";

interface SimpleTagsProps {
  text: string;
  active?: boolean;
  onClick?: () => void;
}
export const SimpleTag: React.FC<SimpleTagsProps> = ({ text, active, onClick }) => {
  return (
    <article className={`px-3 rounded-xl ${!active ? 'bg-gray-100' : 'bg-indigo-200'}`} onClick={onClick}>
      <IonLabel className={`text-sm font-medium ${active ? 'text-indigo-500' : 'text-gray-600'}`}>
        {text}
      </IonLabel>
    </article>
  );
};
