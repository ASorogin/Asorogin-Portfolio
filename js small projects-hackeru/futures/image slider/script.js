const wrapper = document.querySelector(".wrapper"),
  carousel = document.querySelector(".carousel"),
  images = document.querySelectorAll(".carousel img"),
  buttons = document.querySelectorAll(".button");

let imageIndex = 0,
  intervalId;

const autoSlide = () => {
  intervalId = setInterval(() => {
    imageIndex = (imageIndex + 1) % images.length;
    slideImage();
  }, 2000);
};

autoSlide();

const slideImage = () => {
  carousel.style.transform = `translate(-${imageIndex * 100}%)`;
};

wrapper.addEventListener("mouseover", () => clearInterval(intervalId));
wrapper.addEventListener("mouseleave", autoSlide);

const updateClick = (e) => {
  clearInterval(intervalId);

  if (e.target.id === "next") {
    imageIndex = (imageIndex + 1) % images.length;
  } else {
    imageIndex = (imageIndex - 1 + images.length) % images.length;
  }

  slideImage();
  autoSlide();
};

buttons.forEach((button) => button.addEventListener("click", updateClick));
