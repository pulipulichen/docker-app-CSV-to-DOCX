const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

function csvToHtml(csvFileName) {
  return new Promise((resolve, reject) => {
  
    let htmlContent = `<!DOCTYPE html><html><head><title>${path.basename(csvFileName)}</title></head><body><table border="1">`;
    let headerWritten = false;

    // Read the CSV file
    fs.createReadStream(csvFileName)
        .pipe(csv())
        .on('data', (row) => {
            // Process each row of data here
            // console.log(row);
            // You can manipulate the data here, for example, to create an HTML table
            // For simplicity, let's assume the first row contains headers

            // Write HTML table header if it's the first row
            if (!headerWritten) {
                htmlContent += '<thead><tr>';
                for (let header in row) {
                    htmlContent += `<th>${header}</th>`;
                }
                htmlContent += '</tr></thead><tbody>';
                headerWritten = true;
            }

            // Write table row
            htmlContent += '<tr>';
            for (let cell in row) {
                htmlContent += `<td>${row[cell]}</td>`;
            }
            htmlContent += '</tr>';
        })
        .on('end', () => {
            // Finalize the HTML content
            htmlContent += '</tbody></table></body></html>';

            // Call the callback with the HTML content
            resolve(htmlContent);
        });
  })
}

module.exports = csvToHtml