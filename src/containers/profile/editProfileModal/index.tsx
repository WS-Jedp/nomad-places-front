import { IonChip, IonLabel, IonRow } from "@ionic/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../common/hooks/useTypedSelectors";
import { SimpleButton } from "../../../components/buttons/simple";
import { TextInput } from "../../../components/form/inputs/text";
import { TextAreaInput } from "../../../components/form/inputs/textarea";
import { LoaderSpinner } from "../../../components/loaders/spinner";
import { AppModal } from "../../../components/modals/container";
import { INDUSTRIES, INDUSTRIES_LIST } from "../../../models/industries";
import { updateProfilePicture, updateUserInformation, updateUserPersonalInformation } from "../../../store/redux/slices/user";

type EditProfileModalProps = {
  closeCallback: () => void;
  saveCallback?: () => void;
};

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  closeCallback,
  saveCallback,
}) => {
  const { t } = useTranslation()
  const { userData } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const [profilePicture, setProfilePicture] = useState<Blob | null>(null);

  const [firstName, setFirstName] = useState<string>(
    userData?.personalInformation.firstName || ""
  );
  const [lastName, setLastName] = useState<string>(
    userData?.personalInformation.lastName || ""
  );
  const [industries, setIndustries] = useState<INDUSTRIES[]>(
    userData?.personalInformation.industry || []
  );
  const [country, setCountry] = useState<string>(
    userData?.personalInformation.country || ""
  );
  const [langs, setLangs] = useState<string[]>(
    userData?.personalInformation.languages || []
  );
  const [about, setAbout] = useState<string>(
    userData?.personalInformation.about || ""
  );

  function handleOnPicture(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files![0];
    const imageFile = URL.createObjectURL(file);
    dispatch(updateProfilePicture({ profilePicture: imageFile }))
    setProfilePicture(file.slice(0, file.size, file.type));
  }

  function handleOnRemoveProfilePicture() {
    setProfilePicture(null);
  }

  function handleOnClose() {
    closeCallback();
  }

  function isIndustrySelected(industry: INDUSTRIES) {
    return industries.includes(industry);
  }

  function handleOnIndustry(tag: INDUSTRIES) {
    if (isIndustrySelected(tag)) {
      setIndustries(industries.filter((t) => t !== tag));
    } else {
      setIndustries([...industries, tag]);
    }
  }

  async function handleOnSave() {
    if(!userData) return
    setIsLoading(true);
    
    await dispatch(updateUserInformation({
      payload: {
        userData: {
          profilePicture: profilePicture || undefined,
          userID: userData.id,
        },
        personData: {
          id: userData.personalInformation.id,
          firstName,
          lastName,
          industry: industries,
          country,
          languages: langs,
          about,
        }
      }
    }))

    setIsLoading(false);
    if (saveCallback) saveCallback();
  }

  return (
    <AppModal>
      <section
        className="
                relative
                flex flex-col
                bg-white text-coffi-black
                w-full max-w-sm md:max-w-xl h-[720px] max-h-[72%] md:max-h-[600px]
                rounded-lg shadow-md
                overflow-hidden
            "
      >
        <IonRow className="w-full flex flex-row itesm-center justify-between p-5 shadow-sm">
          <IoMdClose size={24} onClick={handleOnClose} className="cursor-pointer" />

          <h2 className="font-bold text-md">{t('actions.auth.editProfile')}</h2>

          {
            isLoading ? (
              <LoaderSpinner />
            ) : (
              <span className="font-bold text-md underline cursor-pointer" onClick={handleOnSave}>
                {t('actions.general.save')}
              </span>
            )
          }
        </IonRow>

        <section className="relative w-full h-full overflow-y-auto">
          <IonRow class="flex flex-col items-center justify-start my-5">
            <label htmlFor="profilePicture" className="cursor-pointer">
              <input
                type="file"
                name="profilePicture"
                id="profilePicture"
                accept="image/jpeg,image/png"
                hidden
                onChange={handleOnPicture}
                onInput={handleOnPicture}
              />
              <figure className="relative w-32 h-32 bg-gray-400 rounded-full">
                {userData?.profilePicture ? (
                  <img
                    src={userData.profilePicture}
                    alt="Profile picture"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <img src="" alt="No profile picture" />
                )}

                <span className="absolute bottom-0 right-0 bg-white shadow-md rounded-full p-3">
                  <MdEdit size={24} color="gray" />
                </span>
              </figure>
            </label>

            {profilePicture && (
              <span
                className="mt-5 text-red-500 text-md font-ligh underline cursor-pointer"
                onClick={handleOnRemoveProfilePicture}
              >
                {t('actions.auth.removePicture')}
              </span>
            )}
          </IonRow>

          <IonRow class="flex flex-col items-start justify-start my-5 px-6">
            <div className="w-full my-2">
              <TextInput
                callback={(value) => setFirstName(value)}
                placeholder={t('forms.inputs.auth.firstName.placeholder')}
                type="text"
                label={t('forms.inputs.auth.firstName.label')}
                value={firstName}
              />
            </div>
            <div className="w-full my-2">
              <TextInput
                callback={(value) => setLastName(value)}
                placeholder={t('forms.inputs.auth.lastName.placeholder')}
                type="text"
                label={t('forms.inputs.auth.lastName.label')}
                value={lastName}
              />
            </div>
            <div className="w-full my-2">
              <TextInput
                callback={(value) => setCountry(value)}
                placeholder={t('forms.inputs.personalInformation.from.placeholder')}
                type="text"
                label={t('forms.inputs.personalInformation.from.label')}
                value={country}
              />
            </div>
            <div className="w-full my-2">
              <TextInput
                callback={(value) => setLangs(value.split(","))}
                placeholder={t('forms.inputs.personalInformation.languages.placeholder')}
                type="text"
                label={t('forms.inputs.personalInformation.languages.label')}
                value={langs.join(",")}
              />
            </div>

            <div className="flex flex-col align-start justify-start text-start">
              <label className="text-sm font-semibold my-1">
                {t('forms.inputs.personalInformation.industry.label')}
              </label>
              <div className="flex flex-row flex-wrap align-start justify-start">
                {INDUSTRIES_LIST.map((industry, index) => (
                  <IonChip
                    onClick={() => handleOnIndustry(industry)}
                    outline
                    key={index}
                    className={`cursor-pointer px-3 my-1 mr-1 py-1 ${
                      isIndustrySelected(industry)
                        ? "bg-indigo-100 text-indigo-500"
                        : "bg-gray-200 text-gray-500"
                    } `}
                  >
                    <IonLabel className="text-sm font-medium">
                      {t(`filters.users.industries.${industry}`)}
                    </IonLabel>
                  </IonChip>
                ))}
              </div>
            </div>

            <div className="w-full my-2">
              <TextAreaInput
                callback={(value) => setAbout(value)}
                placeholder={t('forms.inputs.personalInformation.about.placeholder')}
                label={t('forms.inputs.personalInformation.about.label')}
                value={about}
                rows={5}
              />
            </div>

            <SimpleButton 
              action={handleOnSave}
              loading={isLoading}
              text={t('actions.general.save')}
            />
          </IonRow>
        </section>
      </section>
    </AppModal>
  );
};
