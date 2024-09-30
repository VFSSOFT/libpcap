import { EthernetII } from "./ethernetii";
import { IPv4 } from "./ipv4";
import { IPv6 } from "./ipv6";
import { NetLayer } from "./netlayer";

export class NetLayerStack {
    layers: Array<NetLayer>;

    constructor() {
        this.layers = new Array<NetLayer>();
    }

    public static parse(data: Buffer): NetLayerStack {
        let s = new NetLayerStack();

        const eth = new EthernetII();
        eth.parse(data);
        s.layers.push(eth);

        if (eth.isIPv4()) {
            const ip = new IPv4();
            ip.parse(eth.payload);
            s.layers.push(ip);
        } else if (eth.isIPv6()) {
            const ip = new IPv6();
            ip.parse(eth.payload);
            s.layers.push(ip);
        }

        return s;
    }


}