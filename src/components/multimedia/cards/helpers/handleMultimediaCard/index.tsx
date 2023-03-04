import { MULTIMEDIA_TYPE } from '../../../../../models/multimedia';
import { MultimediaCardImage } from '../../image'
import { MultimediaCardVideo } from '../../video'

export const HandleMultimediaCard: React.FC<{ type: MULTIMEDIA_TYPE, url: string }> = ({ type, url }) => {

    switch (type) {
        case MULTIMEDIA_TYPE.IMAGE:
            return (
                <MultimediaCardImage url='https://picsum.photos/200/300'  />
            )

        case MULTIMEDIA_TYPE.VIDEO:
            return (
                <MultimediaCardVideo url='https://cdn-useast1.kapwing.com/final_640395566b49a600a6052360_909552.mp4?GoogleAccessId=prod-sa-videoprocessing%40kapwing-prod.iam.gserviceaccount.com&Expires=1677985249&Signature=M14LINGyWzSvC1LzEkl0y1E4au76uFY%2FOFQX7ouD3Ps3I2glfPbglDwHaEZaTmwv%2B1JU%2BtdRwTVH0Ip9V3MUINxpHOHKKUqMJsY232xZo3hSdvk%2Bs6MgXlPgMznAK%2FlvXRjoOuNjK1Ajwz7JHvFl%2FO%2FC7cXvi97VCKDFGsI9JeE3kO8gd%2FfWD8%2FsUlhiRqxkRG%2BEBZEduNG1wDhJjPVD2aKNmJAk%2FMtzSsaAtW35YqrOyPWgtgZyw2vIU6VjMeFiQavRHPo355J7uYiFSaqrfWSGrMIrHLsB5uQvGsooOU2Ogcp0nhFX3Kqji5boIvyzA%2BckBXT4WbIgytTzK0ourg%3D%3D' />
            )
    }


    return (
        <span>
            There is no support for that type of multimedia :(
        </span>
    )
}