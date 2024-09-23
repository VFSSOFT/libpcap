


export class MyBuf {
    private bigEndian: boolean;
    private offset: number;
    private buf: Buffer;

    constructor(buf: Buffer) {
        this.bigEndian = true;
        this.offset = 0;
        this.buf = buf;
    }

    public setEndian(bigEndian: boolean) {
        this.bigEndian = bigEndian;
    }    
    public getEndian(): boolean {
        return this.bigEndian;
    }


    public hasMore(): boolean {
        return this.offset < this.buf.length;
    }
    public available(): number {
        return this.buf.length - this.offset;
    }

    public skip(cnt: number) {
        this.offset += cnt;
    }

    public seekTo(cnt: number) {
        this.offset = cnt;
    }

    public readBytes(cnt: number) {
        const b = this.buf.subarray(this.offset, this.offset + cnt);
        this.offset += cnt;
        return b;
    }
    public readUint16(): number {
        var val = 0;
        if (this.bigEndian) {
            val = this.buf.readUint16BE(this.offset);
        } else {
            val = this.buf.readUint16LE(this.offset);
        }
        this.offset += 2;
        return val;
    }
    public readInt16(): number {
        var val = 0;
        if (this.bigEndian) {
            val = this.buf.readInt16BE(this.offset);
        } else {
            val = this.buf.readInt16LE(this.offset);
        }
        this.offset += 2;
        return val;
    }
    public readUint32(): number {
        var val = 0;
        if (this.bigEndian) {
            val = this.buf.readUint32BE(this.offset);
        } else {
            val = this.buf.readUint32LE(this.offset);
        }
        this.offset += 4;
        return val;
    }

    public readInt64(): number {
        var val : bigint;
        if (this.bigEndian) {
            val = this.buf.readBigInt64BE(this.offset);
        } else {
            val = this.buf.readBigInt64LE(this.offset);
        }
        this.offset += 8;
        return Number(val);
    }
    

}