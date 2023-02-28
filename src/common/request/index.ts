import { ReponseDTO } from "../response"

export class Request {
    private SERVER_BASE_URL = "http://localhost:3000/"
    protected baseUrl: string = this.SERVER_BASE_URL
    protected domain: string

    public constructor(properteis: { domain: string, baseUrl?: string }) {
        this.domain = properteis.domain
        if(properteis.baseUrl) {
            this.baseUrl = properteis.baseUrl
        }
    }

    async get<Content>(endpoint?: string, headers?: HeadersInit, baseURL?: string): Promise<Content> {
        const defaultHeaders: HeadersInit = {}
        const data = await fetch(`${baseURL ? baseURL : this.baseUrl}${this.domain}/${endpoint ? endpoint : ''}`, { 
            method: 'get',
            headers: {
                ...defaultHeaders,
                ...headers
            }
         })
        const resp = await data.json() as ReponseDTO<Content>
        return resp.content
    }

    async post<Content>(endpoint: string, body: BodyInit, headers?: HeadersInit, baseURL?: string): Promise<Content> {
        const defaultHeaders: HeadersInit = {}
        const data = await fetch(`${baseURL ? baseURL : this.baseUrl}${this.domain}/${endpoint}`, { 
            method: 'post',
            body,
            headers: {
                ...defaultHeaders,
                ...headers
            }
         })
        const resp = await data.json() as ReponseDTO<Content>
        return resp.content
    }
}