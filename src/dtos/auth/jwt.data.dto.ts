export class JwtDataDto {
    role: "allowed" | "forbiden";
    id: number;
    identity: string;
    exp: number; // unix timestamp
    ip: string;
    ua: string;

    toPlainObject() {
        return {
            role:     this.role,
            id:       this.id,
            identity: this.identity,
            exp:      this.exp,
            ip:       this.ip,
            ua:       this.ua
        }
    } // expected payload to be plain object
} 