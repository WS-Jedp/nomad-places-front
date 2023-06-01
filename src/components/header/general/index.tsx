import { useEffect, useState } from 'react'
import { IonHeader } from '@ionic/react'
import { FaUserAlt, FaLocationArrow } from 'react-icons/fa'
import { IoMdMenu } from 'react-icons/io'
import { MdSearch } from 'react-icons/md'
import { SearchSpotsGeneralFilters } from '../../../containers/filters/mobile/searchSpotsGeneralFilters'
import { BlurAppModal } from '../../modals/blurContainer'
import { GeneralFiltersEnum } from '../../../models/filters'
import { UserMenuOptions, UserOptionsMenu } from '../../../containers/menus/userOptions'
import { AppModal } from '../../modals/container'
import { AuthFormModal } from '../../../containers/auth/authFormModal'
import { useHistory } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/useTypedSelectors'
import { getUserData, logout } from '../../../store/redux/slices/user'
import { TOKEN_KEY } from '../../../common/constants/localstorage'
import { SimpleButton } from '../../buttons/simple'

export const GeneralHeader: React.FC = () => {

    const history = useHistory()
    const { spotAmountPeopleFilter, selectedSpotAmountPeopleFilter, spotCommoditiesFilter, selectedSpotCommoditiesFilter } = useAppSelector(state => state.filters)
    const dispatch = useAppDispatch()
    const [showUserOptions, setShowUserOptiosn] = useState<boolean>(false)

    function handleShowUserOptions() {
        setShowUserOptiosn(!showUserOptions)
    }


    const [showFilters, setShowFilters] = useState<boolean>(false)
    const [currentFilter, setCurrentFilter] = useState<GeneralFiltersEnum>(GeneralFiltersEnum.none)

    function handleOpenFilters(currentFilter: GeneralFiltersEnum) {
        setShowFilters(true)
        setCurrentFilter(currentFilter)
    }

    const [authModal, setAuthModal] = useState<boolean>(false)
    const [registered, setRegistered] = useState<boolean>(false)

    function successfulRegister() {
        setAuthModal(false)
        setRegistered(true)
    }

    function closeAuthModal() {
        setAuthModal(false)
    }

    function handleUserMenuOptions(option: UserMenuOptions) {
        setShowUserOptiosn(false)
        switch (option) {
            case UserMenuOptions.register:
                setAuthModal(true)
                break
            case UserMenuOptions.login:
                setAuthModal(true)
                break
            case UserMenuOptions.logout:
                dispatch(logout())
                break
            case UserMenuOptions.about:
                console.log('Go to about page')
                break
            case UserMenuOptions.recommend:
                console.log('Go to recommend page and auth if not logged in')
                break
        }

    }

    function onLogo() {
        history.push('/home')
    }

    function handleSpotPeopleAmountFilterValue() {
        if(!selectedSpotAmountPeopleFilter) return "¿How many people?"
        const spotPeopleAmountOption = spotAmountPeopleFilter.find(peopleAmount => peopleAmount.id === selectedSpotAmountPeopleFilter)
        if(!spotPeopleAmountOption) return "¿How many people?"

        return `${spotPeopleAmountOption.text} People`
    }

    function handleSpotCommoditiesFilterValue() {
        if(!selectedSpotCommoditiesFilter) return "¿What do you need?"
        const firstSelectedCommodity = selectedSpotCommoditiesFilter[0]

        const spotCommoditiesOption = spotCommoditiesFilter.find(commodity => commodity.id === firstSelectedCommodity)

        if(!spotCommoditiesOption) return "¿What do you need?"

        if(selectedSpotCommoditiesFilter.length > 1) return `${spotCommoditiesOption.name} +${selectedSpotCommoditiesFilter.length - 1}`

        return `${spotCommoditiesOption.name}`
    }

    async function automaticallyAuthUser() {
        const token = localStorage.getItem(TOKEN_KEY)
        if(token) {
            await dispatch(getUserData({ token }))
        }
    }

    useEffect(() => {
        automaticallyAuthUser()
    }, [])

    return (
        <IonHeader
                className="
                    flex items-center justify-between
                    fixed md:sticky top-0 w-full
                    md:border-b md:border-gray-300
                    px-3 md:px-9 py-5 m-0
                    bg-none md:bg-white
                    ion-no-border
                    z-50
                "
            >
                <h1 className="block font-bold text-black text-xl cursor-pointer" onClick={onLogo}>
                    Spots
                </h1>

                <div className='
                    flex flex-flow items-center justify-center w-full md:w-auto
                    bg-white rounded-full shadow-sm py-2 px-6 mx-5
                    border border-gray-200
                    cursor-pointer
                    hover:shadow-md
                    transition-all duration-300
                '
                    onClick={() => handleOpenFilters(GeneralFiltersEnum.none)}
                >
                    <button className='text-black text-sm font-medium' onClick={() => handleOpenFilters(GeneralFiltersEnum.none)}>
                        Search for a spot
                    </button>
                    <span className='hidden md:flex separator h-[21px] w-[1px] bg-gray-300 mx-3'></span>
                    <button className='hidden md:flex text-black text-sm  font-light' onClick={() => handleOpenFilters(GeneralFiltersEnum.people)}>
                        { handleSpotPeopleAmountFilterValue() }
                    </button>
                    <span className='hidden md:flex separator h-[21px] w-[1px] bg-gray-300 mx-3' onClick={() => handleOpenFilters(GeneralFiltersEnum.commodities)}></span>
                    <button className='hidden md:flex text-black text-sm  font-light'>
                        { handleSpotCommoditiesFilterValue() }
                    </button>

                    <span className='rounded-full p-1 bg-blue-400 ml-3'>
                        <MdSearch size={18} color='white' />
                    </span>
                </div>


                <section className='flex flex-row flex-nowrap items-center justify-center'>
                    <button className='
                            hidden md:flex
                            flex-items flex-nowrap 
                            py-2 px-4 mr-3 
                            items-center justify-center 
                            outline outline-1 outline-gray-300 rounded-full 
                            text-center 
                            cursor-pointer
                            hover:bg-gray-100
                        '
                    >
                        <span className='text-black text-sm'>
                            Recommend a spot
                        </span>
                    </button>
                    <span className='
                            p-3 mr-2
                            hidden md:flex items-center justify-center
                            rounded-full outline outline-1 outline-gray-300
                            cursor-pointer
                            hover:bg-gray-100
                        '
                    >
                        <FaLocationArrow size={12} color='gray' />
                    </span>
                    <span className='
                            relative
                            p-3
                            inline-block items-center justify-center
                            bg-white
                            rounded-full outline outline-1 outline-gray-300
                            hover:bg-gray-100
                        '
                    >
                        <div className='w-full h-full cursor-pointer flex flex-row flex-nowrap items-center justify-center' onClick={handleShowUserOptions}>
                            <IoMdMenu size={18} color='gray' className='mr-1' />
                            <FaUserAlt size={13} color='gray' />
                        </div>

                        {
                            showUserOptions && (
                                <UserOptionsMenu 
                                    callback={handleUserMenuOptions}
                                />
                            )
                        }
                    </span>

                </section>

                {
                    showFilters && (
                        <BlurAppModal> 
                            <SearchSpotsGeneralFilters defaultFilter={currentFilter} closeCallback={() => setShowFilters(false)} />
                        </BlurAppModal>
                    )
                }

                {
                    authModal && (
                        <AppModal>
                            <AuthFormModal 
                                closeCallback={closeAuthModal}
                                successfulRegisterCallback={successfulRegister}
                            />
                        </AppModal>
                    )
                }

                {
                    registered && (
                        <AppModal>
                            <section className='
                                    relative flex flex-col items-center justify-center
                                    w-[90%] max-w-xl
                                    bg-white 
                                    rounded-lg
                                    p-6 shadow-xl 
                                    text-black 
                                '
                            >
                                <h2 className='text-2xl font-bold'>Welcome to Spots! 🎉 </h2>
                                <div className='w-full h-[2px] my-3 bg-gray-300'></div>
                                <p className='mb-6'>
                                    Thanks for registering! now you can start recommending spots to your friends!
                                </p>
                                <SimpleButton 
                                    action={() => setRegistered(false)}
                                    text='Continue'
                                />
                            </section>
                        </AppModal>
                    )
                }

            </IonHeader>
    )
}