import { IonRow } from "@ionic/react"
import { useState } from "react"
import { MdArrowBack, MdHome, MdLanguage, MdOutlineWork, MdWork } from "react-icons/md"
import { useHistory } from "react-router"
import { useAppSelector } from "../../../common/hooks/useTypedSelectors"
import { EditProfileModal } from "../../../containers/profile/editProfileModal"
import { AppLayout } from "../../../layouts/AppLayout"

export const ProfilePage: React.FC = () => {
    const { userData } = useAppSelector(state => state.user)
    const history = useHistory()
    function handleBackButton() {
        history.push('/home')
    }

    const [editModal, setEditModal] = useState(false)

    function onClose(){
        setEditModal(false)
    }
    function onSave() {
        setEditModal(false)
    }

    return (
        <IonRow className="
            relative
            w-full h-full
            bg-gray-100 text-black
            flex items-center justify-center
        ">
            <IonRow className="w-full p-5 bg-white flex flex-row items-center justify-between">
                <MdArrowBack size={24} onClick={handleBackButton} className="cursor-pointer" />

                <span className="font-bold underline cursor-pointer" onClick={() => setEditModal(true)}>
                    Edit
                </span>
            </IonRow>
            <IonRow className="flex flex-col w-full h-full max-w-xl md:shadow-md">
                <IonRow className="flex flex-col p-5">
                    <figure className="w-28 h-28 bg-gray-400 rounded-full overflow-hidden">
                        <img src={userData?.profilePicture} alt="" className="w-full h-full object-cover roudned-full" />
                    </figure>

                    <h2 className="font-bold text-4xl my-3">
                        Hey, I'm {userData?.personalInformation.firstName}
                    </h2>
                    <span className="font-light text-md">
                        Joined in 2021
                    </span>
                </IonRow>

                <div className="w-full h-[1px] bg-gray-400"></div>

                <IonRow className="flex flex-col p-5">
                    <h2 className="font-bold text-3xl mb-3">About</h2>
                    <p className="font-light text-md">

                        {
                            userData?.personalInformation.about ? (
                                <span>
                                    {
                                        userData?.personalInformation.about
                                    }
                                </span>
                            ) : (
                                <span>
                                    There is no a description yet. :(
                                </span>
                            )
                        }
                    </p>

                    <section className="my-5">
                        <div className="w-full flex flex-row items-center justify-start mb-3">
                            <MdLanguage size={30} className="mr-2" />
                            {
                                userData?.personalInformation.languages ? (
                                    <p className="font-light text-md">
                                        Speaks {userData?.personalInformation.languages}
                                    </p>
                                ) : (
                                    <p className="font-light text-md">
                                        We don't know which languages speak
                                    </p>
                                )
                            }
                        </div>

                        <div className="w-full flex flex-row items-center justify-start mb-3">
                            <MdHome size={30} className="mr-2" />
                            {
                                userData?.personalInformation.country ? (
                                    <p className="font-light text-md">
                                        From Medellin, Colombia
                                    </p>
                                ) : (
                                    <p className="font-light text-md">
                                        We don't know where it's from
                                    </p>
                                )
                            }
                        </div>

                        <div className="w-full flex flex-row items-center justify-start mb-3">
                            <MdOutlineWork size={30} className="mr-2" />
                            {
                                userData?.personalInformation.work ? (
                                    <p className="font-light text-md">
                                        Work at {userData?.personalInformation.work}
                                    </p>
                                ) : (
                                    <p className="font-light text-md">
                                        We don't know about his job
                                    </p>
                                )
                            }
                        </div>
                    </section>
                </IonRow>
            </IonRow>

            {
                editModal && (
                    <EditProfileModal 
                        closeCallback={onClose}
                        saveCallback={onSave}
                    />
                )
            }
        </IonRow>
    )
}