window.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (e) => {
    const target = e.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  //Timer

  const deadline = "2021-12-02";

  function getTimeRemaining(endtime) {
    const t = Date.parse(deadline) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / (1000 * 60)) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  getTimeRemaining(deadline);
  setClock(".timer", deadline);

  //Modal

  const modal = document.querySelector(".modal");
  const openBtn = document.querySelectorAll("[data-modal]");

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimer);
  }
  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  openBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      openModal();
    });
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });
  const modalTimer = setTimeout(openModal, 50000);

  window.addEventListener("scroll", showModalByScroll);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  //Menu Items
  /* CREATING MENU CARDS WITH CLASS


  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.transfer = 10600;
      this.parent = document.querySelector(parentSelector);
      this.exchangeToUZS();
    }
    exchangeToUZS() {
      this.price = this.price * this.transfer;
    }
    render() {
      const element = document.createElement("div");
      if (this.classes.length === 0) {
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `
              <img src=${this.src} alt=${this.alt} />
              <h3 class="menu__item-subtitle">${this.title}</h3>
              <div class="menu__item-descr">
                ${this.descr}
              </div>
              <div class="menu__item-divider"></div>
              <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total">
                  <span>${this.price}</span> сум/день
                </div>
              </div>
      `;
      this.parent.append(element);
    }
  }

  const getData = async (url) => {
    const result = await fetch(url);

    if (!result.ok) {
      throw new Error(`Couldn't fetch ${url}, status code: ${result.status}`);
    }
    return await result.json();
  };

  getData("http://localhost:3000/menu").then((data) => {
    data.forEach((obj) => {
      new MenuCard(
        obj.img,
        obj.altimg,
        obj.title,
        obj.descr,
        obj.price,
        ".menu .container"
      ).render();
    });
  });
*/
  // Making dynamic MenuCards without class
  const getData = async (url) => {
    const result = await fetch(url);

    if (!result.ok) {
      throw new Error(`Couldn't fetch ${url}, status code: ${result.status}`);
    }
    return await result.json();
  };
  axios.get("http://localhost:3000/menu").then((data) => createCard(data));

  function createCard(data) {
    data.data.forEach(({ img, altimg, title, descr, price }) => {
      price *= 10600;
      const element = document.createElement("div");
      element.classList.add("menu__item");
      element.innerHTML = `
        <img src=${img} alt=${altimg} />
        <h3 class="menu__item-subtitle">${title}</h3>
        <div class="menu__item-descr">
          ${descr}
        </div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total">
            <span>${price}</span> сум/день
          </div>
        </div>
      `;

      document.querySelector(".menu .container").append(element);
    });
  }

  //Forms

  const forms = document.querySelectorAll("form");

  const message = {
    loading: "img/form/spinner.svg",
    success: "Success!",
    failure: "Failed:(",
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

  const postData = async (url, data) => {
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: data,
    });

    return await result.json();
  };

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
          display: block;
          margin: 0 auto;
      `;
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      postData(" http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showStatusModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showStatusModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });

      /* Posting with the use of XMLHttpRequest

      const request = new XMLHttpRequest();
      request.open("POST", "server.php");
      request.setRequestHeader("Content-type", "application/json");
      const formData = new FormData(form);

      const object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });

      const json = JSON.stringify(object);

      request.send(json);

      request.addEventListener("load", () => {
        if (request.status === 200) {
          console.log(request.response);
          showStatusModal(message.success);
          form.reset();
          statusMessage.remove();
        } else {
          showStatusModal(message.failure);
        }
      }); 
      
      */
    });
  }

  function showStatusModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide");
    prevModalDialog.classList.remove("show");
    openModal();

    const statusModal = document.createElement("div");
    statusModal.classList.add("modal__dialog");
    statusModal.innerHTML = `
        <div class="modal__content">
          <div data-close class="modal__close">&times;</div>
          <div class="modal__title">${message}</div>
        </div>
    `;
    document.querySelector(".modal").append(statusModal);
    setTimeout(() => {
      statusModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 4000);
  }

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
});
