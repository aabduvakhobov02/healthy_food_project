import { getData } from "../services/services";

function menuCards() {
  //Menu Items
  // CREATING MENU CARDS WITH CLASS
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

  getData(
    "https://healthy-food-js-default-rtdb.asia-southeast1.firebasedatabase.app/menu.json"
  ).then((data) => {
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
  /*
  // Making dynamic MenuCards without class
  const getData = async (url) => {
    const result = await fetch(url);

    if (!result.ok) {
      throw new Error(`Couldn't fetch ${url}, status code: ${result.status}`);
    }
    return await result.json();
  };
  getData.get("http://localhost:3000/menu").then((data) => createCard(data));

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
  }*/
}

export default menuCards;
