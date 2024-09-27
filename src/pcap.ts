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

export class NetInterface {
    private idb: InterfaceDescriptionBlock;
    
    name: string
    linkType: number;
    snapLen: number;

    constructor(idb: InterfaceDescriptionBlock) {
        this.idb = idb;
        this.name = idb.name;
        this.linkType = idb.linkType;
        this.snapLen = idb.snapLen;
    }
}

export class Packet {
    netInterface: NetInterface;
    timestamp: number;
    originalLength: number;
    data: Buffer;

    constructor(interf: NetInterface) {
        this.netInterface = interf;
        this.timestamp = 0;
        this.originalLength = 0;
        this.data = Buffer.alloc(0);
    }
}

// Logical Blocks container
export class Section {
    blocks: Array<GeneralBlock>; // All basic blocks belong to this section.
    interfaces: Array<NetInterface>;
    packets: Array<Packet>;

    constructor() {
        this.blocks = new Array<GeneralBlock>();
        this.interfaces = new Array<NetInterface>();
        this.packets = new Array<Packet>();
    }
}

export class Pcap {
    private blocks: Array<GeneralBlock>;
    private sections: Array<Section>;

    constructor() {
        this.blocks = new Array<GeneralBlock>();
        this.sections = new Array<Section>();
    }

    public parse(file: string): Array<Section> {
        this.blocks = this.parseBlocks(file);
        this.sections = this.buildSections(this.blocks);
        return this.sections;
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
    private analyseInterfaceDescriptionBlock(sec: Section, idb: InterfaceDescriptionBlock): NetInterface {
        return new NetInterface(idb);
    }
    private analyseEnhancedPacketBlock(sec: Section, epb: EnhancedPacketBlock): Packet {
        const netif = sec.interfaces[epb.interfaceID];
        let pkt = new Packet(netif);
        pkt.originalLength = epb.originalPktLen;
        pkt.data = epb.pktData;
        return pkt;
    }
    private analyseSimplePacketBlock(sec: Section, spb: SimplePacketBlock): Packet {
        const netif = sec.interfaces[0];
        let pkt = new Packet(netif);
        pkt.originalLength = spb.pktData.length;
        pkt.data = spb.pktData;
        return pkt;
    }
    private analyseSection(sec: Section) {
        for (let i = 0; i < sec.blocks.length; i++) {
            const b = sec.blocks[i];
            if (b instanceof InterfaceDescriptionBlock) {
                let netif = this.analyseInterfaceDescriptionBlock(sec, b as InterfaceDescriptionBlock);
                sec.interfaces.push(netif);
            } else if (b instanceof EnhancedPacketBlock) {
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