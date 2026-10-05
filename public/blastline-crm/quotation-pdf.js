(function (global) {
  'use strict';
  const scriptURL = document.currentScript && document.currentScript.src;
  const assetBase = new URL('assets/', scriptURL || new URL('quotation-pdf.js', document.baseURI)).href;
  const W = 595.5, H = 842.25, LEFT = 21, RIGHT = 575, FOOTER = 794;
  const BLUE = [16, 71, 147];
  const TERMS = Object.freeze([
    'Prices are valid for the period mentioned above and are subject to change without prior notice.',
    'Payment to be made as per the agreed terms.',
    'Goods once sold will not be taken back or exchanged.',
    'Delivery time is an estimate and may vary based on stock availability and location.',
    "Warranty, if any, will be as per manufacturer's standard terms.All disputes are subject to Dubai jurisdiction only."
  ]);
  let artwork;
  function loadImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('Unable to load quotation artwork: ' + url));
      image.src = url;
    });
  }
  function text(value) { return value === undefined || value === null ? '' : String(value); }
  function revision(quote) { return Number.isSafeInteger(quote.rev) && quote.rev >= 0 ? quote.rev : 1; }
  function money(value) {
    const digits = String(value).padStart(3, '0');
    return digits.slice(0, -2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + digits.slice(-2);
  }
  function title(doc, label, x, y, width) {
    doc.setFillColor(...BLUE); doc.setDrawColor(...BLUE);
    doc.roundedRect(x, y, width, 20, 3, 3, 'F');
    doc.setTextColor(255); doc.setFont('helvetica', 'normal'); doc.setFontSize(12);
    doc.text(label, x + 6, y + 14);
  }
  function fieldRows(doc, entries, width, labelWidth, size) {
    doc.setFont('helvetica', 'normal'); doc.setFontSize(size);
    return entries.map(([label, value]) => {
      const lines = doc.splitTextToSize(text(value), width - labelWidth - 12);
      return { label, lines: lines.length ? lines : [''], height: Math.max(14, lines.length * (size + 2)) };
    });
  }
  function fields(doc, rows, x, y, width, height, labelWidth, size) {
    doc.setDrawColor(25); doc.setLineWidth(0.6); doc.roundedRect(x, y, width, height, 3, 3);
    doc.setTextColor(20); doc.setFontSize(size);
    let cursor = y + 14;
    rows.forEach(row => {
      doc.text(row.label, x + 6, cursor);
      doc.text(':', x + labelWidth - 5, cursor);
      doc.text(row.lines, x + labelWidth + 2, cursor, { lineHeightFactor: (size + 2) / size });
      cursor += row.height;
    });
  }
  async function build(quote) {
    if (!quote || typeof quote !== 'object') throw new TypeError('A quotation is required.');
    if (!global.jspdf || !global.jspdf.jsPDF || !global.BlastlineQuoteMath) throw new Error('Quotation PDF dependencies have not loaded.');
    const totals = global.BlastlineQuoteMath.calculate(quote.lines || [], quote.discountCents === undefined ? 0 : quote.discountCents);
    if (!artwork) artwork = Promise.all([loadImage(assetBase + 'quotation-header.png'), loadImage(assetBase + 'quotation-footer.png')]);
    const [header, footer] = await artwork;
    const doc = new global.jspdf.jsPDF({ unit: 'pt', format: [W, H], compress: true });
    if (typeof doc.autoTable !== 'function') throw new Error('Quotation table engine has not loaded.');
    doc.setProperties({ title: 'BLASTLINE Quotation ' + text(quote.number) + ' R' + revision(quote), subject: 'Fictional demo quotation', author: 'BLASTLINE L.L.C. demo', creator: 'Blastline quotation workspace' });
    const customer = quote.customer || {}, details = quote.details || {}, commercial = quote.commercial || {};
    const customerRows = fieldRows(doc, [['Customer Name', customer.name], ['Atten', customer.attention], ['P.O.Box', customer.poBox], ['Address', customer.address], ['Tel No.', customer.tel], ['Email ID', customer.email]], 342, 90, 9);
    const detailRows = fieldRows(doc, [['Quote No.', text(quote.number || quote.id) + ' / R' + revision(quote)], ['Quote Date', quote.date], ['Cust. Ref No.', details.customerRef], ['Sales Rep', details.salesRep], ['Sales Rep No.', details.salesRepNo], ['Pages', '999 / 999']], 194, 76, 9);
    const infoHeight = Math.max(99, customerRows.reduce((sum, row) => sum + row.height, 0) + 12, detailRows.reduce((sum, row) => sum + row.height, 0) + 12);
    const tableStart = 155 + infoHeight + 22;
    if (tableStart > 620) throw new RangeError('Quotation customer details exceed the available page area. Shorten the customer details before exporting.');
    const margin = { left: LEFT, right: W - RIGHT, top: tableStart, bottom: H - 793 };
    const tableHead = [['Sl.\nNo.', 'Description', 'Qty', 'Unit', 'Rate / Unit\n(AED)', 'Taxable\nAmount\n(AED)', 'Tax Amount\n(AED)', 'Total with\nTax']];
    const body = totals.lines.map((line, i) => [String(i + 1), text(line.description), line.qty, text(line.unit), money(line.rateCents), money(line.taxableCents), money(line.taxCents), money(line.totalCents)]);
    const columns = [23, 208, 45, 52, 54, 58, 57, 57];
    const lineOptions = { head: tableHead, theme: 'grid', tableWidth: 554,
      styles: { font: 'helvetica', fontSize: 9, textColor: 20, lineColor: 25, lineWidth: 0.55, cellPadding: 4, overflow: 'linebreak', valign: 'top' },
      headStyles: { fillColor: BLUE, textColor: 255, fontStyle: 'normal', fontSize: 9, halign: 'center', valign: 'middle', minCellHeight: 38 },
      columnStyles: Object.fromEntries(columns.map((width, i) => [i, { cellWidth: width, halign: i >= 4 ? 'right' : i === 2 || i === 3 ? 'center' : 'left' }]))
    };
    const commercialRows = [['Validity', commercial.validity], ['Payment Terms', commercial.payment], ['Availability', commercial.availability], ['Delivery Place', commercial.deliveryPlace], ['Mode of transport', commercial.transport]];
    const commercialOptions = { tableWidth: 286, theme: 'grid', head: [[{ content: 'Notes & Commercial Terms', colSpan: 2 }]], body: commercialRows.map(row => [row[0] + ' :', text(row[1])]),
      styles: { font: 'helvetica', fontSize: 9, textColor: 20, lineColor: 25, lineWidth: 0, cellPadding: { left: 5, right: 5, top: 2, bottom: 2 }, overflow: 'linebreak' },
      headStyles: { fillColor: [255, 255, 255], textColor: 255, fontStyle: 'normal', fontSize: 12, minCellHeight: 20 },
      columnStyles: { 0: { cellWidth: 102 }, 1: { cellWidth: 184 } }
    };
    const termsOptions = { tableWidth: 430, theme: 'plain', head: [['Terms & Conditions']], body: TERMS.map(term => ['\u2022  ' + term]),
      styles: { font: 'helvetica', fontSize: 8, textColor: 20, cellPadding: { left: 3, right: 3, top: 0.4, bottom: 0.4 }, overflow: 'linebreak' },
      headStyles: { fillColor: [255, 255, 255], textColor: 255, fontStyle: 'normal', fontSize: 12, minCellHeight: 20, cellPadding: 5 }
    };
    // Measure with the same renderer and styles used below. Reserve wrapped final
    // blocks before extending a short grid to the source's generous blank height.
    function measuredHeight(options) {
      const probe = new global.jspdf.jsPDF({ unit: 'pt', format: [W, 14400] });
      probe.autoTable(Object.assign({}, options, { startY: 0, margin: { left: LEFT, right: W - RIGHT, top: 0, bottom: 0 }, showHead: 'firstPage', rowPageBreak: 'avoid' }));
      return probe.getNumberOfPages() === 1 ? probe.lastAutoTable.finalY : Infinity;
    }
    const commercialHeight = measuredHeight(commercialOptions);
    const termsHeight = measuredHeight(termsOptions);
    const termsOffset = Math.max(3 + commercialHeight + 4, 99);
    const finalBlockHeight = Math.max(termsOffset + termsHeight, termsOffset + 73, 171);
    if (!body.length) body.push(['', '', '', '', '', '', '', '']);
    const contentHeight = measuredHeight(Object.assign({}, lineOptions, { body }));
    const targetGridBottom = Math.min(617, 793 - 4 - finalBlockHeight - 2);
    const fillerHeight = targetGridBottom - tableStart - contentHeight;
    if (fillerHeight >= 19) body.push(['', '', '', '', '', '', '', '']);
    doc.autoTable(Object.assign({}, lineOptions, { startY: tableStart, margin, body,
      rowPageBreak: 'avoid', showHead: 'everyPage',
      didParseCell(data) { if (fillerHeight >= 19 && data.section === 'body' && data.row.index === body.length - 1 && data.row.raw.every(value => value === '')) data.cell.styles.minCellHeight = fillerHeight; }
    }));
    let finalStart = doc.lastAutoTable.finalY + 4;
    const fitsOnFreshPage = tableStart + finalBlockHeight <= 793;
    if (fitsOnFreshPage && finalStart + finalBlockHeight > 793) { doc.addPage(); finalStart = tableStart; }
    if (finalStart + 67 > 793) { doc.addPage(); finalStart = tableStart; }
    const summary = [['Total Before VAT', totals.subtotalCents], ['Total Discount', totals.discountCents], ['Gross Total before VAT', totals.grossCents], ['VAT Amount (5%)', totals.vatCents]];
    doc.setDrawColor(25); doc.setLineWidth(0.6); doc.roundedRect(388, finalStart, 187, 51, 3, 3);
    doc.setFontSize(9); doc.setTextColor(20);
    summary.forEach((row, i) => { doc.text(row[0], 393, finalStart + 11 + i * 11); doc.text(':', 501, finalStart + 11 + i * 11); doc.text(money(row[1]), 570, finalStart + 11 + i * 11, { align: 'right' }); });
    doc.setFillColor(...BLUE); doc.roundedRect(389, finalStart + 53, 188, 14, 3, 3, 'F');
    doc.setTextColor(255); doc.text('Net Total with VAT', 394, finalStart + 63); doc.text(money(totals.netCents), 570, finalStart + 63, { align: 'right' });
    const commercialPage = doc.getCurrentPageInfo().pageNumber;
    doc.autoTable(Object.assign({}, commercialOptions, { startY: finalStart + 3, margin,
      didDrawCell(data) { if (data.section === 'head' && data.column.index === 0) title(doc, 'Notes & Commercial Terms', LEFT, data.cell.y, 185); },
      didDrawPage(data) { const y = data.cursor.y; doc.setDrawColor(25); doc.setLineWidth(0.6); const top = data.pageNumber === 1 ? finalStart + 23 : tableStart + 20; if (y > top) doc.rect(LEFT, top, 286, y - top); },
      rowPageBreak: 'avoid', showHead: 'everyPage'
    }));
    let termsY = doc.getCurrentPageInfo().pageNumber === commercialPage ? Math.max(doc.lastAutoTable.finalY + 4, finalStart + 99) : doc.lastAutoTable.finalY + 4;
    const neededTermsHeight = Math.max(termsHeight, Math.max(tableStart, termsY - 15) + 88 - termsY);
    if (termsY + neededTermsHeight > 793) { doc.addPage(); termsY = tableStart; }
    doc.autoTable(Object.assign({}, termsOptions, { startY: termsY, margin,
      rowPageBreak: 'avoid',
      didDrawCell(data) { if (data.section === 'head') title(doc, 'Terms & Conditions', LEFT, data.cell.y, 185); },
      didDrawPage(data) { const top = data.pageNumber === 1 ? termsY + 20 : tableStart + 20; doc.setDrawColor(25); doc.setLineWidth(0.6); if (data.cursor.y > top) doc.roundedRect(LEFT, top, 430, data.cursor.y - top, 3, 3); }
    }));
    // Deliberately unsigned: the source's signature box is a place for a real signature.
    const signatureY = Math.max(tableStart, Math.min(793 - 88, termsY - 15));
    doc.setDrawColor(25); doc.setLineWidth(0.6); doc.roundedRect(457, signatureY, 121, 88, 3, 3);
    doc.setFontSize(9); doc.setTextColor(20); doc.text(['Sales Representative', 'Signature & Seal'], 517.5, signatureY + 18, { align: 'center' });
    const pageCount = doc.getNumberOfPages();
    const status = ({ draft: 'DRAFT', sent: 'SENT', approved: 'APPROVED', accepted: 'APPROVED', converted: 'APPROVED', declined: 'DECLINED' })[text(quote.status).toLowerCase()] || 'DRAFT';
    for (let page = 1; page <= pageCount; page++) {
      doc.setPage(page);
      doc.addImage(header, 'PNG', 0, 0, W, 104.5);
      doc.addImage(footer, 'PNG', 0, FOOTER, W, H - FOOTER);
      doc.setTextColor(...BLUE); doc.setFont('helvetica', 'bold'); doc.setFontSize(26); doc.text('QUOTATION', W / 2, 136, { align: 'center' });
      doc.setFont('helvetica', 'normal'); doc.setFontSize(6.5); doc.setTextColor(85); doc.text(status + ' | FICTIONAL DEMO', W / 2, 147, { align: 'center' });
      title(doc, 'CUSTOMER DETAILS', LEFT, 135, 142);
      title(doc, 'QUOTATION DETAILS', 381, 135, 152);
      fields(doc, customerRows, LEFT, 155, 342, infoHeight, 90, 9);
      const currentDetails = detailRows.map(row => Object.assign({}, row)); currentDetails[5].lines = [page + ' / ' + pageCount];
      fields(doc, currentDetails, 381, 155, 194, infoHeight, 76, 9);
      doc.setFont('helvetica', 'italic'); doc.setFontSize(9); doc.setTextColor(20); doc.text('We thank you for the enquiry and are pleased to quote our best as follows:', 27, tableStart - 7);
    }
    return doc;
  }
  async function blob(quote) { return (await build(quote)).output('blob'); }
  async function download(quote) { const doc = await build(quote); doc.save(('BLASTLINE-' + text(quote.number || quote.id || 'quotation') + '-R' + revision(quote)).replace(/[^a-z0-9._-]/gi, '-') + '.pdf'); return doc; }
  global.BlastlineQuotePDF = Object.freeze({ build, blob, download, defaultTerms: TERMS });
})(window);
