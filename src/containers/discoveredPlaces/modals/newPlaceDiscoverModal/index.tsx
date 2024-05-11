import { IonRow } from "@ionic/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";
import { useHistory } from "react-router";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../common/hooks/useTypedSelectors";
import { SimpleButton } from "../../../../components/buttons/simple";
import { AppModal } from "../../../../components/modals/container";
import { DiscoveredPlaceForm } from "../../discoveredPlaceForm";
import { SharingDiscovery } from "../../information";

export interface NewPlaceDiscoverModalProps {
  closeCallback: () => void;
  onSuccess: () => void;
}

export const NewPlaceDiscoveredModal: React.FC<NewPlaceDiscoverModalProps> = ({
  closeCallback,
  onSuccess
}) => {
  const history = useHistory();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDiscoveryForm, setShowDiscoveryForm] = useState<boolean>(false);
  const { token } = useAppSelector((state) => state.user.auth);
  const dispatch = useAppDispatch();

  function handleOnShareDiscovery() {
    setShowDiscoveryForm(true);
  }

  function hideShareDiscovery() {
    setShowDiscoveryForm(false);
  }

  return (
    <AppModal>
      <section
        className="
                relative
                flex flex-col
                bg-white text-black
                w-full max-w-sm md:max-w-2xl h-[720px] max-h-[720px] md:max-h-[600px]
                rounded-lg shadow-md
                overflow-hidden
            "
      >
        <IonRow className="w-full flex flex-row items-center justify-between p-5 px-9 shadow-sm">
          <IoMdClose
            className="cursor-pointer"
            size={24}
            onClick={closeCallback}
          />

          <h2 className="font-bold text-md">
            {
                t('discover.titles.shareToCommunity')
            }
          </h2>
        </IonRow>

        {
            !showDiscoveryForm ? (
                <SharingDiscovery onShare={handleOnShareDiscovery} />

            ) : (
                <DiscoveredPlaceForm
                    onSave={onSuccess}
                    onCancel={closeCallback}
                />
            )
        }
      </section>
    </AppModal>
  );
};
