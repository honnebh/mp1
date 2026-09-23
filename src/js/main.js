import calculatorImage from "../assets/calculator.png";
import graphdokuImage from "../assets/graphdoku.png";
import lectorImage from "../assets/lector.png";


// Get elements from the page
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".page-section");


// =====================================
// NAVBAR SHRINKING + POSITION INDICATOR
// =====================================

function updateNavigation() {
  navbar.classList.toggle("compact", window.scrollY > 50);
  const navbarHeight = navbar.getBoundingClientRect().height;
  let currentSection = "home";
  sections.forEach(function (section) {
    if (section.getBoundingClientRect().top <= navbarHeight + 20) {
      currentSection = section.id;
    }
  });
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5) {
    currentSection = "contact";
  }
  navLinks.forEach(function (link) {
    const active = link.getAttribute("href") === "#" + currentSection;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}

window.addEventListener("scroll", updateNavigation, { passive: true });
window.addEventListener("resize", updateNavigation);
window.addEventListener("load", updateNavigation);
navbar.addEventListener("transitionend", updateNavigation);
updateNavigation();

// Native anchor navigation preserves hashes, keyboard behavior, and history.
// CSS supplies smooth scrolling and clearance below the sticky navigation.

// =====================================
// CAROUSEL
// =====================================

const slides =
  document.querySelectorAll(".project-slide");


const dots =
  document.querySelectorAll(".dot");


const previousButton =
  document.querySelector(".carousel-prev");


const nextButton =
  document.querySelector(".carousel-next");


let currentSlide = 0;


function showSlide(number) {

  // Hide every slide
  slides.forEach(function (slide) {

    slide.classList.remove("active");

  });


  // Remove active style from dots
  dots.forEach(function (dot) {

    dot.classList.remove("active");
    dot.removeAttribute("aria-current");

  });


  // Go back to first slide if needed
  if (number >= slides.length) {

    currentSlide = 0;

  }

  // Go to last slide if needed
  else if (number < 0) {

    currentSlide = slides.length - 1;

  }

  else {

    currentSlide = number;

  }


  // Show current slide
  slides[currentSlide].classList.add("active");


  dots[currentSlide].classList.add("active");
  dots[currentSlide].setAttribute("aria-current", "true");

}


showSlide(0);

// Next button
nextButton.addEventListener("click", function () {

  showSlide(currentSlide + 1);

});


// Previous button
previousButton.addEventListener("click", function () {

  showSlide(currentSlide - 1);

});


// Carousel dots
dots.forEach(function (dot, index) {

  dot.addEventListener("click", function () {

    showSlide(index);

  });

});


// =====================================
// MODAL
// =====================================

const modal =
  document.getElementById("project-modal");


const modalImage =
  document.getElementById("modal-image");


const modalTitle =
  document.getElementById("modal-title");


const modalDescription =
  document.getElementById("modal-description");


const closeButton =
  document.getElementById("close-modal");


const detailButtons =
  document.querySelectorAll(".details-button");


// Information displayed inside each modal
const projectInfo = {

  calculator: {

    title: "Java Swing Graphing Calculator",

    description:
      "A Java Swing application that allows users to work with and graph mathematical functions.",

    image: calculatorImage

  },


  graphdoku: {

    title: "GraphDoku",

    description:
      "A Java logic puzzle project that uses object-oriented programming and grid-based interaction.",

    image: graphdokuImage

  },


  lector: {

    title: "Ethiopian Orthodox Lector App",

    description:
      "A React Native application containing Ethiopian Orthodox readings in Amharic and English.",

    image: lectorImage

  }

};


let modalTrigger = null;

// Open modal
detailButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    const projectName =
      button.getAttribute("data-project");


    const project =
      projectInfo[projectName];


    modalTitle.textContent =
      project.title;


    modalDescription.textContent =
      project.description;


    modalImage.src =
      project.image;


    modalTrigger = button;
    document.body.classList.add("modal-open");
    modal.classList.add("open");


    modal.setAttribute(
      "aria-hidden",
      "false"
    );
    closeButton.focus();

  });

});


// Close modal using X button
closeButton.addEventListener("click", function () {

  closeModal();

});


// Close modal by clicking outside
modal.addEventListener("click", function (event) {

  if (event.target === modal) {

    closeModal();

  }

});


// Close modal with Escape key
document.addEventListener("keydown", function (event) {

  if (event.key === "Tab" && modal.classList.contains("open")) {
    event.preventDefault();
    closeButton.focus();
  }

  if (
    event.key === "Escape" &&
    modal.classList.contains("open")
  ) {

    closeModal();

  }

});


function closeModal() {

  modal.classList.remove("open");
  document.body.classList.remove("modal-open");
  if (modalTrigger) modalTrigger.focus();


  modal.setAttribute(
    "aria-hidden",
    "true"
  );

}