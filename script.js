// Detect device
const isDesktop = window.innerWidth > 768;

if (isDesktop) {

  // Buttons
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

  // Pages
  const pages = document.querySelectorAll('.book-page.page-right');

  // Contact button
  const contactMeBtn = document.querySelector('.contact-me');

  if (contactMeBtn) {
    contactMeBtn.onclick = () => {
      pages.forEach((page, index) => {
        setTimeout(() => {
          page.classList.add('turn');
          page.style.zIndex = 20 + index;
        }, (index + 1) * 200);
      });
    };
  }

  // Reverse logic
  let totalPages = pages.length;
  let pageNumber = 0;

  function reverseIndex() {
    pageNumber = (pageNumber - 1 + totalPages) % totalPages;
  }

  // Back profile
  const backProfileBtn = document.querySelector('.back-profile');

  if (backProfileBtn) {
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
  }

  // Opening animation
  const coverRight = document.querySelector('.cover.cover-right');

  setTimeout(() => coverRight?.classList.add('turn'), 2100);
  setTimeout(() => {
    if (coverRight) coverRight.style.zIndex = -1;
  }, 2800);

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

  // Keyboard navigation
  let currentIndex = 0;

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      if (currentIndex < pageTurnBtn.length / 2) {
        pageTurnBtn[currentIndex * 2].click();
        currentIndex++;
      }
    }

    if (e.key === "ArrowLeft") {
      if (currentIndex > 0) {
        currentIndex--;
        pageTurnBtn[currentIndex * 2 + 1].click();
      }
    }
  });

} else {

  // MOBILE FIX
  console.log("Mobile view active");

  // Remove all 3D classes
  document.querySelectorAll('.book-page').forEach(page => {
    page.classList.remove('turn');
    page.style.transform = "none";
    page.style.position = "relative";
  });

}