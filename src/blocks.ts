import fs from 'fs';
import { MyBuf } from './mybuf';


export class Option {
    type: number;
    length: number;
    value: Buffer;

    constructor() {
        this.type = 0;
        this.length = 0;
        this.value = new Buffer("", 'utf8');
    }
}


export class InterfaceDescriptionBlock {
    private linkType: number;
    private snapLen: number;
    private options: Array<Option>;
}

export class SimplePacketBlock {
    private originalPacketLength: number;
    private packetData: Buffer;

}

export class SectionHeaderBlock {
    bigEndian: boolean;
    version: string;
    options: Array<Option>;

}


export class PcapNG {
    private blocks: Array<SectionHeaderBlock>;
    private inBuffer: MyBuf;

    constructor(file: string) {
        this.blocks = new Array<SectionHeaderBlock>();
        this.inBuffer = new MyBuf(fs.readFileSync(file));
    }

    public parse() {
        while (this.inBuffer.hasMore()) {

        }
    }

    public getBlocks(): Array<SectionHeaderBlock> {
        return this.blocks;
    }


    private test() {
        const buf = new Buffer("", 'utf-8');
    }

    private parseOptions(): Array<Option> {
        
    }

    private parseSectionHeaderBlock(): SectionHeaderBlock {
        let shb: SectionHeaderBlock = new SectionHeaderBlock();
        
        const blockType = this.inBuffer.readBytes(4);
        if (!Buffer.compare(blockType, Buffer.from("\r\n\r\n"))) {
            throw new Error("Section header block is expected");
        }
        if (this.inBuffer.available() < 8) {
            throw new Error("Section header block is too short");
        }

        this.inBuffer.seekTo(8);
        const byteOrderMagicBuf = this.inBuffer.readBytes(4);
        shb.bigEndian = Buffer.compare(byteOrderMagicBuf, Buffer.from([0x1A, 0x2B, 0x3C, 0x4D])) === 0;
        this.inBuffer.setEndian(shb.bigEndian);

        this.inBuffer.seekTo(4);
        const totalLen = this.inBuffer.readUint32();
        this.inBuffer.seekTo(12);

        shb.version = String(this.inBuffer.readUint16()) + "." + String(this.inBuffer.readUint16());
        if (shb.version !== "1.0") {
            throw new Error("Unsupported version: " + shb.version);
        }
        const sectionLen = this.inBuffer.readInt64();
        if (sectionLen === -1) {
            // TODO:
        }


        return shb;
    }
}