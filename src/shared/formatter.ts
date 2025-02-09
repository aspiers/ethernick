import { Label, Address, AddressType } from './types';

export function extractAddressDigits(address: Address, start: number, end: number): string {
  return address.replace(/^0x/, '').slice(start, end);
}

export class Formatter {
  formatString: string;

  constructor(_formatString: string) {
    this.formatString = _formatString;
  }

  format(label: Label, address: Address, addressType: AddressType): string {
    return this.formatString
      .replace('%n', label)
      .replace('%a', address)
      .replace(/%(\d+)l/, (_match, digits) =>
        this.sliceAddressStart(address, addressType, Number(digits)),
      )
      .replace(/%(\d+)r/, (_match, digits) => address.replace(/^0x/, '').slice(-Number(digits)));
  }

  sliceAddressStart(address: Address, addressType: AddressType, digits: number): string {
    let addressString = address.replace(/^0x/, '').slice(0, Number(digits));

    const isFormattedEVMAddress = addressType === 'EVM' && address.startsWith('0x');
    if (isFormattedEVMAddress) {
      addressString = '0x' + addressString;
    }

    return addressString;
  }
}
