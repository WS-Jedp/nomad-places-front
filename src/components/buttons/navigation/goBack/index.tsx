import { useTranslation } from "react-i18next";
import { MdArrowBack } from "react-icons/md";
import { useHistory } from "react-router";

export const BackNavigationButton: React.FC = () => {
  const { t } = useTranslation()
  const history = useHistory();
  function handleGoBack() {
    history.goBack();
  }

  return (
    <button
      className="cursor-pointer flex flex-row items-center justify-center outline outline-1 outline-gray-300 rounded-full px-3 py-1 hover:bg-gray-300 hover:text-gray-600"
      onClick={handleGoBack}
    >
      <MdArrowBack color="gray" />
      <span className="text-xs ml-1">{ t('actions.navigation.goBack') }</span>
    </button>
  );
};
