const pageTurnBtn = document.querySelectorAll('.nextprev-btn');

pageTurnBtn.forEach((el, index) => {
    el.onclick = () => {
        const pageTurn = document.getElementById(el.dataset.page);
        if (!pageTurn) return;

        pageTurn.classList.toggle('turn');

        setTimeout(() => {
            pageTurn.style.zIndex = pageTurn.classList.contains('turn')
                ? 2 + index
                : 2 - index;
        }, 500);
    };
});

const pages = document.querySelectorAll('.book-page.page-right');
const contactMeBtn = document.querySelector('.contact-me');

contactMeBtn.onclick = () => {
    pages.forEach((page, index) => {
        setTimeout(() => {
            page.classList.add('turn');
            page.style.zIndex = 20 + index;
        }, (index + 1) * 200);
    });
};

let totalPages = pages.length;
let pageNumber = 0;

function reverseIndex() {
    pageNumber = (pageNumber - 1 + totalPages) % totalPages;
}

const backProfileBtn = document.querySelector('.back-profile');

backProfileBtn.onclick = () => {
    pages.forEach((_, index) => {
        setTimeout(() => {
            reverseIndex();
            pages[pageNumber].classList.remove('turn');

            setTimeout(() => {
                reverseIndex();
                pages[pageNumber].style.zIndex = 10 + index;
            }, 500);
        }, (index + 1) * 200);
    });
};

// opening animation
const coverRight = document.querySelector('.cover.cover-right');

setTimeout(() => coverRight.classList.add('turn'), 2100);
setTimeout(() => coverRight.style.zIndex = -1, 2800);

pages.forEach((_, index) => {
    setTimeout(() => {
        reverseIndex();
        pages[pageNumber].classList.remove('turn');

        setTimeout(() => {
            reverseIndex();
            pages[pageNumber].style.zIndex = 10 + index;
        }, 500);
    }, (index + 1) * 200 + 2100);
});