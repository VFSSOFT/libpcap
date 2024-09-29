import path from 'path';
import { Pcap } from '../pcap';

function getTestFile(name: string): string {
    return path.join(__dirname, '__fixtures__', name);
}

describe("Pcap", () => {
    test("Test001", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test001.pcapng');
        let p = new Pcap();
        const sections = p.parse(filePath);

        expect(sections.length).toBe(1);
        const pkts = sections[0].packets;
        expect(pkts.length).toBe(4);

        expect(pkts[0].originalLength).toEqual(314);
        expect(pkts[0].data.length).toEqual(314);
        expect(pkts[1].originalLength).toEqual(342);
        expect(pkts[1].data.length).toEqual(342);
        expect(pkts[2].originalLength).toEqual(314);
        expect(pkts[2].data.length).toEqual(314);
        expect(pkts[3].originalLength).toEqual(342);
        expect(pkts[3].data.length).toEqual(342);
    });

    test("Test002", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test002.pcapng');
        let p = new Pcap();
        const sections = p.parse(filePath);

        expect(sections.length).toBe(1);
        expect(sections[0].packets.length).toBe(0);
    });

    test("Test003", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test003.pcapng');
        let p = new Pcap();
        const sections = p.parse(filePath);

        expect(sections.length).toBe(1);
        expect(sections[0].packets.length).toBe(0);
    });

    test("Test004", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test004.pcapng');
        let p = new Pcap();
        const sections = p.parse(filePath);

        expect(sections.length).toBe(1);
        const pkts = sections[0].packets;
        expect(pkts.length).toBe(4);

        expect(pkts[0].originalLength).toEqual(314);
        expect(pkts[0].data.length).toEqual(96);
        expect(pkts[1].originalLength).toEqual(342);
        expect(pkts[1].data.length).toEqual(128);
        expect(pkts[2].originalLength).toEqual(314);
        expect(pkts[2].data.length).toEqual(96);
        expect(pkts[3].originalLength).toEqual(342);
        expect(pkts[3].data.length).toEqual(128);
    });

    test("Test005", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test005.pcapng');
       
    });

    test("Test006", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test006.pcapng');
        
    });

    test("Test007", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test007.pcapng');
        
    });

    test("Test008", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test008.pcapng');
    });


    test("Test009", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test009.pcapng');
    });

    test("Test010", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test010.pcapng');
    });

    test("Test011", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test011.pcapng');
    });

    test("Test012", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test012.pcapng');
    });

    test("Test013", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test013.pcapng');
    });

    test("Test014", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test014.pcapng');
    });

    test("Test015", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test015.pcapng');
    });

    test("Test016", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test016.pcapng');
    });

    test("Test017", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test017.pcapng');
    });

    test("Test018", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test018.pcapng');
    });

    test("Test100", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test100.pcapng');
    });

    test("Test101", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test101.pcapng');
    });

    test("Test102", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test102.pcapng');
    });

    test("Test200", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test200.pcapng');
    });

    test("Test201", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test201.pcapng');
    });

    test("Test202", () => {
        const filePath = getTestFile('pcapng-test-generator/le/test202.pcapng');

    });
});