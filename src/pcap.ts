import { EnhancedPacketBlock, GeneralBlock, InterfaceDescriptionBlock, InterfaceStatisticsBlock, NameResolutionBlock, PcapNG, SectionHeaderBlock, SimplePacketBlock } from "./blocks";


export enum Protocol {

}

export class PacketAddrs {
    source: string;
    srcPort: number;
    destination: string;
    destPort: number;

    constructor() {
        this.source = "";
        this.srcPort = 0;
        this.destination = "";
        this.destPort = 0;
    }
}

export class Packet {
    static defaultAddr = new PacketAddrs();

    timestamp: number;
    originalLength: number;
    data: Buffer;

    constructor() {
        this.timestamp = 0;
        this.originalLength = 0;
        this.data = Buffer.alloc(0);
    }
}

// Logical Blocks container
export class Section {
    blocks: Array<GeneralBlock>; // All basic blocks belong to this section.
    packets: Array<Packet>;

    constructor() {
        this.blocks = new Array<GeneralBlock>();
        this.packets = new Array<Packet>();
    }
}

export class Pcap {
    private blocks: Array<GeneralBlock>;
    private packets: Array<Packet>;

    constructor() {
        this.blocks = new Array<GeneralBlock>();
        this.packets = new Array<Packet>();
    }

    public parse(file: string): Array<Packet> {
        this.blocks = this.parseBlocks(file);
        const sections = this.buildSections(this.blocks);
        //this.parsePackets();
        return this.packets;
    }

    private parseBlocks(file: string): Array<GeneralBlock> {
        const parser = new PcapNG(file);
        parser.parse();
        return parser.getBlocks();
    }

    private splitBlocksToSections(blocks: Array<GeneralBlock>): Array<Section> {
        let sections = new Array<Section>();
        let curSection = new Section();

        for (const b of blocks) {
            if (b instanceof SectionHeaderBlock) {
                curSection = new Section();
                sections.push(curSection);
            }

            curSection.blocks.push(b);
        }

        return sections;
    }
    private analyseEnhancedPacketBlock(sec: Section, epb: EnhancedPacketBlock): Packet {
        let pkt = new Packet();
        pkt.originalLength = epb.originalPktLen;
        pkt.data = epb.body.readBytes(epb.body.available());
        return pkt;
    }
    private analyseSimplePacketBlock(sec: Section, spb: SimplePacketBlock): Packet {
        let pkt = new Packet();
        pkt.data = spb.body.readBytes(spb.body.available());
        return pkt;
    }
    private analyseSection(sec: Section) {
        // TODO: InterfaceDecriptionBlocks

        for (let i = 0; i < sec.blocks.length; i++) {
            const b = sec.blocks[i];
            if (b instanceof EnhancedPacketBlock) {
                let pkt = this.analyseEnhancedPacketBlock(sec, b as EnhancedPacketBlock);
                sec.packets.push(pkt);
            } else if (b instanceof SimplePacketBlock) {
                let pkt = this.analyseSimplePacketBlock(sec, b as SimplePacketBlock);
                sec.packets.push(pkt);
            } else {
                // nothing
            }
        }
    }
    private buildSections(blocks: Array<GeneralBlock>): Array<Section> {
        let sections = this.splitBlocksToSections(blocks);
        for (let i = 0; i < sections.length; i++) {
            this.analyseSection(sections[i]);
        }
        return sections;
    }
}