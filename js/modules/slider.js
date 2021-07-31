function slider() {
  //Slider

  const currentNum = document.querySelector("#current"),
    totalNum = document.querySelector("#total"),
    prevArrow = document.querySelector(".offer__slider-prev"),
    nextArrow = document.querySelector(".offer__slider-next"),
    sliderItems = document.querySelectorAll(".offer__slide"),
    sliderWrapper = document.querySelector(".offer__slider-wrapper"),
    sliderInner = document.querySelector(".offer__slider-inner"),
    width = window.getComputedStyle(sliderWrapper).width,
    slider = document.querySelector(".offer__slider"),
    dots = [];

  let slideIndex = 1;
  let offset = 0;

  function addingZero(item, num) {
    if (num < 10) {
      item.textContent = `0${num}`;
    } else {
      item.textContent = num;
    }
  }

  addingZero(totalNum, sliderItems.length);
  addingZero(currentNum, slideIndex);

  sliderInner.style.width = 100 * sliderItems.length + "%";
  sliderInner.style.display = "flex";
  sliderInner.style.transition = "0.5s all";

  sliderWrapper.style.overflow = "hidden";

  sliderItems.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = "relative";

  //Slider Navigation

  const sliderNav = document.createElement("ol");
  sliderNav.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
    `;
  slider.append(sliderNav);

  for (let i = 1; i <= sliderItems.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i);
    dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
    `;
    dot.addEventListener("click", () => {});

    sliderNav.append(dot);
    dots.push(dot);
  }

  function activateDots(arr) {
    arr.forEach((dot) => (dot.style.opacity = "0.5"));
    arr[slideIndex - 1].style.opacity = "1";
  }
  activateDots(dots);

  function remainNumExp(item) {
    return +item.replace(/\D/g, "");
  }

  nextArrow.addEventListener("click", () => {
    if (offset == remainNumExp(width) * (sliderItems.length - 1)) {
      offset = 0;
    } else {
      offset += remainNumExp(width);
    }
    sliderInner.style.transform = `translateX(-${offset}px)`;
    if (slideIndex == sliderItems.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }
    addingZero(currentNum, slideIndex);
    activateDots(dots);
  });
  prevArrow.addEventListener("click", () => {
    if (offset == 0) {
      offset = remainNumExp(width) * (sliderItems.length - 1);
    } else {
      offset -= remainNumExp(width);
    }
    sliderInner.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = sliderItems.length;
    } else {
      slideIndex--;
    }
    addingZero(currentNum, slideIndex);
    activateDots(dots);
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");
      slideIndex = slideTo;
      offset = remainNumExp(width) * (slideTo - 1);

      sliderInner.style.transform = `translateX(-${offset}px)`;
      addingZero(currentNum, slideIndex);
      activateDots(dots);
    });
  });
}

export default slider;
