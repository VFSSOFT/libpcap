import path from 'path';
import { EnhancedPacketBlock, InterfaceDescriptionBlock, InterfaceStatisticsBlock, PcapNG, SectionHeaderBlock } from '../blocks';

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

    test("Test2", () => {

    });
});