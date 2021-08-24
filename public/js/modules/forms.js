import { openModal, closeModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalTimer) {
  //Forms

  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: "img/form/spinner.svg",
    success: "Success!",
    failure: "Failed:(",
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

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
      postData(
        "https://healthy-food-js-default-rtdb.asia-southeast1.firebasedatabase.app/requests.json",
        json
      )
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
    openModal(".modal", modalTimer);

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
      closeModal(".modal");
    }, 4000);
  }
}

export default forms;
