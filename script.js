const calculator = document.querySelector(".calculator");
const keys = document.querySelector(".calculator__keys");
const display = document.querySelector(".calculator__display");

keys.addEventListener("click", (e) => {
  //config
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;
    //usuwanie podswietlenia
    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove("is-depressed")
    );

    ////////////////////////////////////numer
    if (!action) {
      if (displayedNum === "0" || previousKeyType === "operator") {
        display.textContent = keyContent;
      } else {
        display.textContent = display.textContent + keyContent;
      }
      calculator.dataset.previousKeyType = "number";
    }
    //////////////////////////////////operator
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      console.log(`-----------------------------------------------`);
      let firstValue = calculator.dataset.firstValue; //zapisuje wartosc przed zmiana
      let operator = calculator.dataset.operator; // operator config
      console.log(operator);
      console.log(action);
      let secondValue = displayedNum; // wartosc wyswietlana
      console.log(`firstValue=${firstValue}, secondValue=${secondValue}.`);
      if (previousKeyType === "calculate") {
        // jezeli wczesniej byl '=' usuwam firstValue
        firstValue = "";
        console.log(`Ustawilem firstValue na undefined`);
      }
      console.log(
        `jesli mam firstValue i opearatora to przechodze do obliczeń`
      );

      if (previousKeyType === "operator") {
        // jezeli wczesniej byl operator
        if (operator === action) {
          //kozacki w chuj ruch gratuluje sobie
          firstValue = displayedNum;
        } else {
          firstValue = "";
        }
        console.log(`zmieniam firstValue na ${firstValue}`);
        secondValue = calculator.dataset.modValue;
        console.log(`zmieniam secondValue na ${secondValue}`); //nadpisuje secondValue atrybutem
      }
      if (firstValue && operator) {
        console.log(`wykonuje obliczenia`);
        display.textContent = calculate(firstValue, operator, secondValue);
        console.log(`Operator to ${operator}, Action to ${action}`);
        console.log(`Wynik to ${display.textContent}`);
      } else {
        console.log(`nie mam firstValue lub operatora -> brak obliczen`); //secondValue bedzie zawsze (wartosc wyswietlana)
      }
      //dodanie podswietlenia
      key.classList.add("is-depressed");
      //ustawienie klasy na operator
      calculator.dataset.previousKeyType = "operator";
      //przechowanie wyswietlanego numeru przed jego zmiana
      calculator.dataset.firstValue = display.textContent;
      console.log(
        `nowa wartosć firstValue to ${calculator.dataset.firstValue}`
      );
      //przechowanie znaku operacyjnego (action)
      calculator.dataset.operator = action;
      console.log(
        `nowa wartosc operatora action to ${calculator.dataset.operator}`
      );
      console.log(`-----------------------------------------------`);
      // moValue atrybut
      calculator.dataset.modValue = secondValue;
      console.log(`Zapisuje ${secondValue} jako moValue`);
    }
    ////////////////////////////////kropka
    if (action === "decimal") {
      //jezeli mamy juz kropke, nic nie rob
      if (!display.textContent.includes("."))
        display.textContent = displayedNum + ".";
      //jezeli poprzednio nacisnieto znak funkcyjny wstaw 0.
      if (previousKeyType === "operator") {
        display.textContent = "0.";
      }
      ////ustawienie klasy na decimal
      calculator.dataset.previousKey = "decimal";
    }
    ////////////////////////////////wyczysc
    if (action === "clear") {
      if (key.textContent === "CE") {
        calculator.dataset.firstValue = "";
        firstValue = "";
        calculator.dataset.modValue = "";
        calculator.dataset.operator = "";
        calculator.dataset.previousKeyType = "";
      } else {
        key.textContent = "AC";
      }

      display.textContent = 0;
      key.textContent = "AC";
      calculator.dataset.previousKeyType = "clear";
    }
    if (action !== "clear") {
      const clearButton = calculator.querySelector("[data-action=clear]");
      clearButton.textContent = "CE";
    }
    ////////////////////////////////////równa sie
    if (action === "calculate") {
      let firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      let secondValue = displayedNum;

      if (firstValue) {
        if (previousKeyType === "calculate") {
          firstValue = displayedNum;
          secondValue = calculator.dataset.modValue;
        }

        display.textContent = calculate(firstValue, operator, secondValue);
      }

      // Set modValue attribute
      calculator.dataset.modValue = secondValue;
      calculator.dataset.previousKeyType = "calculate";
    }
  }
});
const calculate = (n1, operator, n2) => {
  let result = "";

  if (operator === "add") {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (operator === "subtract") {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (operator === "multiply") {
    result = parseFloat(n1) * parseFloat(n2);
  } else if (operator === "divide") {
    result = parseFloat(n1) / parseFloat(n2);
  }

  return result;
};
