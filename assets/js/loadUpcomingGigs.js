document.addEventListener("DOMContentLoaded", function () {
    fetch('assets/Data/upcomingGigs.csv') // Use 'Data' with the correct case
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            const rows = data.split('\n').slice(1); // Skip the header row
            const gigs = rows.map(row => {
                const [date, venue, time] = row.split(',');
                return { date: date?.trim(), venue: venue?.trim(), time: time?.trim() }; // Using optional chaining and trim
            });

            // Sort gigs by date
            gigs.sort((a, b) => new Date(a.date) - new Date(b.date));

            // Check if we are on the index page and update the next gig
            const nextGigElement = document.getElementById('next-gig-details');
            if (nextGigElement) {
                const nextGig = gigs[0];
                const formattedDate = formatDate(nextGig.date);
