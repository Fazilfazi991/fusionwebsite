(function (global) {
  'use strict';
  const MAX = BigInt(Number.MAX_SAFE_INTEGER);
  function cents(value, label) {
    if (!Number.isSafeInteger(value) || value < 0) throw new RangeError(label + ' must be a non-negative safe integer in cents.');
    return BigInt(value);
  }
  function safe(value, label) {
    if (value < 0n || value > MAX) throw new RangeError(label + ' exceeds the safe integer range.');
    return Number(value);
  }
  function quantity(value) {
    if (typeof value !== 'string' || !/^\d+(?:\.\d{1,3})?$/.test(value)) throw new TypeError('Quantity must be a non-negative decimal string with at most three decimal places.');
    const parts = value.split('.');
    const result = BigInt(parts[0]) * 1000n + BigInt((parts[1] || '').padEnd(3, '0'));
    if (result > MAX) throw new RangeError('Quantity exceeds the safe integer range.');
    return result;
  }
  function calculate(lines, discountCents = 0) {
    if (!Array.isArray(lines)) throw new TypeError('Quotation lines must be an array.');
    const discount = cents(discountCents, 'Discount');
    let subtotal = 0n;
    const working = lines.map((line, index) => {
      if (!line || typeof line !== 'object' || Array.isArray(line)) throw new TypeError('Each quotation line must be an object.');
      const rate = cents(line.rateCents, 'Rate');
      const q = quantity(line.qty);
      const base = (rate * q + 500n) / 1000n; // HALF-UP, once per line.
      safe(base, 'Line amount');
      subtotal += base;
      safe(subtotal, 'Subtotal');
      return { line, index, base, allocated: 0n, remainder: 0n };
    });
    if (discount > subtotal) throw new RangeError('Discount cannot exceed the subtotal.');
    if (subtotal > 0n && discount > 0n) {
      let allocated = 0n;
      working.forEach(row => {
        const weighted = discount * row.base;
        row.allocated = weighted / subtotal;
        row.remainder = weighted % subtotal;
        allocated += row.allocated;
      });
      let remaining = discount - allocated;
      const ranked = working.slice().sort((a, b) => a.remainder === b.remainder ? a.index - b.index : (a.remainder > b.remainder ? -1 : 1));
      for (const row of ranked) {
        if (remaining === 0n) break;
        if (row.base > row.allocated) { row.allocated += 1n; remaining -= 1n; }
      }
      if (remaining !== 0n) throw new Error('Discount allocation failed.');
    }
    let vat = 0n;
    const resultLines = working.map(row => {
      const taxable = row.base - row.allocated;
      const tax = (taxable * 5n + 50n) / 100n; // Per-line VAT, HALF-UP.
      vat += tax;
      safe(vat, 'VAT');
      return Object.assign({}, row.line, { baseCents: safe(row.base, 'Line amount'), discountCents: safe(row.allocated, 'Line discount'), taxableCents: safe(taxable, 'Taxable amount'), taxCents: safe(tax, 'Tax'), totalCents: safe(taxable + tax, 'Line total') });
    });
    const gross = subtotal - discount;
    return { lines: resultLines, subtotalCents: safe(subtotal, 'Subtotal'), discountCents: safe(discount, 'Discount'), grossCents: safe(gross, 'Gross'), vatCents: safe(vat, 'VAT'), netCents: safe(gross + vat, 'Net total') };
  }
  global.BlastlineQuoteMath = Object.freeze({ calculate });
})(window);
