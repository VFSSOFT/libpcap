import path from 'path';
import { CustomBlock, EnhancedPacketBlock, InterfaceDescriptionBlock, InterfaceStatisticsBlock, NameResolutionBlock, PcapNG, SectionHeaderBlock, SimplePacketBlock } from '../blocks';

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

    test("Test011", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test011.pcapng');
        let parser = new PcapNG(filePath);
        parser.parse();

        const blocks = parser.getBlocks();
        expect(blocks.length).toBe(6);
        expect(blocks[0] instanceof SectionHeaderBlock).toBeTruthy();
        expect(blocks[1] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[2] instanceof SimplePacketBlock).toBeTruthy();
        expect(blocks[3] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[4] instanceof SimplePacketBlock).toBeTruthy();
        expect(blocks[5] instanceof EnhancedPacketBlock).toBeTruthy();
    });

    test("Test012", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test012.pcapng');
        let parser = new PcapNG(filePath);
        parser.parse();

        const blocks = parser.getBlocks();
        expect(blocks.length).toBe(6);
        expect(blocks[0] instanceof SectionHeaderBlock).toBeTruthy();
        expect(blocks[1] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[2] instanceof SimplePacketBlock).toBeTruthy();
        expect(blocks[3] instanceof SimplePacketBlock).toBeTruthy();
        expect(blocks[4] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[5] instanceof EnhancedPacketBlock).toBeTruthy();
    });

    test("Test013", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test013.pcapng');
        let parser = new PcapNG(filePath);
        parser.parse();

        const blocks = parser.getBlocks();
        expect(blocks.length).toBe(3);
        expect(blocks[0] instanceof SectionHeaderBlock).toBeTruthy();
        expect(blocks[1] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[2] instanceof InterfaceStatisticsBlock).toBeTruthy();
    });

    test("Test014", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test014.pcapng');
        let parser = new PcapNG(filePath);
        parser.parse();

        const blocks = parser.getBlocks();
        expect(blocks.length).toBe(7);
        expect(blocks[0] instanceof SectionHeaderBlock).toBeTruthy();
        expect(blocks[1] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[2] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[3] instanceof InterfaceStatisticsBlock).toBeTruthy();
        expect(blocks[4] instanceof InterfaceStatisticsBlock).toBeTruthy();
        expect(blocks[5] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[6] instanceof InterfaceStatisticsBlock).toBeTruthy();
    });

    test("Test015", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test015.pcapng');
        let parser = new PcapNG(filePath);
        parser.parse();

        const blocks = parser.getBlocks();
        expect(blocks.length).toBe(3);
        expect(blocks[0] instanceof SectionHeaderBlock).toBeTruthy();
        expect(blocks[1] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[2] instanceof NameResolutionBlock).toBeTruthy();
    });

    test("Test016", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test016.pcapng');
        let parser = new PcapNG(filePath);
        parser.parse();

        const blocks = parser.getBlocks();
        expect(blocks.length).toBe(9);
        expect(blocks[0] instanceof SectionHeaderBlock).toBeTruthy();
        expect(blocks[1] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[2] instanceof NameResolutionBlock).toBeTruthy();
        expect(blocks[3] instanceof SimplePacketBlock).toBeTruthy();
        expect(blocks[4] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[5] instanceof NameResolutionBlock).toBeTruthy();
        expect(blocks[6] instanceof SimplePacketBlock).toBeTruthy();
        expect(blocks[7] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[8] instanceof NameResolutionBlock).toBeTruthy();
    });

    test("Test017", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test017.pcapng');
        let parser = new PcapNG(filePath);
        parser.parse();

        const blocks = parser.getBlocks();
        expect(blocks.length).toBe(5);
        expect(blocks[0] instanceof SectionHeaderBlock).toBeTruthy();
        expect(blocks[1] instanceof CustomBlock).toBeTruthy();
        expect(blocks[2] instanceof CustomBlock).toBeTruthy();
        expect(blocks[3] instanceof CustomBlock).toBeTruthy();
        expect(blocks[4] instanceof CustomBlock).toBeTruthy();
    });

    test("Test018", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test018.pcapng');
        let parser = new PcapNG(filePath);
        parser.parse();

        const blocks = parser.getBlocks();
        expect(blocks.length).toBe(10);
        expect(blocks[0] instanceof SectionHeaderBlock).toBeTruthy();
        expect(blocks[1] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[2] instanceof CustomBlock).toBeTruthy();
        expect(blocks[3] instanceof SimplePacketBlock).toBeTruthy();
        expect(blocks[4] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[5] instanceof CustomBlock).toBeTruthy();
        expect(blocks[6] instanceof SimplePacketBlock).toBeTruthy();
        expect(blocks[7] instanceof CustomBlock).toBeTruthy();
        expect(blocks[8] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[9] instanceof CustomBlock).toBeTruthy();
    });

    test("Test100", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test100.pcapng');
        let parser = new PcapNG(filePath);
        parser.parse();

        const blocks = parser.getBlocks();
        expect(blocks.length).toBe(14);
        expect(blocks[0] instanceof SectionHeaderBlock).toBeTruthy();
        expect(blocks[1] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[2] instanceof NameResolutionBlock).toBeTruthy();
        expect(blocks[3] instanceof SimplePacketBlock).toBeTruthy();
        expect(blocks[4] instanceof NameResolutionBlock).toBeTruthy();
        expect(blocks[5] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[6] instanceof NameResolutionBlock).toBeTruthy();
        expect(blocks[7] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[8] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[9] instanceof NameResolutionBlock).toBeTruthy();
        expect(blocks[10] instanceof SimplePacketBlock).toBeTruthy();
        expect(blocks[11] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[12] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[13] instanceof NameResolutionBlock).toBeTruthy();
    });

    test("Test101", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test101.pcapng');
        let parser = new PcapNG(filePath);
        parser.parse();

        const blocks = parser.getBlocks();
        expect(blocks.length).toBe(14);
        expect(blocks[0] instanceof SectionHeaderBlock).toBeTruthy();
        expect(blocks[1] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[2] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[3] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[4] instanceof InterfaceStatisticsBlock).toBeTruthy();
        expect(blocks[5] instanceof InterfaceStatisticsBlock).toBeTruthy();
        expect(blocks[6] instanceof InterfaceStatisticsBlock).toBeTruthy();
        expect(blocks[7] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[8] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[9] instanceof InterfaceStatisticsBlock).toBeTruthy();
        expect(blocks[10] instanceof SimplePacketBlock).toBeTruthy();
        expect(blocks[11] instanceof InterfaceStatisticsBlock).toBeTruthy();
        expect(blocks[12] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[13] instanceof InterfaceStatisticsBlock).toBeTruthy();
    });

    test("Test102", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test102.pcapng');
        let parser = new PcapNG(filePath);
        parser.parse();

        const blocks = parser.getBlocks();
        expect(blocks.length).toBe(21);
        expect(blocks[0] instanceof SectionHeaderBlock).toBeTruthy();
        expect(blocks[1] instanceof CustomBlock).toBeTruthy();
        expect(blocks[2] instanceof NameResolutionBlock).toBeTruthy();
        expect(blocks[3] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[4] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[5] instanceof InterfaceStatisticsBlock).toBeTruthy();
        expect(blocks[6] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[7] instanceof InterfaceStatisticsBlock).toBeTruthy();
        expect(blocks[8] instanceof InterfaceStatisticsBlock).toBeTruthy();
        expect(blocks[9] instanceof CustomBlock).toBeTruthy();
        expect(blocks[10] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[11] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[12] instanceof InterfaceStatisticsBlock).toBeTruthy();
        expect(blocks[13] instanceof SimplePacketBlock).toBeTruthy();
        expect(blocks[14] instanceof NameResolutionBlock).toBeTruthy();
        expect(blocks[15] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[16] instanceof InterfaceStatisticsBlock).toBeTruthy();
        expect(blocks[17] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[18] instanceof CustomBlock).toBeTruthy();
        expect(blocks[19] instanceof NameResolutionBlock).toBeTruthy();
        expect(blocks[20] instanceof InterfaceStatisticsBlock).toBeTruthy();

    });

    test("Test200", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test200.pcapng');
        let parser = new PcapNG(filePath);
        parser.parse();

        const blocks = parser.getBlocks();
        expect(blocks.length).toBe(6);
        expect(blocks[0] instanceof SectionHeaderBlock).toBeTruthy();
        expect(blocks[1] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[2] instanceof SectionHeaderBlock).toBeTruthy();
        expect(blocks[3] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[4] instanceof SectionHeaderBlock).toBeTruthy();
        expect(blocks[5] instanceof InterfaceDescriptionBlock).toBeTruthy();
    });

    test("Test201", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test201.pcapng');
        let parser = new PcapNG(filePath);
        parser.parse();

        const blocks = parser.getBlocks();
        expect(blocks.length).toBe(16);
        expect(blocks[0] instanceof SectionHeaderBlock).toBeTruthy();
        expect(blocks[1] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[2] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[3] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[4] instanceof InterfaceStatisticsBlock).toBeTruthy();
        expect(blocks[5] instanceof SectionHeaderBlock).toBeTruthy();
        expect(blocks[6] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[7] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[8] instanceof InterfaceStatisticsBlock).toBeTruthy();
        expect(blocks[9] instanceof SimplePacketBlock).toBeTruthy();
        expect(blocks[10] instanceof SectionHeaderBlock).toBeTruthy();
        expect(blocks[11] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[12] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[13] instanceof InterfaceStatisticsBlock).toBeTruthy();
        expect(blocks[14] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[15] instanceof InterfaceStatisticsBlock).toBeTruthy();
    });

    test("Test202", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test202.pcapng');
        let parser = new PcapNG(filePath);
        parser.parse();

        const blocks = parser.getBlocks();
        expect(blocks.length).toBe(28);
        expect(blocks[0] instanceof SectionHeaderBlock).toBeTruthy();
        expect(blocks[1] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[2] instanceof NameResolutionBlock).toBeTruthy();
        expect(blocks[3] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[4] instanceof CustomBlock).toBeTruthy();
        expect(blocks[5] instanceof NameResolutionBlock).toBeTruthy();
        expect(blocks[6] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[7] instanceof InterfaceStatisticsBlock).toBeTruthy();
        expect(blocks[8] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[9] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[10] instanceof SectionHeaderBlock).toBeTruthy();
        expect(blocks[11] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[12] instanceof SimplePacketBlock).toBeTruthy();
        expect(blocks[13] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[14] instanceof CustomBlock).toBeTruthy();
        expect(blocks[15] instanceof NameResolutionBlock).toBeTruthy();
        expect(blocks[16] instanceof NameResolutionBlock).toBeTruthy();
        expect(blocks[17] instanceof InterfaceStatisticsBlock).toBeTruthy();
        expect(blocks[18] instanceof SimplePacketBlock).toBeTruthy();
        expect(blocks[19] instanceof EnhancedPacketBlock).toBeTruthy();
        expect(blocks[20] instanceof SectionHeaderBlock).toBeTruthy();
        expect(blocks[21] instanceof NameResolutionBlock).toBeTruthy();
        expect(blocks[22] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[23] instanceof CustomBlock).toBeTruthy();
        expect(blocks[24] instanceof InterfaceDescriptionBlock).toBeTruthy();
        expect(blocks[25] instanceof InterfaceStatisticsBlock).toBeTruthy();
        expect(blocks[26] instanceof InterfaceStatisticsBlock).toBeTruthy();
        expect(blocks[27] instanceof EnhancedPacketBlock).toBeTruthy();
    });
});