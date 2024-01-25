"use strict";
const CAROUSEL_CONTAINER = document.querySelector(".carousel-container");
const ITEMS = document.querySelectorAll(".item");

class Carousel {
  constructor(container, items) {
    this.carouselContainer = container;
    this.carouselArray = [...items];
    this.autoplayInterval = null;
    this.startAutoplay();

    // PAUSA PARA EL HOVER EN IMGS
    this.carouselContainer.addEventListener(
      "mouseenter",
      this.stopAutoplay.bind(this)
    );
    this.carouselContainer.addEventListener(
      "mouseleave",
      this.startAutoplay.bind(this)
    );
  }

  updateCarousel() {
    this.carouselArray.forEach((el) => {
      el.classList.remove("img-item-1");
      el.classList.remove("img-item-2");
      el.classList.remove("img-item-3");
      el.classList.remove("img-item-4");
      el.classList.remove("img-item-5");
    });

    this.carouselArray.slice(0, 5).forEach((el, i) => {
      el.classList.add(`gallery-item-${i + 1}`);
    });
  }

  setCurrentState(direccion) {
    if (direccion.className == "control-prev") {
      this.carouselArray.unshift(this.carouselArray.pop());
    } else {
      this.carouselArray.push(this.carouselArray.shift());
    }
    this.updateCarousel();
  }

  //autoplay
  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.setCurrentState("next");
    }, 2000);
  }

  //hover
  stopAutoplay() {
    clearInterval(this.autoplayInterval);
    this.autoplayInterval = null;
  }
}

const exampleCarousel = new Carousel(CAROUSEL_CONTAINER, ITEMS);
