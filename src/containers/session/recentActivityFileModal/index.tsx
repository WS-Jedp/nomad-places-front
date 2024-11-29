import { IonRow } from "@ionic/react";
import { useEffect, useState } from "react";

import { SimpleButton } from "../../../components/buttons/simple";
import { verifyFileType } from "../../../common/utils/files";
import { MULTIMEDIA_TYPE } from "../../../models/multimedia";
import { IoMdClose } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { LoaderSpinner } from "../../../components/loaders/spinner";

interface RecentActivityFileModalProps {
  onSave: () => void;
  onCancel: () => void;
  file: File;
  isLoading?: boolean
}
export const RecentActivityFileModal: React.FC<
  RecentActivityFileModalProps
> = ({ file, onSave, onCancel, isLoading }) => {
    const { t } = useTranslation()
  const [fileType, setFileType] = useState<MULTIMEDIA_TYPE | null>();

  useEffect(() => {
    if (file) {
      const fileType = verifyFileType(file);
      setFileType(fileType);
    }
  }, [file]);

  return (
    <section
      className="
            relative
            flex flex-col items-center justify-between
            bg-white text-black
            w-full max-w-sm md:max-w-xl h-[720px] max-h-[72%] md:max-h-[600px]
            rounded-lg shadow-md
            overflow-hidden"
    >
         <IonRow className="w-full flex flex-row itesm-center justify-between p-5 shadow-sm">
          <IoMdClose
            className="cursor-pointer"
            size={24}
            onClick={onCancel}
          />

          <h2 className="font-bold text-md">
            Subir historia
          </h2>
        </IonRow>

      <IonRow
        className="
            relative
            w-full h-auto overflow-y-auto p-3
            flex flex-col items-center justify-center
        "
      >
        {
          isLoading ? (
            <LoaderSpinner />
          ) : (
            <div className="relative w-[300px] flex flex-col items-center justify-center">
              {fileType === MULTIMEDIA_TYPE.IMAGE ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="recent-activity"
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <video
                  src={URL.createObjectURL(file)}
                  autoPlay
                  controls
                  className="w-full h-full object-cover rounded-xl"
                />
              )}
            </div>
          )
        }
      </IonRow>
      <IonRow className="flex items-center justify-center p-6 w-full">
        <SimpleButton text="Publicar" action={onSave} />
      </IonRow>
    </section>
  );
};
