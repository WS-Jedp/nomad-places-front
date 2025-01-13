import { IonLabel } from "@ionic/react";

interface SimpleTagsProps {
  text: string;
  active?: boolean;
  onClick?: () => void;
}
export const SimpleTag: React.FC<SimpleTagsProps> = ({ text, active, onClick }) => {
  return (
    <article className={`px-3 rounded-xl ${!active ? 'bg-gray-100' : 'bg-coffi-purple/10 drop-shadow-sm'}`} onClick={onClick}>
      <IonLabel className={`text-sm font-normal ${active ? 'text-coffi-purple' : 'text-gray-600'}`}>
        {text}
      </IonLabel>
    </article>
  );
};


export const SimpleTagOutline: React.FC<SimpleTagsProps> = ({ text, onClick }) => {
  return (
    <article className={`px-3 rounded-xl bg-white border-[1px] border-solid border-coffi-black`} onClick={onClick}>
      <IonLabel className={`text-sm font-normal text-coffi-black`}>
        {text}
      </IonLabel>
    </article>
  );
};
