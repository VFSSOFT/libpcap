import { EthernetII } from "./ethernetii";
import { IPv4 } from "./ipv4";
import { IPv6 } from "./ipv6";
import { IPLayer, NetLayer, TransLayer } from "./netlayer";
import { TCP } from "./tcp";
import { UDP } from "./udp";

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

        let ip : IPLayer;
        let trans : TransLayer;
        
        if (eth.isIPv4()) {
            const ipv4 = new IPv4();
            ipv4.parse(eth.payload);
            ip = ipv4;
        } else if (eth.isIPv6()) {
            const ipv6 = new IPv6();
            ipv6.parse(eth.payload);
            ip = ipv6;
        } else {
            throw new Error("Unsupported net layer type");
        }
        s.layers.push(ip);


        if (ip.isUdpPayload()) {
            const udp = new UDP();
            udp.parse(ip.getPayload());
            trans = udp;
        } else if (ip.isTcpPayload()) {
            const tcp = new TCP();
            tcp.parse(ip.getPayload());
            trans = tcp;
        } else {
            throw new Error("Unsupported net layer type");
        }
        s.layers.push(trans);


        return s;
    }


}