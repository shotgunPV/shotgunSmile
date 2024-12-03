// Function to fetch and parse the CSV file
async function loadSongs() {
    try {
        const response = await fetch('assets/Data/songList.csv');
        const data = await response.text();
        console.log('CSV Data:', data); // Debugging log
        const rows = data.split('\n');
        console.log('Rows:', rows); // Debugging log

        const tableBody = document.querySelector('#songsTable tbody');
        rows.forEach(row => {
            const [artist, title] = row.split(',');
            if (artist && title) {
                console.log('Artist:', artist, 'Title:', title); // Debugging log
                const tr = document.createElement('tr');
                const artistTd = document.createElement('td');
                const titleTd = document.createElement('td');
                artistTd.textContent = artist;
                titleTd.textContent = title;
                tr.appendChild(artistTd);
                tr.appendChild(titleTd);
                tableBody.appendChild(tr);
            }
        });
    } catch (error) {
        console.error('Error loading songs:', error);
    }
}

// Load songs when the page loads
window.onload = loadSongs;