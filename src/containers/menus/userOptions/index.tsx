import { useEffect } from "react"
import { useAppSelector } from "../../../common/hooks/useTypedSelectors"

export enum UserMenuOptions {
    register = 'register',
    login = 'login',
    recommend = 'recommend',
    about = 'about',
    logout = 'logout'
}

type UserOptionsMenuProps = {
    callback: (menuOption: UserMenuOptions) => void
}

export const UserOptionsMenu:React.FC<UserOptionsMenuProps> = ({ callback }) => {

    const { isAuth } = useAppSelector(state => state.user.auth)
    const userData = useAppSelector(state => state.user.userData)

    function handleAction(option: UserMenuOptions) {
        callback(option)
    }

    return (
        <article className="
                absolute right-0
                block flex-col items-start justify-start
                mt-3
                w-52  overflow-y-auto rounded-lg
                bg-white shadow-xl
                text-black
            "
        >
            {
                isAuth ? (
                    <>
                        <div className="px-6 py-3 w-full h-auto text-start bg-gray-50">
                            <h2 className="font-medium text-sm">Hello {userData?.personalInformation?.firstName}</h2>
                        </div>
                        <button className="px-6 py-3 w-full h-auto text-start hover:bg-gray-50" onClick={() => handleAction(UserMenuOptions.logout)}>
                            <h2 className="font-regular text-sm font-semibold text-red-500">Log out</h2>
                        </button>
                    </>
                ) : (
                    <>
                        <button className="px-6 py-3 w-full h-auto text-start hover:bg-gray-50" onClick={() => handleAction(UserMenuOptions.register)}>
                            <h2 className="font-medium text-sm">Register</h2>
                        </button>
                        <button className="px-6 py-3 w-full h-auto text-start hover:bg-gray-50" onClick={() => handleAction(UserMenuOptions.login)}>
                            <h2 className="font-regular text-sm">login</h2>
                        </button>
                    </>
                )
            }

                <div className="bg-gray-300 w-full h-[1px]"></div>

                <button className="px-6 py-3 w-full h-auto text-start hover:bg-gray-50" onClick={() => handleAction(UserMenuOptions.recommend)}>
                    <h2 className="font-regular text-sm">Recommend a spot</h2>
                </button>
                <button className="px-6 py-3 w-full h-auto text-start hover:bg-gray-50" onClick={() => handleAction(UserMenuOptions.about)}>
                    <h2 className="font-regular text-sm">About spots</h2>
                </button>
        </article>
    )
}