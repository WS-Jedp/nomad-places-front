import { IonRow } from "@ionic/react";
import { IoMdClose } from "react-icons/io";
import { AppModal } from "../../../components/modals/container";

export interface SpotsDiscoveredModalProps {
  closeCallback: () => void;
}

export const SpotsDiscoveredModal: React.FC<SpotsDiscoveredModalProps> = ({
  closeCallback,
}) => {
  return (
    <AppModal>
      <section
        className="
                relative
                flex flex-col
                bg-white text-black
                w-full max-w-sm md:max-w-xl h-[720px] max-h-[720px] md:max-h-[600px]
                rounded-lg shadow-md
                overflow-hidden
            "
      >
        <IonRow className="w-full flex flex-row itesm-center justify-between p-5 shadow-sm">
          <IoMdClose
            className="cursor-pointer"
            size={24}
            onClick={closeCallback}
          />

          <h2 className="font-bold text-md">Spots Discovered</h2>
        </IonRow>

        <section className="flex flex-col items-start justify-start w-full p-5 overflow-y-auto">
          <h2 className="font-bold text-lg mb-3">Spots:</h2>
          <ul className="w-full">
          <li className="flex flex-row items-center justify-between w-full h-auto border-t-[1px] border-zinc-200 py-2">
              <button className="flex flex-row items-center justify-start hover:underline">
                <figure className="w-6 h-6 bg-zinc-300 rounded-full overflow-hidden">
                  <img
                    src="#"
                    alt=""
                    className="w-full h-full object-cover rounded-full"
                  />
                </figure>
                <h2 className="font-semibold text-sm ml-3">Cafe Semilla</h2>
              </button>

            <p
                className="
                                relative
                                text-xs md:text-md font-light px-3 py-1
                            "
            >
                Discovered the 12 december 2023
            </p>
            </li>
            
          </ul>
        </section>
      </section>
    </AppModal>
  );
};
