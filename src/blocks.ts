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

export class GeneralBlock {
    type: Buffer; // 4 bytes
    totalLength: number;
    body: MyBuf;

    constructor() {
        this.type = new Buffer("");
        this.totalLength = 0;
        this.body = new MyBuf(new Buffer(""));
    }

    public copyGeneralBlockInfo(b: GeneralBlock) {
        this.type = b.type;
        this.totalLength = b.totalLength;
        this.body = b.body;
    }
}

export class InterfaceDescriptionBlock extends GeneralBlock {
    linkType: number;
    snapLen: number;
    options: Array<Option>;

    constructor() {
        super();
        this.linkType = 0;
        this.snapLen = 0;
        this.options = new Array<Option>();
    }
}

export class InterfaceStatisticsBlock extends GeneralBlock {
    interfaceID: number;
    timestampUp: number;
    timestampLo: number;
    options: Array<Option>

    constructor() {
        super();
        this.interfaceID = 0;
        this.timestampUp = 0;
        this.timestampLo = 0;
        this.options = new Array<Option>();
    }
}

export class EnhancedPacketBlock extends GeneralBlock {
    interfaceID: number;
    timestampUp: number;
    timestampLo: number;
    capturedPktLen: number;
    originalPktLen: number;
    pktData: Buffer;
    options: Array<Option>;

    constructor() {
        super();
        this.interfaceID = 0;
        this.timestampUp = 0;
        this.timestampLo = 0;
        this.capturedPktLen = 0;
        this.originalPktLen = 0;
        this.pktData = new Buffer("");
        this.options = new Array<Option>();
    }

}

export class SimplePacketBlock extends GeneralBlock {
    originalPktLen: number;
    pktData: Buffer;

    constructor() {
        super();
        this.originalPktLen = 0;
        this.pktData = new Buffer("");
    }
}

export class SectionHeaderBlock extends GeneralBlock {
    bigEndian: boolean;
    version: string;
    options: Array<Option>;
    sectionLength: number;

    constructor() {
        super();
        this.bigEndian = true;
        this.version = "";
        this.options = new Array<Option>();
        this.sectionLength = -1;
    }
}


export class PcapNG {
    private blocks: Array<GeneralBlock>;
    private inBuffer: MyBuf;

    constructor(file: string) {
        this.blocks = new Array<SectionHeaderBlock>();
        this.inBuffer = new MyBuf(fs.readFileSync(file));
    }

    public parse() {
        while (this.inBuffer.hasMore()) {
            const block = this.parseBlock();
            this.blocks.push(block);
        }
    }

    public getBlocks(): Array<GeneralBlock> {
        return this.blocks;
    }

