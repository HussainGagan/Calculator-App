class Calc {
  constructor(prevOperandTextEl, currOperandTextEl) {
    this.prevOperandTextEl = prevOperandTextEl;
    this.currOperandTextEl = currOperandTextEl;
    this.clear();
  }

  clear() {
    this.currOperand = "";
    this.prevOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currOperand = this.currOperand.slice(0, -1);
  }

  appendNum(number) {
    if (number === "." && this.currOperand.includes(".")) return;
    this.currOperand += number.toString();
  }

  chooseOperation(operation) {
    if (this.currOperand === "") return;
    if (this.prevOperand !== "") {
      this.compute();
    }
    this.prevOperand = this.currOperand;
    this.currOperand = "";
    this.operation = operation;
  }

  compute() {
    let ans;
    const prev = parseFloat(this.prevOperand);
    const curr = parseFloat(this.currOperand);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (this.operation) {
      case "+":
        ans = prev + curr;
        break;
      case "-":
        ans = prev - curr;
        break;
      case "x":
        ans = prev * curr;
        break;
      case "/":
        ans = prev / curr;
        break;
      default:
        return;
    }
    this.currOperand = ans.toString();
    this.operation = undefined;
    this.prevOperand = "";
  }

  getDisplayNumber(number) {
    const splitNum = number.split("."); // split the integer part and decimal part
    const integerDigits = parseFloat(splitNum[0]);
    const decimalDigits = splitNum[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits !== undefined) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currOperandTextEl.innerText = this.getDisplayNumber(this.currOperand);
    this.prevOperandTextEl.innerText = `${this.getDisplayNumber(
      this.prevOperand
    )} ${this.operation !== undefined ? this.operation : ""}`;
  }
}

const numBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operation]");
const delBtn = document.querySelector("[data-delete]");
const resetBtn = document.querySelector("[data-reset]");
const equalsBtn = document.querySelector("[data-equals]");
const prevOperandTextEl = document.querySelector(".prev-op");
const currOperandTextEl = document.querySelector(".curr-op");

const calculator = new Calc(prevOperandTextEl, currOperandTextEl);

numBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    calculator.appendNum(btn.innerText);
    calculator.updateDisplay();
  });
});

operationBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    calculator.chooseOperation(btn.innerText);
    calculator.updateDisplay();
  });
});

resetBtn.addEventListener("click", function () {
  calculator.clear();
  calculator.updateDisplay();
});

delBtn.addEventListener("click", function () {
  calculator.delete();
  calculator.updateDisplay();
});

equalsBtn.addEventListener("click", function () {
  calculator.compute();
  calculator.updateDisplay();
});

////////////////////////////////////////////////////
//* CHANGE THEME

const triStateContainerEl = document.querySelector(".tri-state-toggle");
const toggleBtns = triStateContainerEl.querySelectorAll(".toggle-btn");
const root = document.querySelector(":root");

// prettier-ignore
const properties = ["--main-background-color","--keypad-background-color","--screen-background-color","--del-reset-key-bg-color","--del-reset-key-bg-color-hover","--del-reset-key-shadow-color","--equal-key-bg-color","--equal-key-bg-color-hover","--equal-key-shadow-color","--key-bg-color","--key-bg-color-hover","--key-shadow-color","--text-color","--text-color-num","--text-color-prev-op","--text-color-equal-btn"]

// prettier-ignore
const theme1 = ["hsl(222, 26%, 31%)","hsl(223, 31%, 20%)","hsl(224, 36%, 15%)","hsl(225, 21%, 49%)",
"hsl(224, 76%, 80%)","hsl(224, 28%, 35%)","hsl(6, 63%, 50%)","hsl(6, 99%, 67%)","hsl(6, 70%, 34%)",
"hsl(30, 25%, 89%)", "hsl(0, 0%, 100%)", "hsl(28, 16%, 65%)", "hsl(0, 0%, 100%)",
"hsl(221, 14%, 31%)","#ccc","hsl(0, 0%, 100%)"]

// prettier-ignore
const theme2 = ["hsl(0, 0%, 90%)","hsl(0, 5%, 81%)","hsl(0, 0%, 93%)","hsl(185, 42%, 37%)","hsl(185, 64%, 65%)","hsl(185, 58%, 25%)","hsl(25, 98%, 40%)","hsl(25, 74%, 63%)","hsl(25, 99%, 27%)","hsl(45, 7%, 89%)","hsl(0, 0%, 100%)","hsl(35, 11%, 61%)","hsl(60, 10%, 19%)","hsl(60, 10%, 19%)","#666",
"hsl(0, 0%, 100%)"]

// prettier-ignore
const theme3 = ["hsl(268, 75%, 9%)", "hsl(268, 71%, 12%)" ,"hsl(268, 71%, 12%)",
"hsl(281, 89%, 26%)", "hsl(281, 77%, 44%)", "hsl(285, 91%, 52%)", "hsl(176, 100%, 44%)",
"hsl(176, 88%, 74%)", "hsl(177, 92%, 70%)", "hsl(268, 47%, 21%)", "hsl(268, 72%, 58%)",
"hsl(290, 70%, 36%)", "hsl(52, 100%, 62%)", "hsl(52, 100%, 62%)", "hsl(52, 75%, 78%)", "hsl(198, 20%, 13%)"];

const changeTheme = function (themeNum) {
  // prettier-ignore
  if (themeNum === "1") {
    properties.forEach((property,i) => {
      root.style.setProperty(property,theme1[i])
    })
  } else if (themeNum === "2") {
    properties.forEach((property,i) => {
      root.style.setProperty(property,theme2[i])
    })

  } else {
    properties.forEach((property,i) => {
      root.style.setProperty(property,theme3[i])
    })
  }
};

triStateContainerEl.addEventListener("click", function (e) {
  const btnEl = e.target.closest(".toggle-btn");
  if (!btnEl) return;
  toggleBtns.forEach((btn) => {
    btn.classList.remove("active");
  });
  const theme = btnEl.dataset.theme;
  changeTheme(theme);
  document
    .querySelector(`.toggle-btn[data-theme="${theme}"]`)
    .classList.add("active");
});
