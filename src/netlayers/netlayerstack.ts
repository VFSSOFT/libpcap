import { EthernetII } from "./ethernetii";
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
    public static parse(data: Buffer): NetLayerStack {
        let s = new NetLayerStack();

        const eth = this.parseEthernetII(data);
        s.layers.push(eth);

        return s;
    }


}