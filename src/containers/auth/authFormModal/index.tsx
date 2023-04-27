
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { InputButton } from "../../../components/buttons/inputButton";
import { SimpleButton } from "../../../components/buttons/simple";
import { TextInput } from "../../../components/form/inputs/text";

type AuthFormModalProps = {
    closeCallback: () => void;
}

export const AuthFormModal: React.FC<AuthFormModalProps> = ({ closeCallback }) => {

    const [email, setEmail] = useState<string>('')
    function handleEmailChange(value: string) {
        setEmail(value)
    }

    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    function handlePasswordChange(value: string) {
        setPassword(value)
    }
    function handleConfirmPasswordChange(value: string) {
        setConfirmPassword(value)
    }

    function isConfirmPasswordValid() {
        return (password === confirmPassword)
    }

    const [currentAuthStep, setCurrentAuthStep] = useState<number>(0)
    const [isRegister, setIsRegister] = useState<boolean>(false)
    const [isLogin, setIsLogin] = useState<boolean>(false)

    function handleNextAuthStep() {
        setCurrentAuthStep(1)
        setIsRegister(true)
    }

    function renderNextAuthStep() {
        if(isRegister) {
            return (
                <form action="" className="w-full" onSubmit={(ev) => ev.preventDefault()}>
                    <TextInput 
                        type="password"
                        label="Password"
                        placeholder="Write your password"
                        callback={handlePasswordChange}
                        value={password}
                    />
                    <TextInput 
                        type="password"
                        label="Confirmation password"
                        placeholder="Confirm your password"
                        callback={handleConfirmPasswordChange}
                        value={confirmPassword}
                        isError={!isConfirmPasswordValid()}
                        feedbackMessage={isConfirmPasswordValid() ? undefined : 'Passwords do not match'}
                    />
                    <div className="w-full relative mt-5">
                        <InputButton 
                            text="Register"
                            action={() => {}}
                        />
                    </div>
                </form>
            )
        }

        if(isLogin) {
            return (
                <form action="" className="w-full" onSubmit={(ev) => ev.preventDefault()}>
                    <TextInput 
                        type="password"
                        label="Password"
                        placeholder="Write your password"
                        callback={handlePasswordChange}
                        value={password}
                    />
                    <div className="w-full relative mt-5">
                        <InputButton 
                            text="Login"
                            action={() => {}}
                        />
                        <small className="underline text-sm text-gray-300 mt-2 cursor-pointer">
                            Forgot your password?
                        </small>
                    </div>
                </form>
            )
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

                <h2 className="font-bold text-2xl">Login or register</h2>
            </section>

            <section className="relative flex flex-col items-start justify-start py-3">
                <h2 className="text-lg font-bold mb-3">
                    Welcome to Spots
                </h2>

                {
                    currentAuthStep === 0 && (
                        <form action="" className="w-full" onSubmit={(ev) => ev.preventDefault()}>
                            <TextInput 
                                type="text"
                                label="Email"
                                placeholder="Email"
                                callback={handleEmailChange}
                                value={email}
                                isValid
                                feedbackMessage="Email is invalid"
                            />
                            <div className="w-full relative mt-5">
                                <InputButton 
                                    text="Continue"
                                    action={handleNextAuthStep}
                                />
                            </div>
                        </form>
                    )
                }

                {
                    currentAuthStep === 1 && renderNextAuthStep()
                }

            </section>

        </article>
    )
}