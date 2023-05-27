export type ReponseDTO<Content> = {
    content: Content
    status: number
    error?: string
}