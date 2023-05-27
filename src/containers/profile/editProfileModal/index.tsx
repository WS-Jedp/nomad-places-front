import { IonRow } from "@ionic/react"
import { useEffect, useState } from "react"
import { IoMdClose } from "react-icons/io"
import { MdEdit } from "react-icons/md"
import { useAppDispatch, useAppSelector } from "../../../common/hooks/useTypedSelectors"
import { TextInput } from "../../../components/form/inputs/text"
import { TextAreaInput } from "../../../components/form/inputs/textarea"
import { AppModal } from "../../../components/modals/container"
import { updateUserPersonalInformation } from "../../../store/redux/slices/user"

type EditProfileModalProps = {
    closeCallback: () => void
    saveCallback?: () => void
}

export const EditProfileModal:React.FC<EditProfileModalProps> = ({ closeCallback, saveCallback }) => {

    const { userData } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    const [profilePicture, setProfilePicture] = useState<string | null>(userData?.profilePicture || null)
    const [firstName, setFirstName] = useState<string>(userData?.personalInformation.firstName || "")
    const [lastName, setLastName] = useState<string>(userData?.personalInformation.lastName || "")
    const [work, setWork] = useState<string>(userData?.personalInformation.job || "")
    const [country, setCountry] = useState<string>(userData?.personalInformation.country || "")
    const [langs, setLangs] = useState<string[]>(userData?.personalInformation.languages || [])
    const [about, setAbout] = useState<string>(userData?.personalInformation.about || "")

    function handleOnPicture(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files![0]
        const imageFile = URL.createObjectURL(file)
        setProfilePicture(imageFile)
    }

    function handleOnRemoveProfilePicture() {
        setProfilePicture(null)
    }


    function handleOnClose() {
        closeCallback()
    }

    function handleOnSave() {
        dispatch( updateUserPersonalInformation({
            personalInformation: {
                firstName,
                lastName,
                job: work,
                country,
                languages: langs,
                about
            },
            profilePicture: profilePicture || undefined
        }) )
        if(saveCallback) saveCallback()
    }

    return (
        <AppModal>
            <section className="
                relative
                flex flex-col
                bg-white text-black
                w-full max-w-sm md:max-w-xl h-[720px] max-h-[720px] md:max-h-[600px]
                rounded-lg shadow-md
                overflow-hidden
            ">
                    <IonRow className="w-full flex flex-row itesm-center justify-between p-5 shadow-sm">
                        <IoMdClose size={24} onClick={handleOnClose} />

                        <h2 className="font-bold text-md">
                            Edit profile
                        </h2>

                        <span className="font-bold text-md underline" onClick={handleOnSave}>
                            Save
                        </span>
                    </IonRow>

                    <section className="relative w-full h-full overflow-y-auto">
                        <IonRow class="flex flex-col items-center justify-start my-5">
                            <label htmlFor="profilePicture">
                                <input type="file" name="profilePicture" id="profilePicture" accept="image/jpeg,image/png" hidden onChange={handleOnPicture} onInput={handleOnPicture} />
                                <figure className="relative w-32 h-32 bg-gray-400 rounded-full">
                                    {
                                        profilePicture ? (
                                            <img src={profilePicture} alt="Profile picture" className="w-full h-full object-cover rounded-full" />
                                        ) : (
                                            <img src="" alt="" />
                                        )
                                    }

                                    <span className="absolute bottom-0 right-0 bg-white shadow-md rounded-full p-3">
                                        <MdEdit size={24} color="gray" />
                                    </span>
                                </figure>
                            </label>

                            {
                                profilePicture && (
                                    <span className="mt-5 text-red-500 text-md font-ligh underline cursor-pointer" onClick={handleOnRemoveProfilePicture}>
                                        Remove picture
                                    </span>
                                )
                            }
                        </IonRow>

                        <IonRow class="flex flex-col items-start justify-start my-5 px-6">
                            <div className="w-full my-2">
                                <TextInput 
                                    callback={(value) => setFirstName(value)}
                                    placeholder="Write your firstname"
                                    type="text"
                                    label="First name"
                                    value={firstName}
                                />
                            </div>
                            <div className="w-full my-2">
                                <TextInput 
                                    callback={(value) => setLastName(value)}
                                    placeholder="Write your lastname"
                                    type="text"
                                    label="Last name"
                                    value={lastName}
                                />
                            </div>
                            <div className="w-full my-2">
                                <TextInput 
                                    callback={(value) => setCountry(value)}
                                    placeholder="City, Country"
                                    type="text"
                                    label="Where you from?"
                                    value={country}
                                />
                            </div>
                            <div className="w-full my-2">
                                <TextInput 
                                    callback={(value) => setLangs(value.split(","))}
                                    placeholder="English, Spanish"
                                    type="text"
                                    label="What languages you speak?"
                                    value={langs.join(',')}
                                />
                            </div>
                            <div className="w-full my-2">
                                <TextInput
                                    callback={(value) => setWork(value)}
                                    placeholder="Software Engineer"
                                    type="text"
                                    label="What is your job?"
                                    value={work}
                                />
                            </div>
                            <div className="w-full my-2">
                                <TextAreaInput
                                    callback={(value) => setAbout(value)}
                                    placeholder="Tell us something about you"
                                    label="About"
                                    value={about}
                                    rows={5}
                                />
                            </div>
                        </IonRow>
                    </section>

            </section>
        </AppModal>
    )
}