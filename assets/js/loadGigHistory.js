document.addEventListener("DOMContentLoaded", function () {
    fetch('assets/data/gig-history.csv')
        .then(response => response.text())
        .then(data => {
            const table = document.getElementById('gig-history-table');
            const rows = data.split('\n');

            // Split the CSV file into rows and iterate through them
            rows.slice(1).forEach((row) => { // Skip header row
                const cols = row.split(',');

                // Ensure the row has exactly three columns before processing
                if (cols.length === 3) {
                    const tr = document.createElement('tr');

                    // Create table cells for each column
                    cols.forEach((col) => {
                        const td = document.createElement('td');
                        td.textContent = col.trim();
                        tr.appendChild(td);
                    });

                    // Append the row to the table
                    table.appendChild(tr);
                }
            });
        })
        .catch(error => console.error('Error loading CSV file:', error));
});
