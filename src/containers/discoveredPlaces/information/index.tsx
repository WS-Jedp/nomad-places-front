import { useTranslation } from 'react-i18next'
import { SimpleButton } from "../../../components/buttons/simple";

export const SharingDiscovery: React.FC<{ onShare: () => void }> = ({ onShare }) => {
    const { t } = useTranslation()
  return (
    <section className="flex flex-col items-center justify-start w-full p-5 overflow-y-auto text-center">
      <h2 className="font-bold text-3xl mb-3 text-center w-full">
        { t('discover.titles.newPlace') }
      </h2>

      <p className="font-light text-md w-full text-center mt-3">
          { t('discover.texts.spot') }
      </p>

      <p className="font-light text-md w-full text-center my-1">
        { t('discover.texts.gratefulForSharing') }
      </p>

      <div className="my-5">
        <SimpleButton text={t('actions.discover.shareDiscovery')} action={onShare} />
      </div>

      <h3 className="font-bold text-xl w-full text-center mt-5 mb-1">
            { t('discover.titles.spotsJourney') }
      </h3>

      <p className="font-light text-md w-full text-center">
        { t('discover.texts.considerations') }
      </p>

      <ol className="w-full h-auto items-start justify-around flex flex-row flex-wrap my-5">
        <li className="w-12/12 md:w-4/12 p-3">
          <div className="w-full">
            <h4 className="font-bold text-sm mb-1">
                { t('discover.titles.communityCheck') }
            </h4>
            <p className="font-light text-sm">
                { t('discover.texts.communityReview') }
            </p>
          </div>
        </li>
        <li className="w-12/12 md:w-4/12 p-3">
          <div className="w-full">
            <h4 className="font-bold text-sm mb-1">
                { t('discover.titles.stayTuned') }
            </h4>
            <p className="font-light text-sm">
                { t('discover.texts.spotProgress') }
            </p>
          </div>
        </li>
        <li className="w-12/12 md:w-4/12 p-3">
          <div className="w-full">
            <h4 className="font-bold text-sm mb-1">
              { t('discover.titles.finalVeredict') }
            </h4>
            <p className="font-light text-sm">
                { t('discover.texts.toConfirmSpot') }
            </p>
          </div>
        </li>
      </ol>

      <p className="w-full text-md font-light">
          { t('discover.texts.growingTheCommunity') }
      </p>

      <p className="w-full text-md font-light my-3">
            { t('discover.texts.encourageExploring') }
      </p>

      <div className="my-5">
        <SimpleButton text={t('actions.discover.shareSpot')} action={onShare} />
      </div>

      <p className="font-light text-sm text-center w-full">
        { t('discover.texts.cheersToMoreAdventures') } <br />
        {t('messages.spotsTeam.yours')} 🚀
      </p>
    </section>
  );
};
