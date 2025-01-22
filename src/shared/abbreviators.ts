const ABBREVIATION_LENGTHS_EVM = [
  // On many sites (e.g. Tenderly, defender.openzeppelin.com, Gnosis
  // Safe), addresses are abbreviated in the form 0x12345678...1234
  [8, 4],

  // On Tenderly, some addresses are abbreviated in
  // 0x1234567890...1234 form, e.g. on the Contracts tab of a
  // "Simulated Transaction" page when one of the contracts is a proxy,
  // the implementation address is shown in this form.
  [10, 4],

  // On Tenderly, other addresses are abbreviated in 0x123456...123456
  // form, e.g. in the "Tokens transferred" tab of the "Simulated
  // Transaction" page.
  [6, 6],

  // On app.safe.global, signer addresses in confirmations are
  // abbreviated in the form 0x1234...1234
  [4, 4],

  // On etherscan and clones, addresses are _mostly_ abbreviated in
  // the form 0x123456...12345678
  [6, 8],

  // However, on the Holders tab of etherscan and clones, addresses
  // are abbreviated in the form 0x12345678...123456789.  Yay consistency!
  [8, 9],

  // On Coinbase and app.ens.domains, addresses are abbreviated in the
  // form 0x123...12345
  [3, 5],

  // On *.blockscout.com, some addresses are abbreviated in the form
  // 0x12...1234
  [2, 4],

  // On oklink.com, addresses are abbreviated to 0x1234...123456789a
  [4, 10],

  // On metasleuth.io, addresses within the transaction graph are split
  // into two vertically stacked <text> elements within the <svg>: the
  // top one is 30+0, and the bottom is 0+10.  We'd need some custom
  // code to replace this elegantly, but for now arguably replacing just
  // the top one is better than nothing, even though it's ugly.
  [30, 0],
];

const ABBREVIATION_LENGTHS_SOLANA = [
  // On solscan.io, addresses are abbreviated in the form
  // 1234567890...1234567890
  [10, 10],

  // On raydium.io, addresses in the token selection modal are abbreviated
  // in the form 123456...123456
  [6, 6],

  // On jup.ag, addresses in the token selection modal are abbreviated
  // in the form 12345...12345
  [5, 5],

  // On meteora.ag, addresses in the pool creation page are abbreviated
  // in the form 1234...1234
  [4, 4],
];

export function abbreviatedEVMAddresses(address: string): string[] {
  return ABBREVIATION_LENGTHS_EVM.map(
    ([left, right]: [number, number]) =>
      address.slice(0, left + 2) + (right === 0 ? '' : '...' + address.slice(-right)),
  );
}

export function abbreviatedSolanaAddresses(address: string): string[] {
  return ABBREVIATION_LENGTHS_SOLANA.map(
    ([left, right]: [number, number]) =>
      address.slice(0, left) + (right === 0 ? '' : '...' + address.slice(-right)),
  );
}

export const ABBREVIATION_FUNCTIONS = [abbreviatedEVMAddresses, abbreviatedSolanaAddresses];

const ABBREVIATION_PATTERNS = [
  /^(0x[0-9a-f]+)(?:\.\.\.([0-9a-f]+))?$/i, // EVM
  /^([1-9A-HJ-NP-Za-km-z]+)(?:\.\.\.([1-9A-HJ-NP-Za-km-z]+))?$/i, // Solana
];

export function isAbbreviation(abbreviation: string, fullAddress: string): boolean {
  for (const pattern of ABBREVIATION_PATTERNS) {
    const m = abbreviation.match(pattern);
    if (m) {
      const [_match, start, end] = m;
      // We consider abbreviations valid only if the ERC-55 checksum
      // capitalization is preserved, OR if it was never there in
      // the first place.
      if (fullAddress.startsWith(start) && fullAddress.endsWith(end || '')) {
        return true;
      }
    }
  }
  return false;
}
