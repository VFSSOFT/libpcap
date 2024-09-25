import path from 'path';
import { EnhancedPacketBlock, InterfaceDescriptionBlock, InterfaceStatisticsBlock, PcapNG, SectionHeaderBlock, SimplePacketBlock } from '../blocks';

function getTestFile(name: string): string {
    return path.join(__dirname, '__fixtures__', name);
}

describe("PcapNG parsing", () => {
    test("Test1", () => {
        const filePath = getTestFile('test1.pcapng');
        let parser = new PcapNG(filePath);
        parser.parse();

        const blocks = parser.getBlocks();
        expect(blocks.length).toBe(5);
        expect(blocks[0] instanceof SectionHeaderBlock).toBeTruthy();
        expect(blocks[1] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[2] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[3] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[4] instanceof InterfaceStatisticsBlock).toBeTruthy();
    });

    test("Test001", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test001.pcapng');
        let parser = new PcapNG(filePath);
        parser.parse();

        const blocks = parser.getBlocks();
        expect(blocks.length).toBe(6);
        expect(blocks[0] instanceof SectionHeaderBlock).toBeTruthy();
        expect(blocks[1] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[2] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[3] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[4] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[5] instanceof EnhancedPacketBlock).toBeTruthy();
    });

    test("Test002", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test002.pcapng');
        let parser = new PcapNG(filePath);
        parser.parse();

        const blocks = parser.getBlocks();
        expect(blocks.length).toBe(1);
        expect(blocks[0] instanceof SectionHeaderBlock).toBeTruthy();
    });

    test("Test003", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test003.pcapng');
        let parser = new PcapNG(filePath);
        parser.parse();

        const blocks = parser.getBlocks();
        expect(blocks.length).toBe(2);
        expect(blocks[0] instanceof SectionHeaderBlock).toBeTruthy();
        expect(blocks[1] instanceof InterfaceDescriptionBlock).toBeTruthy();
    });

    test("Test004", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test004.pcapng');
        let parser = new PcapNG(filePath);
        parser.parse();

        const blocks = parser.getBlocks();
        expect(blocks.length).toBe(7);
        expect(blocks[0] instanceof SectionHeaderBlock).toBeTruthy();
        expect(blocks[1] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[2] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[3] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[4] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[5] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[6] instanceof EnhancedPacketBlock).toBeTruthy();
    });

    test("Test005", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test005.pcapng');
        let parser = new PcapNG(filePath);
        parser.parse();

        const blocks = parser.getBlocks();
        expect(blocks.length).toBe(7);
        expect(blocks[0] instanceof SectionHeaderBlock).toBeTruthy();
        expect(blocks[1] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[2] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[3] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[4] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[5] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[6] instanceof EnhancedPacketBlock).toBeTruthy();
    });

    test("Test006", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test006.pcapng');
        let parser = new PcapNG(filePath);
        parser.parse();

        const blocks = parser.getBlocks();
        expect(blocks.length).toBe(8);
        expect(blocks[0] instanceof SectionHeaderBlock).toBeTruthy();
        expect(blocks[1] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[2] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[3] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[4] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[5] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[6] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[7] instanceof EnhancedPacketBlock).toBeTruthy();
    });

    test("Test007", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test007.pcapng');
        let parser = new PcapNG(filePath);
        parser.parse();

        const blocks = parser.getBlocks();
        expect(blocks.length).toBe(3);
        expect(blocks[0] instanceof SectionHeaderBlock).toBeTruthy();
        expect(blocks[1] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[2] instanceof EnhancedPacketBlock).toBeTruthy();
    });

    test("Test008", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test008.pcapng');
        let parser = new PcapNG(filePath);
        parser.parse();

        const blocks = parser.getBlocks();
        expect(blocks.length).toBe(7);
        expect(blocks[0] instanceof SectionHeaderBlock).toBeTruthy();
        expect(blocks[1] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[2] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[3] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[4] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[5] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[6] instanceof EnhancedPacketBlock).toBeTruthy();
    });


    test("Test009", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test009.pcapng');
        let parser = new PcapNG(filePath);
        parser.parse();

        const blocks = parser.getBlocks();
        expect(blocks.length).toBe(4);
        expect(blocks[0] instanceof SectionHeaderBlock).toBeTruthy();
        expect(blocks[1] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[2] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[3] instanceof EnhancedPacketBlock).toBeTruthy();
    });

    test("Test010", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test010.pcapng');
        let parser = new PcapNG(filePath);
        parser.parse();

        const blocks = parser.getBlocks();
        expect(blocks.length).toBe(6);
        expect(blocks[0] instanceof SectionHeaderBlock).toBeTruthy();
        expect(blocks[1] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[2] instanceof SimplePacketBlock).toBeTruthy();
        expect(blocks[3] instanceof SimplePacketBlock).toBeTruthy();
        expect(blocks[4] instanceof SimplePacketBlock).toBeTruthy();
        expect(blocks[5] instanceof SimplePacketBlock).toBeTruthy();
    });
});