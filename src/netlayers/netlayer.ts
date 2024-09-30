import { EthernetII } from "./ethernetii";

// base class for all net layer classes.
export class NetLayer {
    name: string

    constructor(name: string) {
        this.name = name;
    }
}

export class IPLayer extends NetLayer {

    constructor(name: string) {
        super(name);
    }

    // To be override 
    public getIPVersion(): number {
        return 4;
    }
    public getSrcAddr(): Buffer {
        return Buffer.alloc(0);
    }
    public getDstAddr(): Buffer {
        return Buffer.alloc(0);
    }
    public getPayload(): Buffer {
        return Buffer.alloc(0);
    }
    public isTcpPayload(): boolean {
        return false;
    }
    public isUdpPayload(): boolean {
        return false;
    }
}
