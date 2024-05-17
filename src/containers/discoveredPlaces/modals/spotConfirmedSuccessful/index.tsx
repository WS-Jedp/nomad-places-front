import { useTranslation } from "react-i18next";
import { SimpleButton } from "../../../../components/buttons/simple";
import { AppModal } from "../../../../components/modals/container";

interface SpotConfirmedSuccessfulProps {
  closeDiscoveredSpot: () => void;
}

export const SpotConfirmedSuccessfulModal: React.FC<
  SpotConfirmedSuccessfulProps
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
        <h2 className="text-2xl font-bold">🌟 Confirmation Successful!</h2>
        <div className="w-full h-[2px] my-3 bg-gray-300"></div>
        <p className="font-bold my-1">
            Thanks for your thumbs-up!
        </p>
        <p className="font-light">
            Your confirmation has brought this spot one step closer to becoming a permanent part of our community’s map.
        </p>
        <p className="font-light">It still needs more approvals, so stay tuned!</p>
        <p className="mt-3 mb-6 font-extralight text-sm">Your insights matter! <br /> - The Spots Team ✨</p>
        <SimpleButton
          action={closeDiscoveredSpot}
          text={t("actions.navigation.continue")}
        />
      </section>
    </AppModal>
  );
};
