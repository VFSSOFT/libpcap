import { MyBuf } from "../mybuf";
import { NetLayer } from "./netlayer";


export class EthernetII extends NetLayer {
    macSrc: Buffer; // 6
    macDst: Buffer; // 6
    typeLen: number; // 2
    payload: Buffer;
    //crc: Buffer; // 4

    constructor() {
        super("Ethernet II");
        this.macSrc = Buffer.alloc(0);
        this.macDst = Buffer.alloc(0);
        this.typeLen = 0;
        this.payload = Buffer.alloc(0);
        //this.crc = Buffer.alloc(0);
    }

    public parse(data: Buffer) {
        let buf = new MyBuf(data);
        this.macSrc = buf.readBytes(6);
        this.macDst = buf.readBytes(6);
        this.typeLen = buf.readUint16();
        
        //const payloadLen = buf.available() - 18;
        //this.payload = buf.readBytes(payloadLen);

        //this.crc = buf.readBytes(4);

        this.payload = buf.readBytes(buf.available());
    }

    public isTypeOrLength(): boolean {
        return this.typeLen > 1500;
    }
    public isIPv4(): boolean {
        return this.isTypeOrLength() && this.typeLen === 0x0800;
    }
    public isIPv6(): boolean {
        return this.isTypeOrLength() && this.typeLen === 0x86DD;
    }


}