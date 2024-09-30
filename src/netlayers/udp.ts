import { MyBuf } from "../mybuf";
import { NetLayer, TransLayer } from "./netlayer";



export class UDP extends TransLayer {
    srcPort: number;
    dstPort: number;
    //length: number;
    // checksum

    payload: Buffer;

    constructor() {
        super("UDP");
        this.srcPort = 0;
        this.dstPort = 0;
        //this.length = 0;
        this.payload = Buffer.alloc(0);
    }

    public parse(data: Buffer) {
        let buf = new MyBuf(data);

        this.srcPort = buf.readUint16();
        this.dstPort = buf.readUint16();
        /*this.length =*/ buf.readUint16();
        buf.readUint16(); // checksum

        this.payload = buf.readBytes(buf.available());
    }


    public isUDP(): boolean {
        return true;
    }
    public getSrcPort(): number {
        return this.srcPort;
    }
    public getDstPort(): number {
        return this.dstPort;
    }
    public getPayload(): Buffer {
        return this.payload;
    }

}