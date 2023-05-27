import { Request } from "../../common/request";
import { LoginDTO } from "../../dto/auth";

export class UserServices {
    protected request: Request;

    constructor(domain?: string) {
        this.request = new Request({
            domain: domain ? domain : "user",
        });
    }
}