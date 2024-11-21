document.addEventListener("DOMContentLoaded", function () {
    const h1 = document.querySelector("header h1");
    const logo = document.getElementById("logo");

    function resizeLogo() {
        const h1Width = h1.clientWidth;
        logo.style.width = `${h1Width}px`;
    }

    resizeLogo();
    window.addEventListener("resize", resizeLogo);
});
