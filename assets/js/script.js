const formElements = document.querySelectorAll(".form-control");
const form = document.querySelector("#contact");
const patternUrl = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
const dynamicScriptSrc = "https://smtpjs.com/v3/smtp.js";
let scriptDynamic = false;

// check url
const isUrl = (url) => {
  return patternUrl.test(url);
};

// add script after focus form element
const handleDynamicScript = (src) => {
  if (!isUrl(src)) {
    return false;
  }
  formElements.forEach((el) => {
    el.addEventListener("focus", () => {
      if (!scriptDynamic) {
        scriptDynamic = true;
        const createScript = document.createElement("script");
        createScript.src = src;
        const scriptBefore = document.getElementsByTagName("script")[0];
        scriptBefore.parentNode.insertBefore(createScript, scriptBefore);
      }
    });
  });
};

// add data from form to modal
const handleDataToModal = () => {
  formElements.forEach((el) => {
    const modalFieldContent = document.querySelector(
      `.modal-body [data-name='${el.name}']`
    );
    if (modalFieldContent != null) {
      el.name === modalFieldContent.dataset.name
        ? (modalFieldContent.textContent = el.value)
        : null;
    }
  });
};

//if validation is success, show modal
const showModalAfterValidation = (e) => {
  e.preventDefault();
  if (form.checkValidity()) {
    handleDataToModal();
    $("#modal").modal("show");
    $(".dissmiss-modal").click(function () {
      $("#modal").modal("hide");
    });
  }
  form.classList.add("was-validated");
};

handleDynamicScript(dynamicScriptSrc);
form.addEventListener("submit", showModalAfterValidation);

