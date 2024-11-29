import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoCamera } from "react-icons/io5";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Capacitor } from "@capacitor/core";

interface RecentActivityButtonProps {
  onError: (error: string) => void;
  onSuccess: (file: File) => void;
}

export const RecentActivityButton: React.FC<RecentActivityButtonProps> = ({
  onError,
  onSuccess,
}) => {
  const [isCapturing, setIsCapturing] = useState(false);

  const handleCapture = async () => {
    try {
      setIsCapturing(true);

      // Open the device camera
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        quality: 1080,
        saveToGallery: true,
        presentationStyle: "popover",
      });

      if (photo.dataUrl) {
        const response = await fetch(photo.dataUrl);
        const blob = await response.blob();
        const file = new File([blob], `spot-story-${blob.type}`, {
          type: blob.type,
        });

        // Pass the file to the success handler
        onSuccess(file);
      }
    } catch (error) {
      console.error("Error capturing media:", error);
      onError("Failed to capture media. Please try again.");
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-1 mr-3">
      {/* Camera button */}
      <button
        onClick={handleCapture}
        className="
            relative
            w-[42px] h-[42px]
            inline-flex items-center justify-center
            rounded-full
            bg-gray-200
            ring-2 ring-offset-2 ring-gray-200
            cursor-pointer
            transition ease-in-out
            hover:shadow-sm
            disabled:opacity-50
          "
        disabled={isCapturing}
      >
        <IoCamera size={24} className="text-gray-500" />

        <span
          className="
              absolute overflow-hidden
              bottom-0 right-[-3px]
              w-[15px] h-[15px]
              inline-flex items-center justify-center
              rounded-full
              bg-gray-400
              text-white
          "
        >
          <FaPlus size={9} />
        </span>
      </button>
    </div>
  );
};
