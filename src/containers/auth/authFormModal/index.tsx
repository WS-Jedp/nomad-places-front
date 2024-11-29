import { useMemo, useState } from "react";
import { MdClose } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { INDUSTRIES, INDUSTRIES_LIST } from "../../../models/industries";
import { ControlledError } from "../../../common/controlledError";
import { ControlledErrorType } from "../../../common/controlledError/types";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../common/hooks/useTypedSelectors";
import { InputButton } from "../../../components/buttons/inputButton";
import { TextInput } from "../../../components/form/inputs/text";
import { AuthServices } from "../../../services/auth";
import { addError } from "../../../store/redux/slices/controlledErrors";
import { authUser, registerUser } from "../../../store/redux/slices/user";
import { IonChip, IonLabel } from "@ionic/react";
import { getUserFollowRequests } from "../../../store/redux/slices/social";
import { toast } from "react-toastify";
import { current, PayloadAction } from "@reduxjs/toolkit";
import { LoginDTO } from "../../../dto/auth";
import { PERSON_GENDER, PERSON_GENDER_LIST } from "../../../models/user";

type AuthFormModalProps = {
  closeCallback: () => void;
  successfulRegisterCallback: () => void;
};

export const AuthFormModal: React.FC<AuthFormModalProps> = ({
  closeCallback,
  successfulRegisterCallback,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>();

  const authServices = new AuthServices();
  const [isLoadingRequest, setIsLoadingRequest] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  function handleEmailChange(value: string) {
    setEmail(value);
  }

  const [username, setUsername] = useState<string>("");
  function handleUsername(value: string) {
    setUsername(value);
  }

  const [firstName, setFirstName] = useState<string>("");
  function handleFirstName(value: string) {
    setFirstName(value);
  }

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  function handlePasswordChange(value: string) {
    setPassword(value);
  }
  function handleConfirmPasswordChange(value: string) {
    setConfirmPassword(value);
  }

  const isConfirmPasswordValid = useMemo(() => {
    if(!password || !confirmPassword) return false
    
    return password === confirmPassword;
  }, [password, confirmPassword])

  const [personIndustries, setPersonIndustries] = useState<INDUSTRIES[]>([]);
  function isIndustrySelected(industry: INDUSTRIES) {
    return personIndustries.includes(industry);
  }

  function handleOnIndustry(tag: INDUSTRIES) {
    if (isIndustrySelected(tag)) {
      setPersonIndustries(personIndustries.filter((t) => t !== tag));
    } else {
      setPersonIndustries([...personIndustries, tag]);
    }
  }

  const [personGender, setPersonGender] = useState<PERSON_GENDER>();
  function onGenderChange(gender: PERSON_GENDER) {
    setPersonGender(gender);
  }

  function isGenderSelected(gender: PERSON_GENDER) {
    return personGender === gender;
  }

  const AUTH_STEPS = 2;
  const [registerAuthStep, setCurrentRegisterAuthStep] = useState<number>(0);
  const [currentAuthStep, setCurrentAuthStep] = useState<number>(0);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [forgotPassword, setIsForgotPassword] = useState(false);

  function renderCurrentRegisterAuthStep() {
    switch (registerAuthStep) {
      case 0:
        return (
          <>
            <div className="mb-2">
              <TextInput
                type="email"
                label={t("forms.inputs.auth.email.label")}
                placeholder={t("forms.inputs.auth.email.placeholder")}
                callback={handleEmailChange}
                value={email}
              />
            </div>

            <div className="mb-2">
              <TextInput
                type="text"
                label={t("forms.inputs.auth.username.label")}
                placeholder={t("forms.inputs.auth.username.placeholder")}
                callback={handleUsername}
                value={username}
              />
            </div>

            <div className="mb-2">
              <TextInput
                type="text"
                label={t("forms.inputs.auth.firstName.label")}
                placeholder={t("forms.inputs.auth.firstName.placeholder")}
                callback={handleFirstName}
                value={firstName}
              />
            </div>
          </>
        );

      case 1:
        return (
          <>
            <div className="mb-2">
              <TextInput
                type="password"
                label={t("forms.inputs.auth.password.label")}
                placeholder={t("forms.inputs.auth.password.placeholder")}
                callback={handlePasswordChange}
                value={password}
              />
            </div>
            <div className="mb-2">
              <TextInput
                type="password"
                label={t("forms.inputs.auth.passwordConfirmation.label")}
                placeholder={t(
                  "forms.inputs.auth.passwordConfirmation.placeholder"
                )}
                callback={handleConfirmPasswordChange}
                value={confirmPassword}
                isError={!isConfirmPasswordValid}
                feedbackMessage={
                  isConfirmPasswordValid
                    ? undefined
                    : t("forms.messages.auth.passwordMatch.error")
                }
              />
            </div>
          </>
        );

      case 2:
        return (
          <>
            {/* Industry tag options */}
            <div className="flex flex-col align-start justify-start text-start">
              <label className="text-sm font-semibold my-1">
                {t("forms.inputs.personalInformation.industry.label")}
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
                    <IonLabel className="text-sm font-medium capitalize">
                      {t(`filters.users.industries.${industry.toUpperCase()}`)}
                    </IonLabel>
                  </IonChip>
                ))}
              </div>
            </div>

            {/* Gender tags options */}
            <div className="flex flex-col align-start justify-start text-start">
              <label className="text-sm font-semibold my-1">
                {t("forms.inputs.personalInformation.gender.label")}
              </label>
              <div className="flex flex-row flex-wrap align-start justify-start">
                {PERSON_GENDER_LIST.map((gender, index) => (
                  <IonChip
                    onClick={() => onGenderChange(gender)}
                    outline
                    key={index}
                    className={`cursor-pointer px-3 my-1 mr-1 py-1 ${
                      isGenderSelected(gender)
                        ? "bg-indigo-100 text-indigo-500"
                        : "bg-gray-200 text-gray-500"
                    } `}
                  >
                    <IonLabel className="text-sm font-medium capitalize">
                      {t(`filters.users.genders.${gender.toUpperCase()}`)}
                    </IonLabel>
                  </IonChip>
                ))}
              </div>
            </div>
          </>
        );

      default:
        <>
          <p>Oops! Something went wrong, try again later.</p>
        </>;
        break;
    }
  }

  const isAbleToPrevStepRegister = useMemo(() => {
    return registerAuthStep > 0;
  }, [registerAuthStep]);

  const isAbleToNextStepRegister = useMemo(() => {
    if(registerAuthStep === 0) {
      return (email && username && firstName) ? true : false
    }

    if(registerAuthStep === 1) {
      return isConfirmPasswordValid
    }

    return true
  }, [email, username, firstName, password, confirmPassword, registerAuthStep]);

  function handleForgotPassword() {
    setIsForgotPassword(true);
    setIsLogin(false);
    setIsRegister(false);
  }

  function handleCancelForgotPassword() {
    setIsForgotPassword(false);
    setIsLogin(false);
    setIsRegister(false);
    setCurrentAuthStep(0);
  }

  async function handleNextAuthStep() {
    try {
      setIsLoadingRequest(true);
      const confirmResp = await authServices.userExists(email);
      if (!confirmResp.exists) {
        setCurrentAuthStep(1);
        setIsRegister(true);
      } else {
        setCurrentAuthStep(1);
        setIsLogin(true);
      }
      setIsLoadingRequest(false);
    } catch (error) {
      // dispatch( addError(new ControlledError(String(error), ControlledErrorType.REQUEST)) )
      setError(String(error));
    } finally {
      setIsLoadingRequest(false);
    }
  }

  async function handleLogin() {
    try {
      setIsLoadingRequest(true);
      const user = (await dispatch(
        authUser({ username: email, password })
      )) as PayloadAction<LoginDTO>;
      await dispatch(getUserFollowRequests());
      setIsLoadingRequest(false);
      toast.success(
        t("messages.auth.success.login", { name: user.payload.user.firstName })
      );
      closeCallback();
    } catch (error) {
      // dispatch( addError(new ControlledError(String(error), ControlledErrorType.REQUEST)) )
      setError(String(error));
    } finally {
      setIsLoadingRequest(false);
    }
  }

  async function handleRegister() {
    try {
      setIsLoadingRequest(true);
      const registerResp = await dispatch(
        registerUser({
          payload: {
            personData: {
              firstName,
              industry: personIndustries,
            },
            userData: {
              email,
              username,
              password,
            },
          },
        })
      );
      if (!registerResp.payload) {
        throw new Error("Error registering user");
      }
      setIsLoadingRequest(false);
      toast.success(t("messages.auth.success.register", { name: firstName }));
      successfulRegisterCallback();
    } catch (error) {
      // dispatch( addError(new ControlledError(String(error), ControlledErrorType.REQUEST)) )
      setError(String(error));
    } finally {
      setIsLoadingRequest(false);
    }
  }

  const [isRecoverEmailSent, setIsRecoverEmailSent] = useState<boolean>(false);
  async function handleRecoverPassword() {
    try {
      setIsLoadingRequest(true);
      await authServices.recoverPassword(email, "es");
      setIsLoadingRequest(false);
      setIsRecoverEmailSent(true);
    } catch (error) {
      // dispatch( addError(new ControlledError(String(error), ControlledErrorType.REQUEST)) )
      setError(String(error));
      setIsRecoverEmailSent(false);
    } finally {
      setIsLoadingRequest(false);
    }
  }

  function renderNextAuthStep() {
    if (isRegister) {
      return (
        <form
          action=""
          className="w-full mb-6"
          onSubmit={(ev) => ev.preventDefault()}
        >
          {renderCurrentRegisterAuthStep()}

          <div className="relative w-full flex flex-row items-center justify-between mt-6 text-sm">
            <button className={`text-sm font-light ${registerAuthStep === 0 ? 'opacity-0' : '' }`} onClick={() => setCurrentRegisterAuthStep(registerAuthStep - 1)} disabled={!isAbleToPrevStepRegister}>Anterior</button>
            <div className="font-light">
              {registerAuthStep+1} / {AUTH_STEPS + 1}
            </div>

            <div>
              {registerAuthStep === AUTH_STEPS ? (
                <InputButton
                  text={t("actions.auth.register")}
                  action={handleRegister}
                  isLoading={isLoadingRequest}
                />
              ) : (
                <InputButton 
                  text="Siguiente"
                  action={() => setCurrentRegisterAuthStep(registerAuthStep + 1)}
                  disabled={!isAbleToNextStepRegister}
                />
              )}
            </div>
          </div>
        </form>
      );
    }

    if (isLogin) {
      return (
        <form
          action=""
          className="w-full"
          onSubmit={(ev) => ev.preventDefault()}
        >
          <TextInput
            type="password"
            label={t("forms.inputs.auth.password.label")}
            placeholder={t("forms.inputs.auth.password.placeholder")}
            callback={handlePasswordChange}
            value={password}
          />
          <div className="w-full relative mt-5">
            <InputButton
              text={t("actions.auth.login")}
              action={handleLogin}
              isLoading={isLoadingRequest}
            />
          </div>
        </form>
      );
    }
  }

  return (
    <article className="bg-white relative rounded-lg shadow-xl text-black w-[90%] max-w-xl overflow-hidden min-h-min max-h-[510px] overflow-y-auto">
      <section className="w-full sticky p-6 shadow-sm top-0 left-0  flex flex-row flex-nowrap items-center justify-between bg-white border-b border-solid border-gray-300 pb-3 z-50">
        <button
          className="flex items-center justify-center border border-white rounded-full"
          onClick={closeCallback}
        >
          <MdClose size={24} />
        </button>

        <h2 className="font-bold text-2xl">
          {forgotPassword
            ? t("messages.forgotPassword.title")
            : t("messages.auth.loginOrRegister")}
        </h2>
      </section>

      {forgotPassword ? (
        <section className="relative flex flex-col items-start justify-start px-6 py-3">
          <h2 className="font-bold text-base">
            {t("messages.resetPassword.title")}
          </h2>
          <p className="text-start text-sm mb-3">
            {t("messages.resetPassword.message")}
          </p>
          <form
            action=""
            className="w-full h-full"
            onSubmit={(ev) => ev.preventDefault()}
          >
            <TextInput
              type="text"
              label={t("forms.inputs.auth.email.label")}
              placeholder={t("forms.inputs.auth.email.placeholder")}
              callback={handleEmailChange}
              value={email}
              isValid
              feedbackMessage={t("forms.messages.email.invalid")}
            />
            {error && (
              <div className="w-full mt-1 text-start">
                <span className="text-red-500 text-xs">*{error}</span>
              </div>
            )}
            <div className="w-full relative mt-5 mb-1">
              {!isRecoverEmailSent ? (
                <InputButton
                  text={t("actions.auth.sendLink")}
                  disabled={!email}
                  action={handleRecoverPassword}
                  isLoading={isLoadingRequest}
                />
              ) : (
                <span className="text-green-500 text-sm">
                  {t("messages.resetPassword.emailSent")}
                </span>
              )}
            </div>
            <small
              className="underline text-xs text-gray-400 cursor-pointer"
              onClick={handleCancelForgotPassword}
            >
              {t("actions.general.cancel")}
            </small>
          </form>
        </section>
      ) : (
        <section className="relative flex flex-col items-start justify-start px-6 py-3 h-full overflow-y-auto">
          <h2 className="text-lg font-bold mb-3">
            {t("messages.welcome.title")}
          </h2>

          {currentAuthStep === 0 && (
            <form
              action=""
              className="w-full"
              onSubmit={(ev) => ev.preventDefault()}
            >
              <TextInput
                type="text"
                label={t("forms.inputs.auth.email.label")}
                placeholder={t("forms.inputs.auth.email.placeholder")}
                callback={handleEmailChange}
                value={email}
                isValid
                feedbackMessage={t("forms.messages.email.invalid")}
              />
              {error && (
                <div className="w-full mt-1 text-start">
                  <span className="text-red-500 text-xs">*{error}</span>
                </div>
              )}
              <div className="w-full relative mt-5 mb-1">
                <InputButton
                  text={t("actions.navigation.continue")}
                  action={handleNextAuthStep}
                  isLoading={isLoadingRequest}
                />
              </div>

              <small
                className="underline text-xs text-gray-400 cursor-pointer"
                onClick={handleForgotPassword}
              >
                {t("messages.forgotPassword.title")}
              </small>
            </form>
          )}

          {currentAuthStep === 1 && renderNextAuthStep()}
        </section>
      )}
    </article>
  );
};
