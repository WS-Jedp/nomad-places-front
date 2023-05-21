import { MULTIMEDIA_TYPE } from "../../../models/multimedia"

// Method that validates if the file is a video or an image
export function verifyFileType(file: File): MULTIMEDIA_TYPE | null {
    const fileType = file.type
    const validImageTypes = ['image/jpeg', 'image/png']
    const validVideoTypes = ['video/mp4', 'video/quicktime']

    if (validImageTypes.includes(fileType)) {
        return MULTIMEDIA_TYPE.IMAGE
    }

    if (validVideoTypes.includes(fileType)) {
        return MULTIMEDIA_TYPE.VIDEO
    }

    return null
}


// Method that validates a video file is not longer than 10 seconds
export async function verifyVideoDuration(file: File, onError: () => void) {
    const video = document.createElement('video')
    video.preload = 'metadata'
    video.onloadedmetadata = function() {
        window.URL.revokeObjectURL(video.src)
        const duration = video.duration
        const durationLimit = 10
        if (duration > durationLimit) {
            onError()
            return false
        }
        return true
    }
    video.src = await URL.createObjectURL(file)
}

// Method that validates the size of the file
export function verifyFileSize(file: File) {
    const fileSize = file.size / 1024 / 1024
    const fileSizeLimit = 5

    if (fileSize > fileSizeLimit) {
        return false
    }

    return true
}