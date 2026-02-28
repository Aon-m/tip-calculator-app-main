export default class Calculator {
  static calculate([amount, percentage, people]) {
    amount = Number(amount);
    people = Number(people);
    percentage = Number(percentage);

    const total = amount * (percentage / 100);
    const tip = total / people;

    return [tip, total];
  }
}
