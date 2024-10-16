const sections = document.querySelectorAll(".hero-section, .info-section, .process-section, .benefits-section, .cta-section");
var btnSvg;

const arrowElement = `<div class="arrow-svg"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="90" height="90" viewBox="0 0 90 90"><defs><filter id="Elipse_1" x="0" y="0" width="90" height="90" filterUnits="userSpaceOnUse"><feOffset dy="3" input="SourceAlpha"/><feGaussianBlur stdDeviation="7.5" result="blur"/><feFlood flood-opacity="0.082"/><feComposite operator="in" in2="blur"/><feComposite in="SourceGraphic"/></filter></defs><g id="Grupo_9" data-name="Grupo 9" transform="translate(22.5 19.953)"><g transform="matrix(1, 0, 0, 1, -22.5, -19.95)" filter="url(#Elipse_1)"><circle id="Elipse_1-2" data-name="Elipse 1" cx="22.5" cy="22.5" r="22.5" transform="translate(22.5 64.5) rotate(-90)" fill="#05bca7"/></g><path id="Caminho_1" data-name="Caminho 1" d="M0,15.233H15.233V0" transform="translate(22.575 8.141) rotate(45)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/></g></svg></div>`;

document.addEventListener("DOMContentLoaded", function() {
    btnSvg = document.createElement("div");
    btnSvg.classList.add("scroll-btn");
    btnSvg.innerHTML = arrowElement;

    document.querySelector(".hero-section").appendChild(btnSvg);

    sections.forEach((section, idx) => {
        section.setAttribute("data-index", idx);
    });

    btnSvg.addEventListener("click", function() {
        const index = parseInt(document.querySelector(".hero-section").getAttribute("data-index"), 10) || 0;
        const nextIndex = (index + 1) % sections.length;
        const nextSection = sections[nextIndex];

        window.scrollTo({
            top: nextSection.offsetTop,
            behavior: "smooth"
        });

        nextSection.setAttribute("data-index", nextIndex);
    });
});
