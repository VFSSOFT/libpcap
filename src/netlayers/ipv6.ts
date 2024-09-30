import { MyBuf } from "../mybuf";
import { IPLayer } from "./netlayer";

export class IPv6 extends IPLayer {
    //version: number;
    //trafficClass: number;
    //flowLabel: number;
    payloadLen: number;
    nextHeader: number;
    //hopLimit: number;
    srcAddr: Buffer;
    dstAddr: Buffer;

    payload: Buffer;

    constructor() {
        super("IPv6");
        //this.version = 0;
        //this.trafficClass = 0;
        //this.flowLabel = 0;
        this.payloadLen = 0;
        this.nextHeader = 0;
        //this.hopLimit = 0;
        this.srcAddr = Buffer.alloc(0);
        this.dstAddr = Buffer.alloc(0);
        this.payload = Buffer.alloc(0);
    }

    public parse(data: Buffer) {
        let buf = new MyBuf(data);

        let b = buf.readUint32();
        //this.version = (b & 0xF0000000) >> 28;
        //this.trafficClass = (b & 0x0FF00000) >> 24;
        //this.flowLabel = (b & 0x000FFFFF);

        this.payloadLen = buf.readUint16();
        this.nextHeader = buf.readUint8();
        /*this.hopLimit =*/ buf.readUint8();

        this.srcAddr = buf.readBytes(16);
        this.dstAddr = buf.readBytes(16);

        this.payload = buf.readBytes(this.payloadLen);
    }

    public getIPVersion(): number {
        return 6;
    }
    public getSrcAddr(): Buffer {
        return this.srcAddr;
    }
    public getDstAddr(): Buffer {
        return this.dstAddr;
    }
    public getPayload(): Buffer {
        return this.payload;
    }
    public isTcpPayload(): boolean {
        return this.nextHeader === 6;
    }
    public isUdpPayload(): boolean {
        return this.nextHeader === 17;
    }
}