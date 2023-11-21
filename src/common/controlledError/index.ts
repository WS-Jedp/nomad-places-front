import { ControlledErrorType } from "./types"

export class ControlledError {
    
    private _message: string
    private _type: ControlledErrorType
    private _code: number | undefined 

    constructor(message: string, type: ControlledErrorType, code?: number) {
        this._message = message
        this._type = type

        if(code) this._code = code
    }

    get message(): string {
        return this._message
    }

    get type(): string {
        return this._type
    }

    get code(): number | undefined {
        return this._code
    }
}