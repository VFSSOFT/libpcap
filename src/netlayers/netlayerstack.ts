import { EthernetII } from "./ethernetii";
import { IPv4 } from "./ipv4";
import { NetLayer } from "./netlayer";

export class NetLayerStack {
    layers: Array<NetLayer>;

    constructor() {
        this.layers = new Array<NetLayer>();
    }


    private static parseEthernetII(data: Buffer): EthernetII {
        let eth = new EthernetII();
        eth.parse(data);
        return eth;
    }
    private static parseIPv4(data: Buffer): IPv4 {
        let ip = new IPv4();
        ip.parse(data);
        return ip;
    }
    public static parse(data: Buffer): NetLayerStack {
        let s = new NetLayerStack();

        const eth = this.parseEthernetII(data);
        s.layers.push(eth);

        if (eth.isIPv4()) {
            const ip = this.parseIPv4(eth.payload);
            s.layers.push(ip);
        } else if (eth.isIPv6()) {
            
        }

        return s;
    }


}