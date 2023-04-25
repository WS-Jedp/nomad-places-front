
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
                            action={() => {}}
                        />
                    </div>
                </form>
                
            </section>

        </article>
    )
}