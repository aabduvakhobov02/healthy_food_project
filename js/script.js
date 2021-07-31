import tabs from "./modules/tabs";
import modal from "./modules/modal";
import forms from "./modules/forms";
import timer from "./modules/timer";
import menuCards from "./modules/menuCards";
import slider from "./modules/slider";
import calc from "./modules/calc";
import { openModal } from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {
  const modalTimer = setTimeout(() => openModal(".modal", modalTimer), 50000);

  tabs(
    ".tabheader__item",
    ".tabcontent",
    ".tabheader__items",
    "tabheader__item_active"
  );
  modal("[data-modal]", ".modal");
  forms("form", modalTimer);
  timer(".timer", "2021-12-02");
  menuCards();
  calc();
  slider();
});
