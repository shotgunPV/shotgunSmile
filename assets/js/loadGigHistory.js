document.addEventListener("DOMContentLoaded", function () {
    fetch('assets/Data/gig-history.csv') // Ensure path is correct and case-sensitive
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            const rows = data.split('\n').slice(1); // Skip the header row
            const gigs = rows.map(row => {
                const [date, venue, notes] = row.split(',');
                return { date: date?.trim(), venue: venue?.trim(), notes: notes?.trim() }; // Using optional chaining and trim
            });

            // Populate gig history
            const gigHistoryContainer = document.getElementById('gig-history-list');
            if (gigHistoryContainer) {
                gigs.forEach(gig => {
                    const formattedDate = formatDate(gig.date);
                    const div = document.createElement('div');
                    div.innerHTML = `<p>${formattedDate} at ${gig.venue} - ${gig.notes}</p>`;
                    gigHistoryContainer.appendChild(div);
                });
            }
        })
        .catch(error => console.error('Error loading CSV file:', error));
});

function formatDate(dateStr) {
    const dateObj = new Date(dateStr);
    const day = dateObj.getDate();
    const suffix = getOrdinalSuffix(day);
    const options = { month: 'long', year: 'numeric' };
    const formattedDate = `${day}${suffix} ${dateObj.toLocaleDateString('en-GB', options)}`;
    return formattedDate;
}

function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return 'th'; // covers 11th to 20th
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}
