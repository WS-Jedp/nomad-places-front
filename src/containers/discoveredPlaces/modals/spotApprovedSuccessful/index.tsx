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
        <h2 className="text-2xl font-bold">
          🎉 {t("messages.general.confirmation.approved")}
        </h2>
        <div className="w-full h-[2px] my-3 bg-gray-300"></div>
        <p className="font-bold my-1">
          {t("messages.discover.spot.confirmation.itsOfficial")}
        </p>
        <p className="font-light">
          {t("messages.discover.spot.confirmation.approvedReview")}
        </p>
        <p className="font-light">
          {t("messages.general.thanks.approvedSpot")}.
        </p>
        <p className="mt-3 mb-6 font-extralight text-sm">
          {t("messages.discover.user.keepExploring")} <br /> -{" "}
          {t("messages.spotsTeam.we")} ✨
        </p>
        <SimpleButton
          action={closeDiscoveredSpot}
          text={t("actions.navigation.continue")}
        />
      </section>
    </AppModal>
  );
};
