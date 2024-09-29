import { EthernetII } from "./ethernetii";

// base class for all net layer classes.
export class NetLayer {
    name: string

    constructor(name: string) {
        this.name = name;
    }
}