    private paddedTo32Bit(val: number): number {
        return Math.floor((val + 3) / 4) * 4;
    }
    private bytesToInt(bytes: Buffer, bigEndian: boolean): number {
        if (bigEndian) {
            return bytes.readInt32BE();
        } else {
            return bytes.readInt32LE();
        }
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

    private curSHB(): SectionHeaderBlock|null {
        for (let i = this.blocks.length - 1; i >= 0; i--) {
            if (this.blocks[i] instanceof SectionHeaderBlock) {
                return this.blocks[i] as SectionHeaderBlock;
            }
        }
        return null;
    }

    private curIDB() : InterfaceDescriptionBlock|null {
        for (let i = this.blocks.length - 1; i >= 0; i--) {
            if (this.blocks[i] instanceof InterfaceDescriptionBlock) {
                return this.blocks[i] as InterfaceDescriptionBlock;
            }
        }
        return null;
    }

    private parseBlock(): GeneralBlock {
        const shb = this.curSHB();

        let block = new GeneralBlock();
        
        block.type = this.inBuffer.readBytes(4);
        if (Buffer.compare(block.type, Buffer.from("\n\r\r\n")) === 0) {
            this.processEndian();
        } else {
            if (shb == null) {
                throw new Error("Section Header Block is expected");
            }
        }

        block.totalLength = this.inBuffer.readUint32();
        let body = this.inBuffer.readBytes(block.totalLength - 12);
        block.body = new MyBuf(body);
        block.body.setEndian(this.inBuffer.getEndian());

        const trailingTotalLen = this.inBuffer.readUint32();
        if (trailingTotalLen !== block.totalLength) {
            throw new Error("Invalid trailing Total Block Length");
        }

        if (Buffer.compare(block.type, Buffer.from("\n\r\r\n")) === 0) {
            return this.parseSectionHeaderBlock(block);
        } else {
            const blockType = this.bytesToInt(block.type, shb!.bigEndian);
            if (blockType === 1) {
                return this.parseInterfaceDescriptionBlock(block);
            } else if (blockType === 3) {
                return this.parseSimplePacketBlock(block);
            } else if (blockType === 5) {
                return this.parseInterfaceStatisticsBlock(block);
            } else if (blockType === 6) {
                return this.parseEnhancedPacketBlock(block);
            } else {
                throw new Error("unsupported block type");
            }
        }

        return block;
    }

    private processEndian() {
        let pos = this.inBuffer.getOffset();
        this.inBuffer.seekTo(pos + 4);

        const byteOrderMagicBuf = this.inBuffer.readBytes(4);
        let bigEndian = Buffer.compare(byteOrderMagicBuf, Buffer.from([0x1A, 0x2B, 0x3C, 0x4D])) === 0;
        this.inBuffer.setEndian(bigEndian);

        this.inBuffer.seekTo(pos);
    }

    private parseSectionHeaderBlock(block: GeneralBlock): SectionHeaderBlock {
        let shb: SectionHeaderBlock = new SectionHeaderBlock();
        shb.copyGeneralBlockInfo(block);
        shb.bigEndian = this.inBuffer.getEndian();
        
        block.body.skip(4); // Byte-Order Magic

        shb.version = String(block.body.readUint16()) + "." + String(block.body.readUint16());
        //if (shb.version !== "1.0") {
        //    throw new Error("Unsupported version: " + shb.version);
        //}
        shb.sectionLength = block.body.readInt64(); // sectionLen == -1 or > 0

        shb.options = this.parseOptions(block.body);

        if (block.body.hasMore()) {
            console.warn("more bytes are left unprocessed");
        }

        return shb;
    }

    private parseInterfaceDescriptionBlock(block: GeneralBlock) : InterfaceDescriptionBlock {
        let idb = new InterfaceDescriptionBlock();
        idb.copyGeneralBlockInfo(block);

        idb.linkType = block.body.readUint16();
        block.body.readBytes(2); // Reserved

        idb.snapLen = block.body.readUint32();

        idb.options = this.parseOptions(block.body);

        if (block.body.hasMore()) {
            console.warn("more bytes are left unprocessed");
        }

        return idb;
    }

    private parseEnhancedPacketBlock(block: GeneralBlock) : EnhancedPacketBlock {
        let epb = new EnhancedPacketBlock();
        epb.copyGeneralBlockInfo(block);

        epb.interfaceID = block.body.readUint32();

        epb.timestampUp = block.body.readUint32();
        epb.timestampLo = block.body.readUint32();

        epb.capturedPktLen = block.body.readUint32();
        epb.originalPktLen = block.body.readUint32();
        epb.pktData = block.body.readBytes(epb.capturedPktLen);

        let paddingLen = this.paddedTo32Bit(epb.capturedPktLen) - epb.capturedPktLen;
        block.body.readBytes(paddingLen);

        epb.options = this.parseOptions(block.body);

        if (block.body.hasMore()) {
            console.warn("more bytes are left unprocessed");
        }

        return epb;
    }

    private parseSimplePacketBlock(block: GeneralBlock) : SimplePacketBlock {
        let spb = new SimplePacketBlock();
        spb.copyGeneralBlockInfo(block);

        spb.originalPktLen = block.body.readUint32();

        const idb = this.curIDB();
        if (idb == null) {
            throw new Error("InterfaceDescriptionBlock is expected");
        }

        let pktDataLen = 0;
        if (idb.snapLen > spb.originalPktLen) {
            pktDataLen = spb.originalPktLen;
        } else {
            pktDataLen = idb.snapLen;
        }
        spb.pktData = block.body.readBytes(pktDataLen);
        
        block.body.readBytes(block.body.available()); // left padding

        if (block.body.hasMore()) {
            console.warn("more bytes are left unprocessed");
        }

        return spb;
    }

    private parseInterfaceStatisticsBlock(block: GeneralBlock) : InterfaceStatisticsBlock {
        let isb = new InterfaceStatisticsBlock();
        isb.copyGeneralBlockInfo(block);

        isb.interfaceID = block.body.readUint32();

        isb.timestampUp = block.body.readUint32();
        isb.timestampLo = block.body.readUint32();

        isb.options = this.parseOptions(block.body);

        if (block.body.hasMore()) {
            console.warn("more bytes are left unprocessed");
        }

        return isb;
    }
}