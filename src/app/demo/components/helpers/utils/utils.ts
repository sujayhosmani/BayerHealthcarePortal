export class CommonUtils{


   static objectId() {
        return this.hex(Date.now() / 1000) +
          ' '.repeat(16).replace(/./g, () => this.hex(Math.random() * 16))
      }

      static hex(value: number) {
        return Math.floor(value).toString(16)
    }

}


