// Function to fetch and parse the CSV file
async function loadSongs() {
    try {
        const response = await fetch('assets/Data/songList.csv');
        const data = await response.text();
        console.log('CSV Data:', data); // Debugging log
        const rows = data.split('\n');
        console.log('Rows:', rows); // Debugging log

        const artistSongs = {};
        rows.forEach(row => {
            const [artist, title] = row.split(',');
            if (artist && title) {
                if (!artistSongs[artist]) {
                    artistSongs[artist] = [];
                }
                artistSongs[artist].push(title);
            }
        });

        const tableBody = document.querySelector('#songsTable tbody');
        for (const artist in artistSongs) {
            const titles = artistSongs[artist].join(', ');
            const tr = document.createElement('tr');
            const artistTd = document.createElement('td');
            const titleTd = document.createElement('td');
            artistTd.textContent = artist;
            titleTd.textContent = titles;
            tr.appendChild(artistTd);
            tr.appendChild(titleTd);
            tableBody.appendChild(tr);
        }
    } catch (error) {
        console.error('Error loading songs:', error);
    }
}

// Load songs when the page loads
window.onload = loadSongs;