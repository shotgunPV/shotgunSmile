document.addEventListener("DOMContentLoaded", function () {
    fetch('assets/data/upcomingGigs.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').slice(1); // Skip the header row
            const gigs = rows.map(row => {
                const [date, venue, time] = row.split(',');
                return { date: date.trim(), venue: venue.trim(), time: time.trim() };
            });

            // Sort gigs by date
            gigs.sort((a, b) => new Date(a.date) - new Date(b.date));

            // Function to get the ordinal suffix for a given day
            function getOrdinalSuffix(day) {
                if (day > 3 && day < 21) return 'th'; // covers 11th to 20th
                switch (day % 10) {
                    case 1: return 'st';
                    case 2: return 'nd';
                    case 3: return 'rd';
                    default: return 'th';
                }
            }

            // Function to format the date
            function formatDate(dateStr) {
                const dateObj = new Date(dateStr);
                const day = dateObj.getDate();
                const suffix = getOrdinalSuffix(day);
                const options = { month: 'long', year: 'numeric' };
                const formattedDate = `${day}${suffix} ${dateObj.toLocaleDateString('en-GB', options)}`;
                return formattedDate;
            }

            // Check if we are on the index page and update the next gig
            const nextGigElement = document.getElementById('next-gig-details');
            if (nextGigElement) {
                const nextGig = gigs[0];
                const formattedDate = formatDate(nextGig.date);
                nextGigElement.innerHTML = `
                    <h2>${formattedDate}</h2>
                    <h3>${nextGig.venue}</h3>
                    <h3>${nextGig.time}</h3>
                `;
            }

            // Check if we are on the coming up page and update the future gigs
            const futureGigsContainer = document.getElementById('future-gigs-list');
            if (futureGigsContainer) {
                gigs.slice(1).forEach(gig => {
                    const formattedDate = formatDate(gig.date);
                    const div = document.createElement('div');
                    div.innerHTML = `${formattedDate} at ${gig.venue}, ${gig.time}`;
                    futureGigsContainer.appendChild(div);
                });
            }
        })
        .catch(error => console.error('Error loading CSV file:', error));
});
