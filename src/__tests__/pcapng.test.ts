import path from 'path';
import { PcapNG } from '../blocks';

function getTestFile(name: string): string {
    return path.join(__dirname, '__fixtures__', name);
}

describe("PcapNG parsing", () => {
    test("Test1", () => {
        const filePath = getTestFile('test1.pcapng');
        let parser = new PcapNG(filePath);
        parser.parse();
    });

    test("Test2", () => {

    });
});