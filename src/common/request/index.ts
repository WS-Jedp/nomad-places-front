import { ReponseDTO } from "../response"

export class Request {
    private SERVER_BASE_URL = "http://localhost:3000/"
    protected baseUrl: string = this.SERVER_BASE_URL
    protected domain: string
    protected auth: boolean = false
    protected token: string = ''

    public constructor(properteis: { domain: string, baseUrl?: string }) {
        this.domain = properteis.domain
        if(properteis.baseUrl) {
            this.baseUrl = properteis.baseUrl
        }
    }

    async get<Content>(endpoint?: string, headers?: HeadersInit, baseURL?: string): Promise<Content> {
        const defaultHeaders = this.getDefaultHeaders()

        if(this.auth) {
            defaultHeaders.Authorization = `Bearer ${this.token}`
        }

        const data = await fetch(`${baseURL ? baseURL : this.baseUrl}${this.domain}/${endpoint ? endpoint : ''}`, { 
            method: 'get',
            headers: {
                ...defaultHeaders,
                ...headers
            }
         })
        const resp = await data.json() as ReponseDTO<Content>
        if(resp.error) {
            throw new Error(resp.error)
        }
        return resp.content
    }

    async post<Content>(endpoint: string, body?: { [key:string]: any }, headers?: HeadersInit, baseURL?: string): Promise<Content> {
        const defaultHeaders = this.getDefaultHeaders()

        if(this.auth) {
            defaultHeaders.Authorization = `Bearer ${this.token}`
        }

        const data = await fetch(`${baseURL ? baseURL : this.baseUrl}${this.domain}/${endpoint}`, { 
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                ...defaultHeaders,
                ...headers
            }
         })
        const resp = await data.json() as ReponseDTO<Content>
        if(resp.error) {
            throw new Error(resp.error)
        }
        return resp.content
    }

    private getDefaultHeaders() {
        const defaultHeaders: HeadersInit = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        return defaultHeaders
    }

    private getBodyFromObject(body: { [key:string]: any }) {
        const formDataBody = new FormData();
        for(const key in body) {
            formDataBody.append(key, body[key])
        }
        return formDataBody
    }

    public withAuth(token: string) {
        this.auth = true
        this.token = token
        return this
    }

    public disableAuth() {
        this.auth = false
        this.token = ''
        return this
    }
}