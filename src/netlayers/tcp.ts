import { MyBuf } from "../mybuf";
import { TransLayer } from "./netlayer";


export class TCP extends TransLayer {
    srcPort: number;
    dstPort: number;
    //seqNumber: number;
    //ackNumber: number;
    //doffset: number;
    flags: number;
    //window_: number;
    // checksum, urgent pointer

    payload: Buffer;

    constructor() {
        super("TCP");
        this.srcPort = 0;
        this.dstPort = 0;
        //this.seqNumber = 0;
        //this.ackNumber = 0;
        //this.doffset = 0;
        //this.window_ = 0;
        this.flags = 0;
        this.payload = Buffer.alloc(0);
    }

    public parse(data: Buffer) {
        let buf = new MyBuf(data);

        this.srcPort = buf.readUint16();
        this.dstPort = buf.readUint16();
        /*this.seqNumber =*/ buf.readUint32();
        /*this.ackNumber =*/ buf.readUint32();
        /*this.doffset =*/ buf.readUint8() >> 4;
        this.flags = buf.readUint8();
        /*this.window_ = */buf.readUint16();

        // skip checksum and Urgent Pointer
        buf.readBytes(4);

        this.payload = buf.readBytes(buf.available());
    }


    public isTCP(): boolean {
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