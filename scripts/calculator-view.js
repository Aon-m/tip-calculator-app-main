export default class CalculatorView {
  constructor() {
    this.buttons = document.querySelectorAll("button");
    this.tip = document.querySelector("#tip-amount");
    this.total = document.querySelector("#total");
    this.errors = document.querySelectorAll(".error__message");
  }

  updateOutput(tip, total) {
    this.tip.textContent = tip.toFixed(2);
    this.total.textContent = total.toFixed(2);
  }

  onClick(handler) {
    this.buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.select(btn);
        handler(btn.textContent.trim());
      });
    });
  }

  clear() {
    this.tip.textContent = "0.00";
    this.total.textContent = "0.00";
  }

  select(button) {
    this.buttons.forEach((btn) => {
      btn.classList.remove("button--selected");
      btn.setAttribute("aria-checked", "false");
    });

    button.classList.add("button--selected");
    button.setAttribute("aria-checked", "true");
  }

  deselect() {
    this.buttons.forEach((btn) => {
      btn.classList.remove("button--selected");
      btn.setAttribute("aria-checked", "false");
    });
  }

  error(input, index) {
    input.classList.add("error__input");

    this.errors[index].classList.remove("hidden");
  }

  fixedError(input, index) {
    input.classList.remove("error__input");

    this.errors[index].classList.add("hidden");
  }
}
