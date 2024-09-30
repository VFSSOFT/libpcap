
import { MyBuf } from "../mybuf";
import { NetLayer } from "./netlayer";

export class IPv4 extends NetLayer {
    version: number;
    ihl: number;
    dscp: number;
    ecn: number;
    totalLength: number;
    identification: number;
    flags: number;
    fragmentOffset: number;
    ttl: number;
    protocol: number;
    // header checksum
    srcAddr: Buffer;
    dstAddr: Buffer;

    payload: Buffer;

    constructor() {
        super("IPv4");
        this.version = 0;
        this.ihl = 0;
        this.dscp = 0;
        this.ecn = 0;
        this.totalLength = 0;
        this.identification = 0;
        this.flags = 0;
        this.fragmentOffset = 0;
        this.ttl = 0;
        this.protocol = 0;
        this.srcAddr = Buffer.alloc(0);
        this.dstAddr = Buffer.alloc(0);
        this.payload = Buffer.alloc(0);
    }

    public parse(data: Buffer) {
        let buf = new MyBuf(data);

        let b = buf.readUint8();
        this.version = (b & 0xF0) >> 4;
        this.ihl = b & 0x0F;

        if (this.ihl > 5) {
            throw new Error("IPv4 contains OPTIONS, not supported yet");
        }

        b = buf.readUint8();
        this.dscp = (b & 0xFC) >> 2;
        this.ecn = b & 0x03;

        this.totalLength = buf.readUint16();
        this.identification = buf.readUint16();

        let b2 = buf.readUint16();
        this.flags = (b2 & 0xE000) >> 13;
        this.fragmentOffset = b2 & 0x1FFF;

        this.ttl = buf.readUint8();
        this.protocol = buf.readUint8();

        buf.readUint16(); // header checksum

        this.srcAddr = buf.readBytes(4);
        this.dstAddr = buf.readBytes(4);

        this.payload = buf.readBytes(this.totalLength - 20);
    }

   
}