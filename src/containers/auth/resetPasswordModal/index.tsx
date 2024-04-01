import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { InputButton } from "../../../components/buttons/inputButton";
import { TextInput } from "../../../components/form/inputs/text";
import { AuthServices } from "../../../services/auth";
import { addError } from "../../../store/redux/slices/controlledErrors";
import { SimpleButton } from "../../../components/buttons/simple";

type ResetPasswordModalProps = {
  email: string;
  token: string;
  closeCallback: () => void;
};

export const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  email,
  token,
  closeCallback,
}) => {
  const authServices = new AuthServices();

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isPasswordUpdated, setIsPasswordUdpated] = useState<boolean>();
  const [isLoadingRequest, setIsLoadingRequest] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const { t } = useTranslation();

  async function handleResetPassword() {
    if (!password) {
      setError(t("forms.messages.auth.password.error"));
      return;
    }
    if (password !== confirmPassword) {
      setError(t("forms.messages.auth.passwordMatch.error"));
      return;
    }

    setIsLoadingRequest(true);
    try {
      await authServices.resetPassword(email, token, password);
      setIsPasswordUdpated(true);
      setPassword('')
      setConfirmPassword('')
    } catch (err) {
      //   addError(err)
    } finally {
      setIsLoadingRequest(false);
    }
  }

  function isConfirmPasswordValid() {
    return password === confirmPassword;
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
          {t("messages.resetPassword.title")}
        </h2>
      </section>

      <p className="text-start my-3">{t("messages.resetPassword.updatingPassword", {email})}</p>

      <section className="relative flex flex-col items-start justify-start py-3">
        <form
          action=""
          className="w-full"
          onSubmit={(ev) => ev.preventDefault()}
        >
          <TextInput
            type="password"
            label={t("forms.inputs.auth.password.label")}
            placeholder={t("forms.inputs.auth.password.placeholder")}
            callback={(val) => setPassword(val)}
            value={password}
            isValid
          />
          <TextInput
            type="password"
            label={t("forms.inputs.auth.passwordConfirmation.label")}
            placeholder={t(
              "forms.inputs.auth.passwordConfirmation.placeholder"
            )}
            callback={(val) => setConfirmPassword(val)}
            value={confirmPassword}
            isError={!isConfirmPasswordValid()}
            feedbackMessage={
              isConfirmPasswordValid()
                ? undefined
                : t("forms.messages.auth.passwordMatch.error")
            }
          />
          {error && (
            <div className="w-full mt-1 text-start">
              <span className="text-red-500 text-xs">*{error}</span>
            </div>
          )}
          <div className="w-full relative mt-5 mb-1">
            {isPasswordUpdated ? (
              <div className="flex align-center justify-center flex-col w-full text-center">
                <span className="text-green-500 text-sm mb-3">
                  {t("messages.resetPassword.passwordUpdated")}
                </span>
                <SimpleButton
                  text={t("actions.general.close")}
                  action={closeCallback}
                />
              </div>
            ) : (
              <InputButton
                text={t("actions.auth.updatePassword")}
                disabled={!isConfirmPasswordValid()}
                action={handleResetPassword}
                isLoading={isLoadingRequest}
              />
            )}
          </div>
        </form>
      </section>
    </article>
  );
};
