import fs from 'fs';
import { MyBuf } from './mybuf';

// common
const OPT_END_OF_OPT      = 0;
const OPT_COMMENT         = 1;

const OPT_SHB_HARDWARE    = 2;
const OPT_SHB_OS          = 3;
const OPT_SHB_USERAPPL    = 4;

const OPT_IF_DESCRIPTION  = 3;
const OPT_IF_IPV4_ADDR    = 4;
const OPT_IF_IPV6_ADDR    = 5;
const OPT_IF_MAC_ADDR     = 6;
const OPT_IF_EUI_ADDR     = 7;
const OPT_IF_SPEED        = 8;
const OPT_IF_TS_RESOL     = 9;
const OPT_IF_TZONE        = 10;
const OPT_IF_FILTER       = 11;
const OPT_IF_OS           = 12;
const OPT_IF_FCSLEN       = 13;
const OPT_IF_TSOFFSET     = 14;
const OPT_IF_HARDWARE     = 15;
const OPT_IF_TXSPEED      = 16;
const OPT_IF_RXSPEED      = 17;
const OPT_IF_IANA_TZNAME  = 18;

const OPT_EPB_FLAGS       = 2;
const OPT_EPB_HASH        = 3;
const OPT_EPB_DROP_COUNT  = 4;
const OPT_EPB_PACKET_ID   = 5;
const OPT_EPB_QUEUE       = 6;
const OPT_EPB_VERDICT     = 7;
const OPT_EPB_PID_TID     = 8;

const OPT_NS_DNS_NAME     = 2;
const OPT_DNS_IP4_ADDR    = 3;
const OPT_DNS_IP6_ADDR    = 4;

const OPT_ISB_START_TIME    = 2;
const OPT_ISB_END_TIME      = 3;
const OPT_ISB_IF_RECV       = 4;
const OPT_ISB_IF_DROP       = 5;
const OPT_ISB_FILTER_ACCEPT = 6;
const OPT_ISB_OS_DROP       = 7;
const OPT_ISB_USR_DELIV     = 8;

export class Option {
    type: number;
    length: number;
    value: Buffer;

    constructor() {
        this.type = 0;
        this.length = 0;
        this.value = Buffer.alloc(0);
    }
}

export class GeneralBlock {
    startOffset: number; // start offset relative to the origin input file
    type: Buffer; // 4 bytes
    totalLength: number;
    body: MyBuf;

    comments: Array<string>; // parsed from options if available

    constructor() {
        this.startOffset = 0;
        this.type = Buffer.alloc(0);
        this.totalLength = 0;
        this.body = new MyBuf(Buffer.alloc(0));
        this.comments = new Array<string>();
    }

    public copyGeneralBlockInfo(b: GeneralBlock) {
        this.type = b.type;
        this.totalLength = b.totalLength;
        this.body = b.body;
        this.comments = b.comments;
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
        this.pktData = Buffer.alloc(0);
        this.options = new Array<Option>();
    }

}

export class SimplePacketBlock extends GeneralBlock {
    originalPktLen: number;
    pktData: Buffer;

    constructor() {
        super();
        this.originalPktLen = 0;
        this.pktData = Buffer.alloc(0);
    }
}

export class NameResolutionRecord {
    type: number;
    length: number;
    value: Buffer;

    constructor() {
        this.type = 0;
        this.length = 0;
        this.value = Buffer.alloc(0);
    }
}

export class NameResolutionBlock extends GeneralBlock {
    records: Array<NameResolutionRecord>;
    options: Array<Option>;

    constructor() {
        super();
        this.records = new Array<NameResolutionRecord>();
        this.options = new Array<Option>();
    }
}

export class CustomBlock extends GeneralBlock {

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
        
        block.startOffset = this.inBuffer.getOffset();
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
            } else if (blockType === 4) {
                return this.parseNameResolutionBlock(block);
            } else if (blockType === 5) {
                return this.parseInterfaceStatisticsBlock(block);
            } else if (blockType === 6) {
                return this.parseEnhancedPacketBlock(block);
            } else if (blockType === 2989) {
                return this.parseCustomBlock(block);
            } else if (blockType === 1073744813) {
                return this.parseCustomBlock(block);
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
        shb.comments = this.parseComments(shb.options);

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
        idb.comments = this.parseComments(idb.options);

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
        epb.comments = this.parseComments(epb.options);

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

    private parseNameResolutionBlock(block: GeneralBlock) : NameResolutionBlock {
        let nrb = new NameResolutionBlock();
        nrb.copyGeneralBlockInfo(block);

        while (true) {
            const nrc = new NameResolutionRecord();
            nrc.type = block.body.readUint16();
            nrc.length = block.body.readUint16();
            nrc.value = block.body.readBytes(nrc.length);

            const paddingLen = this.paddedTo32Bit(nrc.length) - nrc.length;
            block.body.readBytes(paddingLen);

            if (nrc.type === 0) {
                // nrb_record_end
                break;
            }

            nrb.records.push(nrc);
        }
       
        nrb.options = this.parseOptions(block.body);
        nrb.comments = this.parseComments(nrb.options);

        if (block.body.hasMore()) {
            console.warn("more bytes are left unprocessed");
        }

        return nrb;
    }

    private parseInterfaceStatisticsBlock(block: GeneralBlock) : InterfaceStatisticsBlock {
        let isb = new InterfaceStatisticsBlock();
        isb.copyGeneralBlockInfo(block);

        isb.interfaceID = block.body.readUint32();

        isb.timestampUp = block.body.readUint32();
        isb.timestampLo = block.body.readUint32();

        isb.options = this.parseOptions(block.body);
        isb.comments = this.parseComments(isb.options);

        if (block.body.hasMore()) {
            console.warn("more bytes are left unprocessed");
        }

        return isb;
    }

    private parseCustomBlock(block: GeneralBlock) : CustomBlock {
        let cb = new CustomBlock();
        cb.copyGeneralBlockInfo(block);
        return cb;
    }




    private parseComments(opts: Array<Option>): Array<string> {
        let comments = new Array<string>();
        for (const opt of opts) {
            if (opt.type == OPT_COMMENT) {
                comments.push(opt.value.toString('utf-8'));
            }
        }
        return comments;
    }
}