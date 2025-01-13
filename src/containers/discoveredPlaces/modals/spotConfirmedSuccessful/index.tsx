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
                                    text-coffi-black 
                                "
      >
        <h2 className="text-2xl font-bold">
          🌟 {t("messages.general.confirmation.success")}
        </h2>
        <div className="w-full h-[2px] my-3 bg-gray-300"></div>
        <p className="font-bold my-1">
        {t("messages.general.thanks.thumbsUp")}
        </p>
        <p className="font-light">
        {t("messages.discover.spot.confirmation.positiveReview")}
          </p>
        <p className="mt-3 mb-6 font-extralight text-sm">
          {t("messages.discover.user.insight.matter")} - {t("messages.spotsTeam.we")} ✨
        </p>
        <SimpleButton
          action={closeDiscoveredSpot}
          text={t("actions.navigation.continue")}
        />
      </section>
    </AppModal>
  );
};
