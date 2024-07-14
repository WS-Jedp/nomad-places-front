import { ReponseDTO } from "../response";

export class Request {
  private SERVER_BASE_URL = "http://localhost:3000/";
  protected baseUrl: string = this.SERVER_BASE_URL;
  protected domain: string;
  protected auth: boolean = false;
  protected token: string = "";

  public constructor(properteis: { domain: string; baseUrl?: string }) {
    this.domain = properteis.domain;
    if (properteis.baseUrl) {
      this.baseUrl = properteis.baseUrl;
    }
  }

  async get<Content>(
    endpoint?: string,
    headers?: HeadersInit,
    baseURL?: string
  ): Promise<Content> {
    const defaultHeaders = this.getDefaultHeaders();

    if (this.auth) {
      defaultHeaders.Authorization = `Bearer ${this.token}`;
    }

    const data = await fetch(
      `${baseURL ? baseURL : this.baseUrl}${this.domain}/${
        endpoint ? endpoint : ""
      }`,
      {
        method: "get",
        headers: {
          ...defaultHeaders,
          ...headers,
        },
      }
    );
    const resp = (await data.json()) as ReponseDTO<Content>;

    if (
      data.status === 401 ||
      data.status === 403 ||
      data.status === 404 ||
      data.status === 500 ||
      data.status === 502 ||
      data.status === 503 ||
      data.status === 400
    ) {
      const errorResp = await data.json();
      throw new Error(errorResp.message);
    }

    if (resp.error || !resp.content) throw new Error(resp.error);
    return resp.content;
  }

  async post<Content>(
    endpoint: string,
    body?: { [key: string]: any },
    headers?: HeadersInit,
    baseURL?: string
  ): Promise<Content> {
    const defaultHeaders = this.getDefaultHeaders();

    if (this.auth) {
      defaultHeaders.Authorization = `Bearer ${this.token}`;
    }

    const data = await fetch(
      `${baseURL ? baseURL : this.baseUrl}${this.domain}/${endpoint}`,
      {
        method: "post",
        body: JSON.stringify(body),
        headers: {
          ...defaultHeaders,
          ...headers,
        },
      }
    );

    if (
      data.status === 401 ||
      data.status === 403 ||
      data.status === 404 ||
      data.status === 500 ||
      data.status === 502 ||
      data.status === 503 ||
      data.status === 400
    ) {
      const errorResp = await data.json();
      throw new Error(errorResp.message);
    }
    const resp = (await data.json()) as ReponseDTO<Content>;

    if (resp.error || !resp.content) throw new Error(resp.error);

    return resp.content;
  }

  public postWithMultiPart<Content>(
    endpoint: string,
    body: { [key: string]: any },
    headers?: HeadersInit,
    baseURL?: string
  ): Promise<Content> {
    const defaultHeaders = this.getDefaultHeaders();
    delete defaultHeaders["Content-Type"];

    if (this.auth) {
      defaultHeaders.Authorization = `Bearer ${this.token}`;
    }

    const data = fetch(
      `${baseURL ? baseURL : this.baseUrl}${this.domain}/${endpoint}`,
      {
        method: "post",
        body: this.getBodyFromObject(body),
        headers: {
          ...defaultHeaders,
          ...headers,
        },
      }
    );

    return data.then(async (res) => {
      if (
        res.status === 401 ||
        res.status === 403 ||
        res.status === 404 ||
        res.status === 500 ||
        res.status === 502 ||
        res.status === 503 ||
        res.status === 400
      ) {
        const errorResp = await res.json();
        throw new Error(errorResp.message);
      }
      const resp = (await res.json()) as ReponseDTO<Content>;

      if (resp.error || !resp.content) throw new Error(resp.error);

      return resp.content;
    });
  }

  public postWithMultiPartMultipleFiles<Content>(
    endpoint: string,
    body: { [key: string]: any },
    headers?: HeadersInit,
    baseURL?: string
  ): Promise<Content> {
    const defaultHeaders = this.getDefaultHeaders();
    delete defaultHeaders["Content-Type"];

    if (this.auth) {
      defaultHeaders.Authorization = `Bearer ${this.token}`;
    }

    const { files, ...rest } = body;

    const formData = this.getBodyFromObject(rest);

    if (files && files.length > 0) {
      Array.from(files).forEach((file: any) => {
        formData.append("files", file);
      });
    }

    const data = fetch(
      `${baseURL ? baseURL : this.baseUrl}${this.domain}/${endpoint}`,
      {
        method: "post",
        body: formData,
        headers: {
          ...defaultHeaders,
          ...headers,
        },
      }
    );

    return data.then(async (res) => {
      if (
        res.status === 401 ||
        res.status === 403 ||
        res.status === 404 ||
        res.status === 500 ||
        res.status === 502 ||
        res.status === 503 ||
        res.status === 400
      ) {
        const errorResp = await res.json();
        throw new Error(errorResp.message);
      }
      const resp = (await res.json()) as ReponseDTO<Content>;

      if (resp.error || !resp.content) throw new Error(resp.error);

      return resp.content;
    });
  }

  private getDefaultHeaders() {
    const defaultHeaders: HeadersInit = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    return defaultHeaders;
  }

  private getBodyFromObject(body: { [key: string]: any }) {
    const formDataBody = new FormData();
    for (const key in body) {
      formDataBody.append(key, body[key]);
    }
    return formDataBody;
  }

  public withAuth(token: string) {
    this.auth = true;
    this.token = token;
    return this;
  }

  public disableAuth() {
    this.auth = false;
    this.token = "";
    return this;
  }
}
