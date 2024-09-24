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

class GeneralBlock {
    type: Buffer; // 4 bytes
    totalLength: number;
    body: MyBuf;

    constructor() {
        this.type = new Buffer("");
        this.totalLength = 0;
        this.body = new MyBuf(new Buffer(""));
    }
}

export class InterfaceDescriptionBlock {
    private linkType: number;
    private snapLen: number;
    private options: Array<Option>;

    constructor() {
        this.linkType = 0;
        this.snapLen = 0;
        this.options = new Array<Option>();
    }
}

export class SimplePacketBlock {
    private originalPacketLength: number;
    private packetData: Buffer;

    constructor() {
        this.originalPacketLength = 0;
        this.packetData = new Buffer("");
    }
}

export class SectionHeaderBlock {
    bigEndian: boolean;
    version: string;
    options: Array<Option>;

    constructor() {
        this.bigEndian = true;
        this.version = "";
        this.options = new Array<Option>();
    }
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
            let sectionHeaderBlock = this.parseSectionHeaderBlock();
            this.blocks.push(sectionHeaderBlock);
        }
    }

    public getBlocks(): Array<SectionHeaderBlock> {
        return this.blocks;
    }

    private paddedTo32Bit(val: number): number {
        return Math.floor((val + 3) / 4) * 4;
    }

    private parseOptions(buf: MyBuf): Array<Option> {
        const opt_endofopt = 0;
        let options = new Array<Option>();

        while (buf.hasMore()) {
            let opt = new Option();
            opt.type = buf.readUint16();
            opt.length = buf.readUint16();
            opt.value = buf.readBytes(opt.length);

            let paddignLen = this.paddedTo32Bit(opt.length) - opt.length;
            buf.skip(paddignLen);

            if (opt.type === opt_endofopt) {
                break;
            }

            options.push(opt);
        }

        return options;
    }

    private parseBlock(): GeneralBlock {
        let block = new GeneralBlock();
        
        block.type = this.inBuffer.readBytes(4);
        block.totalLength = this.inBuffer.readUint32();
        let body = this.inBuffer.readBytes(block.totalLength - 12);
        block.body = new MyBuf(body);
        block.body.setEndian(this.inBuffer.getEndian());

        const trailingTotalLen = this.inBuffer.readUint32();
        if (trailingTotalLen !== block.totalLength) {
            throw new Error("Invalid trailing Total Block Length");
        }

        return block;
    }

    private parseEndianFromNextSHB() {
        let pos = this.inBuffer.getOffset();
        this.inBuffer.seekTo(pos + 8);

        const byteOrderMagicBuf = this.inBuffer.readBytes(4);
        let bigEndian = Buffer.compare(byteOrderMagicBuf, Buffer.from([0x1A, 0x2B, 0x3C, 0x4D])) === 0;
        this.inBuffer.setEndian(bigEndian);

        this.inBuffer.seekTo(pos);
    }

    private parseSectionHeaderBlock(): SectionHeaderBlock {
        this.parseEndianFromNextSHB();
        
        let block = this.parseBlock();
        if (!Buffer.compare(block.type, Buffer.from("\r\n\r\n"))) {
            throw new Error("Section header block is expected");
        }

        let shb: SectionHeaderBlock = new SectionHeaderBlock();
        shb.bigEndian = this.inBuffer.getEndian();
        
        block.body.skip(4); // Byte-Order Magic

        shb.version = String(block.body.readUint16()) + "." + String(block.body.readUint16());
        if (shb.version !== "1.0") {
            throw new Error("Unsupported version: " + shb.version);
        }
        const sectionLen = block.body.readInt64(); // sectionLen == -1 or > 0

        shb.options = this.parseOptions(block.body);

        

        return shb;
    }
}