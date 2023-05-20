import { IonRow } from "@ionic/react"
import { useState } from "react"
import { IoMdAdd } from "react-icons/io"
import { verifyFileSize, verifyFileType, verifyVideoDuration } from "../../../../../common/utils/files"
import { MULTIMEDIA_TYPE } from "../../../../../models/multimedia"

export const AddRecentActivityForm: React.FC = () => {

    const [file, setFile] = useState<File>()
    const [fileType, setFileType] = useState<MULTIMEDIA_TYPE>()
    const [error, setError] = useState<string | null>(null)

    function handleInputFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const inputFile = event.target.files![0]
        const fileType = verifyFileType(inputFile)

        switch (fileType) {
            case MULTIMEDIA_TYPE.IMAGE:
                const fileSize = verifyFileSize(inputFile)
                if(!fileSize) setError("File size is too big")
                setFileType(MULTIMEDIA_TYPE.IMAGE)
                setError(null)
                break

            case MULTIMEDIA_TYPE.VIDEO:
                verifyVideoDuration(inputFile, function() {
                    setError("Video duration is too long")
                    setFile(undefined)
                })
                setFileType(MULTIMEDIA_TYPE.VIDEO)
                setError(null)
                break

            default:
                setError("File type is not supported")
                setFile(undefined)
                return
        }
        if(!error) setFile(inputFile)
    }


    return (
        <IonRow className="
            relative
            w-full p-3
            flex flex-col items-center justify-center
        ">

            <label className="
                relative
                w-72 min-h-72 h-96
                bg-gray-50 border border-solid border-gray-600 rounded-xl
                
                flex flex-col items-center justify-center
                cursor-pointer
            "
            htmlFor="file-input"
            >
                <input type="file" name="file-input" id="file-input" hidden onChange={handleInputFileChange} onInput={handleInputFileChange} />

                {
                    file ? (
                        <div className="relative w-full h-full flex flex-col items-center justify-center">
                            {
                                fileType === MULTIMEDIA_TYPE.IMAGE ? (
                                    <img src={URL.createObjectURL(file)} alt="recent-activity" className="w-full h-full object-cover rounded-xl" />
                                ) : (
                                    <video src={URL.createObjectURL(file)} autoPlay className="w-full h-full object-cover rounded-xl" />
                                )
                            }
                        </div>
                    ) : (
                        <div className="w-full flex flex-col items-center justify-center">
                            <IoMdAdd size={60} color='gray' className="m-3"/>
                            <p>
                                Pick a multimedia file
                            </p>
                        </div>
                    )
                }

            </label>
            {
                file && (
                    <div className="flex flex-col items-center justify-center">
                        <p className="my-3">
                            {file.name}
                        </p>
                        <button className="text-red-500 underline cursor-pointer" onClick={() => setFile(undefined)}>
                            Remove file
                        </button>
                    </div>
                )
            }

            {
                error && (
                    <span className="text-red-500 my-3">
                        * {error}
                    </span>
                )
            }
        </IonRow>
    ) 
}