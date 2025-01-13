import { useTranslation } from "react-i18next";
import { MdAddAPhoto, MdClose } from "react-icons/md";

export interface SpotMultimediaInputProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveFile: (index: number) => void;
  files: File[];
  previews: { url: string; type: string }[];
}

export const SpotMultimediaInput: React.FC<SpotMultimediaInputProps> = ({
  files,
  handleFileChange,
  handleRemoveFile,
  previews,
}) => {
  const { t } = useTranslation()
  return (
    <div className="w-full">
      <label className="text-sm font-semibold my-1">
        { t("forms.inputs.spot.multimedia.label") }
      </label>

      {files.length == 0 && (
        <label
          className="block text-sm font-semibold my-1 bg-zinc-100 rounded-md p-3"
          htmlFor="spot-multimedia-content"
        >
          <input
            id="spot-multimedia-content"
            type="file"
            onChange={handleFileChange}
            className="mb-4"
            accept="image/*,video/*"
            multiple
            hidden
          />

          <div className="bg-zinc-100 flex flex-col items-center justify-center rounded-md h-24 cursor-pointer">
            <MdAddAPhoto size={30} />
            <p>
              { t("forms.inputs.spot.multimedia.placeholder") }
            </p>
          </div>
        </label>
      )}

      {files.length > 0 && (
        <article className="relative flex flex-col items-center justify-center p-5 bg-zinc-100 rounded-md w-full overflow-hidden">
          <div className="relative w-full flex flex-row flex-nowrap justify-start overflow-x-auto">
            {previews.map((preview, index) => (
              <article
                key={index}
                className="inline-block relative min-w-[210px] w-[210px] bg-zinc-200 p-3 rounded-md mr-2"
              >
                <div
                  onClick={() => handleRemoveFile(index)}
                  className="absolute right-0 top-0 text-coffi-black cursor-pointer p-1 bg-white shadow-md flex items-center justify-center rounded-full z-40"
                >
                  <MdClose size={21} />
                </div>
                {preview.type === "image" ? (
                  <img
                    src={preview.url}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <video
                    src={preview.url}
                    controls
                    className="w-full  h-full object-cover rounded-md"
                  />
                )}
              </article>
            ))}
          </div>
        </article>
      )}

      {files.length > 0 && (
        <label
          className="block text-sm font-semibold my-1 bg-blue-500 text-white rounded-md p-3 hover:bg-blue-300"
          htmlFor="spot-multimedia-content"
        >
          <input
            id="spot-multimedia-content"
            type="file"
            onChange={handleFileChange}
            className="mb-4"
            accept="image/*,video/*"
            multiple
            hidden
          />

          <div className="relative w-full flex flex-row items-center justify-center rounded-md cursor-pointer text-center">
            <p className="font-normal text-md ">Add more multimedia</p>
            <MdAddAPhoto
              size={21}
              className="absolute right-0 top-0 bottom-0"
            />
          </div>
        </label>
      )}
    </div>
  );
};
