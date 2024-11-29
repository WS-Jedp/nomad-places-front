import { SatelliteLoader } from "../../../components/loaders/satellite"

export const ScreenLoaderSatellite:React.FC = () => {

    return (
        <section className="absolute top-0 left-0 w-full h-full flex flex-row items-center justify-center bg-slate-300">
            <SatelliteLoader text="Loading..." />
        </section>
    )

}