document.addEventListener('DOMContentLoaded', function () {
    const date = new Date();
    const month = date.getMonth();

    // Check if the current month is December (month 11)
    if (month === 11) {
        const snowflakes = [];
        const snowflakeCharacter = '❅'; // You can use '❆', '❄', or any snowflake character
        const snowflakeCount = 100; // Increase the number of snowflakes for more coverage

        for (let i = 0; i < snowflakeCount; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.textContent = snowflakeCharacter;
            snowflake.style.left = `${Math.random() * 100}vw`;
            snowflake.style.animationDuration = `${Math.random() * 10 + 5}s`; // 5 to 15 seconds
            snowflake.style.fontSize = `${Math.random() * 2 + 1}em`; // 1 to 3 em
            document.body.appendChild(snowflake);
            snowflakes.push(snowflake);
        }
    }
});
