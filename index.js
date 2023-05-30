const bill = document.getElementById("bill");
const numOfPeople = document.getElementById("numOfPeople");
const tipPerPerson = document.getElementById("tipPerPerson");
let preBuiltTips = document.querySelectorAll(".tip");
let customTipBox = document.getElementById("customTip");
let totalPerPerson = document.getElementById("totalPerPerson");
const resetBtn = document.getElementById("resetBtn");
const errorMsg = document.getElementById('errorMsg')
let billPerPerson;
let tip;
let customTip;
let tipAmount;
let tipPerPersonAmount;

const resetTipPercentage = () => {
  preBuiltTips.forEach((button) => {
    button.classList.remove("clicked");
  });
  customTipBox.value = "";
};

const resetTipPrice = () => {
  tipPerPerson.textContent = "$0.00";
  totalPerPerson.textContent = "$0.00";
};

const resetInputPrice = () => {
  numOfPeople.value = "";
  bill.value = "";
};
preBuiltTips.forEach(function (tipBtn) {
  tipBtn.addEventListener("click", function (e) {
    resetTipPercentage();
    e.target.classList.add("clicked");
  });
});

function calculateTip() {
  customTip = customTipBox.value;
  if (customTip != "") {
    try {
      tip = Number(customTip);
    } catch (error) {
      console.log(error);
    }
  } else if (customTip === "") {
    const clickedTipBtn = document.querySelector(".clicked");
    tip = Number(clickedTipBtn?.value ?? 0);
  } 
  tipAmount = parseFloat(((tip / 100) * Number(bill.value)).toFixed(2));
  tipPerPersonAmount = parseFloat((tipAmount / numOfPeople.value).toFixed(2));
  tipPerPerson.textContent = "$" + tipPerPersonAmount;
}

function calculateBill() {
  billPerPerson = parseFloat(
    (
      Number(bill.value) / Number(numOfPeople.value) +
      tipPerPersonAmount
    ).toFixed(2)
  );
  totalPerPerson.textContent = "$" + billPerPerson;
}

const resetCalculator = () => {
  resetTipPercentage();
  resetTipPrice();
  resetInputPrice();
};

resetBtn.addEventListener("click", resetCalculator);

window.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    if (numOfPeople.value) {
      numOfPeople.classList.remove("zero-people-error");
      errorMsg.style.visibility = 'hidden'
      calculateTip();
      calculateBill();
    } else {
      numOfPeople.classList.add("zero-people-error");
      errorMsg.style.visibility = 'visible'
    }
  }
});
