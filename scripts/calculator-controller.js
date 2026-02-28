import Calculator from "./calculator-engine.js";
import CalculatorView from "./calculator-view.js";

class CalculatorController {
  constructor() {
    this.percentage;
    this.bill = document.querySelector("#bill");
    this.people = document.querySelector("#people");
    this.custom = document.querySelector(".form__input--custom");
    this.view = new CalculatorView();
    this.view.onClick((value) => this.handleButton(value));
    this.handleInput();
  }

  handleButton(value) {
    if (value.toLowerCase().trim() === "reset") return this.reset();

    const number = value.match(/\d+/g);
    this.percentage = Number(number[0]);
    this.custom.value = "";
    this.calculate();
  }

  handleInput() {
    this.bill.addEventListener("input", () => this.calculate());
    this.people.addEventListener("input", () => this.calculate());

    this.custom.addEventListener("input", () => {
      if (this.custom.value.length > 3) {
        this.custom.value = this.custom.value.slice(0, 3);
      }
      this.percentage = this.custom.value;

      this.calculate();
    });
    this.custom.addEventListener("click", () => {
      this.view.deselect();
    });
  }

  calculate() {
    if (!this.validation()) return;

    const [tip, total] = Calculator.calculate([
      this.bill.value,
      this.percentage,
      this.people.value,
    ]);

    this.fixAllError();
    this.view.updateOutput(tip, total);
  }

  validation() {
    const bill = this.bill.value;
    const people = this.people.value;

    switch (true) {
      case Number(bill) === 0 && people === "":
        this.view.error(this.bill, 0);
        return false;
      case Number(people) === 0 && bill === "":
        this.view.error(this.people, 1);
        return false;
      case bill === "" && people === "":
        return false;
      case Number(bill) === 0 && Number(people) !== 0:
        this.view.error(this.bill, 0);
        return false;
      case Number(people) === 0 && Number(bill) !== 0:
        this.view.error(this.people, 1);
        return false;
      case Number(people) === 0 && Number(bill) === 0:
        this.view.error(this.bill, 0);
        this.view.error(this.people, 1);
        return false;
    }
    switch (true) {
      case bill > 0 && people > 0:
        this.fixAllError();
        break;
      case bill > 0 && people === 0:
        this.view.fixedError(this.bill, 0);
        break;
      case people > 0 && bill === 0:
        this.view.fixedError(this.people, 1);
        break;
    }

    if (this.percentage !== undefined && bill > 0 && people > 0) {
      return true;
    }
  }

  reset() {
    this.bill.value = "";
    this.people.value = "";
    this.custom.value = "";
    this.view.clear();
  }

  fixAllError() {
    this.view.fixedError(this.bill, 0);
    this.view.fixedError(this.people, 1);
  }
}

export default CalculatorController;
