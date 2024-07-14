import { MULTIMEDIA_TYPE } from '../../../../../models/multimedia';
import { MultimediaHoverCardImage } from '../../hoverImage';
import { MultimediaCardImage } from '../../image'
import { MultimediaCardVideo } from '../../video'

export const HandleMultimediaCard: React.FC<{ type: MULTIMEDIA_TYPE, url: string, withHoverEffect?: boolean }> = ({ type, url, withHoverEffect = false }) => {

    switch (type) {
        case MULTIMEDIA_TYPE.IMAGE:
            return withHoverEffect ? (
                <MultimediaHoverCardImage url={url} />
            ) : (
                <MultimediaCardImage url={url}  />
            )

        case MULTIMEDIA_TYPE.VIDEO:
            return (
                <MultimediaCardVideo url={url} />
            )
    }


    return (
        <span>
            There is no support for that type of multimedia :(
        </span>
    )
}