
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../common/hooks/useTypedSelectors";
import { InputButton } from "../../../components/buttons/inputButton";
import { TextInput } from "../../../components/form/inputs/text";
import { AuthServices } from "../../../services/auth";
import { authUser, registerUser } from "../../../store/redux/slices/user";

type AuthFormModalProps = {
    closeCallback: () => void;
    successfulRegisterCallback: () => void;
}

export const AuthFormModal: React.FC<AuthFormModalProps> = ({ closeCallback, successfulRegisterCallback }) => {

    const dispatch = useAppDispatch()
    const { userData, auth } = useAppSelector(state => state.user)

    const authServices = new AuthServices()
    const [isLoadingRequest, setIsLoadingRequest] = useState<boolean>(false)

    const [email, setEmail] = useState<string>('')
    function handleEmailChange(value: string) {
        setEmail(value)
    }

    const [username, setUsername] = useState<string>('')
    function handleUsername(value: string) {
        setUsername(value)
    }

    const [firstName, setFirstName] = useState<string>('')
    function handleFirstName(value: string) {
        setFirstName(value)
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

    async function handleNextAuthStep() {
        setIsLoadingRequest(true)
        const confirmResp = await authServices.userExists(email)
        if(!confirmResp.exists) {
            setCurrentAuthStep(1)
            setIsRegister(true)
        } else {
            setCurrentAuthStep(1)
            setIsLogin(true)
        }
        setIsLoadingRequest(false)
    }

    async function handleLogin() {
        try {
            setIsLoadingRequest(true)
            await dispatch( authUser({ username: email, password }) )
            setIsLoadingRequest(false)
            closeCallback()
        } catch (error) {
            console.log(error)
        }
    }

    async function handleRegister() {
        try {
            setIsLoadingRequest(true)
            await dispatch( registerUser({
                payload: {
                    personData: {
                        firstName,
                    },
                    userData: {
                        email,
                        username,
                        password,
                    }
                }
            }) )
            setIsLoadingRequest(false)
            successfulRegisterCallback()
        } catch (error) {
            console.log(error)
        }
    }

    function renderNextAuthStep() {
        if(isRegister) {
            return (
                <form action="" className="w-full" onSubmit={(ev) => ev.preventDefault()}>
                    <div className="mb-2">
                        <TextInput 
                            type="email"
                            label="Email"
                            placeholder="Write your email"
                            callback={handleEmailChange}
                            value={email}
                        />
                    </div>

                    <div className="mb-2">
                        <TextInput 
                            type="text"
                            label="Username"
                            placeholder="Write your username"
                            callback={handleUsername}
                            value={username}
                        />
                    </div>

                    <div className="mb-2">
                        <TextInput 
                            type="text"
                            label="First name"
                            placeholder="Write your first name"
                            callback={handleFirstName}
                            value={firstName}
                        />
                    </div>

                    <div className="mb-2">
                        <TextInput 
                            type="password"
                            label="Password"
                            placeholder="Write your password"
                            callback={handlePasswordChange}
                            value={password}
                        />
                    </div>
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
                            action={handleRegister}
                            isLoading={isLoadingRequest}
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
                            action={handleLogin}
                            isLoading={isLoadingRequest}
                        />
                        {/* <small className="underline text-sm text-gray-300 mt-2 cursor-pointer">
                            Forgot your password?
                        </small> */}
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
                                    isLoading={isLoadingRequest}
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