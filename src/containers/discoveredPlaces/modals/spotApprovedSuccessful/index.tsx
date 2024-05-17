import { useTranslation } from "react-i18next";
import { SimpleButton } from "../../../../components/buttons/simple";
import { AppModal } from "../../../../components/modals/container";

interface SpotApprovedSuccessfulProps {
  closeDiscoveredSpot: () => void;
}

export const SpotApprovedSuccessfulModal: React.FC<
  SpotApprovedSuccessfulProps
> = ({ closeDiscoveredSpot }) => {
  const { t } = useTranslation();

  return (
    <AppModal>
      <section
        className="
                                    relative flex flex-col items-center justify-center
                                    w-[90%] max-w-xl
                                    bg-white 
                                    rounded-lg
                                    p-6 shadow-xl 
                                    text-black 
                                "
      >
        <h2 className="text-2xl font-bold">🎉 Spot Confirmed!</h2>
        <div className="w-full h-[2px] my-3 bg-gray-300"></div>
        <p className="font-bold my-1">
          Your confirmation has made it official!
        </p>
        <p className="font-light">
          Thanks to your approval, this spot is now permanently registered in
          the Spots database.
        </p>
        <p className="font-light">We’re grateful for your help in shaping our community’s map.</p>
        <p className="mt-3 mb-6 font-extralight text-sm">Keep exploring and sharing! <br /> - The Spots Team ✨</p>
        <SimpleButton
          action={closeDiscoveredSpot}
          text={t("actions.navigation.continue")}
        />
      </section>
    </AppModal>
  );
};
