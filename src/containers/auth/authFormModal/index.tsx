import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useTranslation } from "react-i18next";
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

type AuthFormModalProps = {
  closeCallback: () => void;
  successfulRegisterCallback: () => void;
};

export const AuthFormModal: React.FC<AuthFormModalProps> = ({
  closeCallback,
  successfulRegisterCallback,
}) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch();
  const { userData, auth } = useAppSelector((state) => state.user);
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

  function isConfirmPasswordValid() {
    return password === confirmPassword;
  }

  const [currentAuthStep, setCurrentAuthStep] = useState<number>(0);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [forgotPassword, setIsForgotPassword] = useState(false);

  function handleForgotPassword() {
    setIsForgotPassword(true);
    setIsLogin(false);
    setIsRegister(false);
  }

  function handleCancelForgotPassword() {
    setIsForgotPassword(false);
    setIsLogin(false);
    setIsRegister(false);
    setCurrentAuthStep(0)
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
      await dispatch(authUser({ username: email, password }));
      setIsLoadingRequest(false);
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
      await dispatch(
        registerUser({
          payload: {
            personData: {
              firstName,
            },
            userData: {
              email,
              username,
              password,
            },
          },
        })
      );
      setIsLoadingRequest(false);
      successfulRegisterCallback();
    } catch (error) {
      // dispatch( addError(new ControlledError(String(error), ControlledErrorType.REQUEST)) )
      setError(String(error));
    } finally {
      setIsLoadingRequest(false);
    }
  }

  function renderNextAuthStep() {
    if (isRegister) {
      return (
        <form
          action=""
          className="w-full"
          onSubmit={(ev) => ev.preventDefault()}
        >
          <div className="mb-2">
            <TextInput
              type="email"
              label={t('forms.inputs.auth.email.label')}
              placeholder={t('forms.inputs.auth.email.placeholder')}
              callback={handleEmailChange}
              value={email}
            />
          </div>

          <div className="mb-2">
            <TextInput
              type="text"
              label={t('forms.inputs.auth.username.label')}
              placeholder={t('forms.inputs.auth.username.placeholder')}
              callback={handleUsername}
              value={username}
            />
          </div>

          <div className="mb-2">
            <TextInput
              type="text"
              label={t('forms.inputs.auth.firstName.label')}
              placeholder={t('forms.inputs.auth.firstName.placeholder')}
              callback={handleFirstName}
              value={firstName}
            />
          </div>

          <div className="mb-2">
            <TextInput
              type="password"
              label={t('forms.inputs.auth.password.label')}
              placeholder={t('forms.inputs.auth.password.placeholder')}
              callback={handlePasswordChange}
              value={password}
            />
          </div>
          <TextInput
            type="password"
            label={t('forms.inputs.auth.passwordConfirmation.label')}
            placeholder={t('forms.inputs.auth.passwordConfirmation.placeholder')}
            callback={handleConfirmPasswordChange}
            value={confirmPassword}
            isError={!isConfirmPasswordValid()}
            feedbackMessage={
              isConfirmPasswordValid() ? undefined : t('forms.messages.passwordMatch.error')
            }
          />
          <div className="w-full relative mt-5">
            <InputButton
              text={t('actions.auth.register')}
              action={handleRegister}
              isLoading={isLoadingRequest}
            />
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
            label={t('forms.inputs.auth.password.label')}
            placeholder={t('forms.inputs.auth.password.placeholder')}
            callback={handlePasswordChange}
            value={password}
          />
          <div className="w-full relative mt-5">
            <InputButton
              text={t('actions.auth.login')}
              action={handleLogin}
              isLoading={isLoadingRequest}
            />
          </div>
        </form>
      );
    }
  }

  return (
    <article className="bg-white rounded-lg p-6 shadow-xl text-black w-[90%] max-w-xl">
      <section className="w-full relative flex flex-row flex-nowrap items-center justify-between bg-white border-b border-solid border-gray-300 pb-3">
        <button
          className="flex items-center justify-center border border-white rounded-full"
          onClick={closeCallback}
        >
          <MdClose size={24} />
        </button>

        
        <h2 className="font-bold text-2xl">
            {
                forgotPassword ? t('messages.forgotPassword.title') : t('messages.auth.loginOrRegister')
            }
        </h2>
      </section>

      {forgotPassword ? (
        <section className="relative flex flex-col items-start justify-start py-3">
            <h2 className="font-bold text-base">
              { t('messages.resetPassword.title') }
            </h2>
            <p className="text-start text-sm mb-3">
              { t('messages.resetPassword.message') }
            </p>
            <form
              action=""
              className="w-full"
              onSubmit={(ev) => ev.preventDefault()}
            >
              <TextInput
                type="text"
                label={t('forms.inputs.auth.email.label')}
                placeholder={t('forms.inputs.auth.email.placeholder')}
                callback={handleEmailChange}
                value={email}
                isValid
                feedbackMessage={t('forms.messages.email.invalid')}
              />
              {error && (
                <div className="w-full mt-1 text-start">
                  <span className="text-red-500 text-xs">*{error}</span>
                </div>
              )}
              <div className="w-full relative mt-5 mb-1">
                <InputButton
                  text={t('actions.auth.sendLink')}
                  action={() => {}}
                  isLoading={isLoadingRequest}
                />
              </div>
              <small
                className="underline text-xs text-gray-400 cursor-pointer"
                onClick={handleCancelForgotPassword}
              >
                { t('actions.general.cancel') }
              </small>
            </form>
        </section>
      ) : (
        <section className="relative flex flex-col items-start justify-start py-3">
          <h2 className="text-lg font-bold mb-3">{t('messages.welcome.title')}</h2>

          {currentAuthStep === 0 && (
            <form
              action=""
              className="w-full"
              onSubmit={(ev) => ev.preventDefault()}
            >
              <TextInput
                type="text"
                label={t('forms.inputs.auth.email.label')}
                placeholder={t('forms.inputs.auth.email.placeholder')}
                callback={handleEmailChange}
                value={email}
                isValid
                feedbackMessage={t('forms.messages.email.invalid')}
              />
              {error && (
                <div className="w-full mt-1 text-start">
                  <span className="text-red-500 text-xs">*{error}</span>
                </div>
              )}
              <div className="w-full relative mt-5 mb-1">
                <InputButton
                  text={t('actions.navigation.continue')}
                  action={handleNextAuthStep}
                  isLoading={isLoadingRequest}
                />
              </div>

              <small
                className="underline text-xs text-gray-400 cursor-pointer"
                onClick={handleForgotPassword}
              >
                { t('messages.forgotPassword.title') }
              </small>
            </form>
          )}

          {currentAuthStep === 1 && renderNextAuthStep()}
        </section>
      )}
    </article>
  );
};
