const intlLanguage = 'en-US';
const $ = (selector, context = document) => {
  if (selector.startsWith("#") && !selector.includes(" ")) {
    return context.getElementById(selector.slice(1));
  }
  const elements = context.querySelectorAll(selector);
  return new Proxy(elements.length === 1 ? elements[0] : elements, {
    get(target, prop) {
      if (typeof prop === "string" && prop in document.createElement("div")) {
        return (...args) => {
          target.forEach
            ? target.forEach(el => el[prop](...args))
            : target[prop](...args);
          return target;
        };
      }
      return target[prop] || (() => target);
    }
  });
};

// Add hide class for error-msg element

function calculateProfit() {
  let quantity = parseFloat($('#quantity').value);
  let buyPrice = parseFloat($('#buyPrice').value);
  let sellPrice = parseFloat($('#sellPrice').value);
  let sellQuantity = parseFloat($('#sellQuantity').value);

  if (isNaN(quantity) || isNaN(buyPrice) || isNaN(sellPrice) || isNaN(sellQuantity)) {
    $('#stock-profit').innerText = "";
    return;
  }

  if (quantity < sellQuantity) {
    $('#sell-quantity-error').classList.remove('hide');
    $('#sell-quantity-error').classList.add('show');
    return;
  } else {
    $('#sell-quantity-error').classList.add('hide');
    $('#sell-quantity-error').classList.remove('show');
  }

  let profitPerShare = sellPrice - buyPrice;
  let totalProfit = profitPerShare * sellQuantity;
  let remainingShares = quantity - sellQuantity;
  let remainingAmount = remainingShares * sellPrice;
  let totalOwnedValue = quantity * sellPrice;
  let totalSoldValue = sellQuantity * sellPrice;

  let profitOrLossText = totalProfit >= 0 ? `<span class="green"> Total Profit: ${profitPerShare} * ${sellQuantity} = ${totalProfit} </span>` : `<span class="red"> Total Loss: ${profitPerShare} * ${sellQuantity} = ${Math.abs(totalProfit)}</span>`;

  $('#stock-profit').innerHTML =
    `Total Shares Value:<span>${quantity} * ${sellPrice}  </span>  = <b>${totalOwnedValue.toLocaleString(intlLanguage)}</b> </br>` +
    `Total Sold Value: <span>${sellQuantity} * ${sellPrice} </span> = <b>${totalSoldValue.toLocaleString(intlLanguage)}</b> </br>` +
    `Remaining Shares Value:<span> ${remainingShares} * ${sellPrice} </span> = <b> ${remainingAmount.toLocaleString(intlLanguage)} </b> </br>` +
    `<b> ${profitOrLossText} </b>`;
}

function clearStockProfitFields() {
  $('#quantity').value = '';
  $('#buyPrice').value = '';
  $('#sellPrice').value = '';
  $('#sellQuantity').value = '';
  $('#result').innerText = '';
}

function unitChanged(id, error) {
  const unit1 = $("#units1").value;
  const price1 = $("#Price1").value;
  const unit2 = $("#units2").value;
  const price2 = $("#Price2").value;

  if (unit1 != '' && price1 != '' && unit2 != '' && price2 != '') {
    getAverage();
  }

  if ($(id).value != '') {
    $(error).innerHTML = '';
    return;
  } else {
    $(error).innerHTML = 'Field is Required';
  }
}

function getAverage() {

  if ($("#units1").value == '') {
    $("#error1").innerHTML = "Units required";
    return;
  } else if ($("#Price1").value == '') {
    $("#error2").innerHTML = "Price required";
    return;
  } else if ($("#units2").value == '') {
    $("#error3").innerHTML = "Units required";
    return;
  } else if ($("#Price2").value == '') {
    $("#error4").innerHTML = "Price required";
    return;
  }

  var unit1 = $("#units1").value;
  var price1 = $("#Price1").value;
  var unit2 = $("#units2").value;
  var price2 = $("#Price2").value;

  var totalAmount = Number(((unit1 * price1) + (unit2 * price2)).toFixed(2));
  var totalUnits = +unit1 + +unit2;
  var averagePrice = Number((((unit1 * price1) + (unit2 * price2)) / totalUnits).toFixed(2));
  $("#investedamount1").innerHTML = "<span>The amount invested in the 1st purchase: </span>  <span class='unit-amount'>" + (unit1 * price1).toLocaleString(intlLanguage) + "</span>";
  $("#investedamount2").innerHTML = "<span>The amount invested in the 2nd purchase: </span> <span class='unit-amount'>" + (unit2 * price2).toLocaleString(intlLanguage) + "</span>";
  $("#result").innerHTML = "<span>Total units </span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<bold>"
    + totalUnits + "</bold><br/><br/><span>Average Price</span> &nbsp;&nbsp;&nbsp;<bold>" + averagePrice.toLocaleString(intlLanguage) + "</bold>"
    + "<br/><br/><span>Total Amount</span> &nbsp;&nbsp;&nbsp;<bold>"
    + totalAmount.toLocaleString(intlLanguage) + "</bold>";
}

function updateInput(inputId, sliderId) {
  // Update input value when slider is moved
  var sliderValue = $(sliderId).value;
  $(inputId).value = sliderValue;
}

function clearFields() {
  $("#units1").value = '';
  $("#Price1").value = '';
  $("#units2").value = '';
  $("#Price2").value = '';
  // $("#slider1").value = 0;
  // $("#slider2").value = 0;
  $("#result").innerHTML = '';
  $("#investedamount1").innerHTML = '';
  $("#investedamount2").innerHTML = '';
}

// Get all anchor elements with class 'link'
//  var links = $('.link');

//  // Loop through each link and attach event listener
//  links.forEach(function(link) {
//    link.addEventListener('click', function(event) {
//      // Prevent the default action (routing to the href)
//      event.preventDefault();

//      // Your custom logic here
//      console.log('Anchor link clicked, but default routing prevented.');
//    });
//  });


function activeSection(value) {
  if (isMobile() || window.innerWidth < 768) {
    var sidebar = $('#sidebar');
    sidebar.style.left = '-500px';
  }
}

function sipCalculator() {
  var investment = parseInt($("#investment").value);
  var rateOfInterest = parseInt($("#rateOfInterest").value);
  var years = parseInt($("#years").value);
  var rateIncrease = parseInt($("#rateIncrease").value);

  var monthlyRate = rateOfInterest / 12 / 100;
  var totalMonths = years * 12;
  var futureValue = 0;
  var totalInvestment = 0;
  var currentAmount = investment;
  rateIncrease = rateIncrease ? rateIncrease : 0;

  for (var i = 0; i < totalMonths; i++) {
    futureValue += currentAmount;
    totalInvestment += currentAmount;
    futureValue *= (1 + monthlyRate);
    if ((i + 1) % 12 == 0) {
      currentAmount *= (1 + (rateIncrease / 100));
    }
  }
  var totalProfit = futureValue - totalInvestment;
  if (investment && rateOfInterest && years) {
    $("#im").innerHTML = Number((totalInvestment).toFixed(2)).toLocaleString(intlLanguage);
    $("#tm").innerHTML = Number(futureValue.toFixed(2)).toLocaleString(intlLanguage);
    $("#gm").innerHTML = Number(totalProfit.toFixed(2)).toLocaleString(intlLanguage);
    if (sipChart) {
      sipChart.destroy();
    }
    getSipChart(futureValue.toFixed(2), totalInvestment.toFixed(2), totalProfit.toFixed(2));
  }
}

function getSipChart(t, i, g) {
  var ctx = $('#sipChart');
  sipChart = new Chart(ctx, {
    type: 'pie',
    responsive: true,
    data: {
      labels: ['Expected Amount', 'Amount Invested', 'Total Gain'],
      datasets: [{
        label: 'SIP',
        data: [t, i, g],
        borderWidth: 1
      }]
    }
  });
}

function clearFields1() {
  $("#investment").value = '';
  $("#rateOfInterest").value = '';
  $("#rateIncrease").value = '';
  $("#years").value = '';
  $("#tm").innerHTML = '0';
  $("#im").innerHTML = '0';
  $("#gm").innerHTML = '0';
  if (sipChart) {
    sipChart.destroy();
  }
}

function clearFields2() {
  $("#loanAmount").value = '';
  $("#interestRate").value = '';
  $("#loanTerm").value = '';
  $("#total-emi").innerHTML = '0';
  $("#total-principal").innerHTML = 0;
  $("#total-interest").innerHTML = 0;
  $("#total-amount").innerHTML = 0;
  if (emiChart) {
    emiChart.destroy();
  }

}

function clearAllFields(fieldIds) {
  fieldIds.forEach(id => {
    const element = $(id);
    if (element) {
      if (element.tagName === "INPUT") {
        element.value = ''; // Clear input fields
      } else {
        element.innerHTML = '0'; // Clear non-input elements like div or span
      }
    }
  });
}

function checkPercentage() {
  let num = Number($("#percentageNumber").value);
  let percent = Number($("#percentage").value);
  let result = $("#percentageResult");

  if (num == '' || percent == '' || num == 0 || percent == 0) {
    return;
  }

  let finalNum = (num / 100) * percent;

  result.innerHTML = percent + " Percentage(%) of " + num + " is = " + finalNum.toFixed(2);
}

var emiChart, sipChart;
function calculateEMI() {
  let loanAmount = Number($('#loanAmount').value);
  let interestRate = Number($('#interestRate').value / 100 / 12); // Monthly interest rate
  let loanTerm = Number($('#loanTerm').value);

  // EMI calculation formulacagr-calcultorclearFields3
  let emi = loanAmount * interestRate * Math.pow((1 + interestRate), loanTerm) / (Math.pow((1 + interestRate), loanTerm) - 1);
  let totalInterest = (emi * loanTerm) - loanAmount;
  let totalPayment = totalInterest + loanAmount;

  if (loanAmount && interestRate && loanTerm) {
    $('#total-principal').textContent = '' + Number(loanAmount.toFixed(0)).toLocaleString(intlLanguage);
    $('#total-emi').textContent = '' + Number(emi.toFixed(0)).toLocaleString(intlLanguage);
    $('#total-amount').textContent = '' + Number(totalPayment.toFixed(0)).toLocaleString(intlLanguage);
    $('#total-interest').textContent = '' + Number(totalInterest.toFixed(0)).toLocaleString(intlLanguage);
    if (emiChart) {
      emiChart.destroy();
    }
    getChart(loanAmount, totalInterest, totalPayment);
  }

}

function getChart(p, i, t) {
  var ctx = $('#myChart');
  emiChart = new Chart(ctx, {
    type: 'pie',
    responsive: true,
    data: {
      labels: ['Principal', 'Total Interest', 'Total Amount'],
      datasets: [{
        label: 'Loan breakup',
        data: [p, i, t],
        borderWidth: 1
      }]
    }
  });
}

function calculateCAGR() {
  var initialValue = parseFloat($('#initialValue').value);
  var finalValue = parseFloat($('#finalValue').value);
  var years = parseFloat($('#cagryears').value);

  if (isNaN(initialValue) || isNaN(finalValue) || isNaN(years)) {
    // alert('Please enter valid values for all fields.');
    return;
  }

  var cagr = ((finalValue / initialValue) ** (1 / years)) - 1;
  var cagrPercentage = cagr * 100;

  $('#cagr-result').innerHTML = cagrPercentage.toFixed(2) + '%';
}

function calculateSWP() {
  var initialValue = parseFloat($('#swpInvestment').value);
  var monthlyWithdrawal = parseFloat($('#monthlyWithdrawal').value);
  var annualInterestRate = parseFloat($('#annualInterestRate').value);
  var months = parseFloat($('#swpMonths').value);

  if (isNaN(initialValue) || isNaN(monthlyWithdrawal) || isNaN(annualInterestRate) || isNaN(months)) {
    // alert('Please enter valid values for all fields.');
    return;
  }

  var monthlyInterestRate = annualInterestRate / (12 * 100);
  var finalValue = initialValue;
  var totalWithdrawn = 0;

  for (var i = 0; i < months; i++) {
    finalValue = finalValue * (1 + monthlyInterestRate) - monthlyWithdrawal;
    totalWithdrawn += monthlyWithdrawal;
  }

  $('#swp-result').innerHTML = 'Final value after ' + months + ' Months: ' + finalValue.toFixed(2) + '<br/>' +
    '<p>Total amount withdrawn: ' + totalWithdrawn.toFixed(2) + '</p>';
}

function updateClock() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var meridiem = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  hours = hours % 12 || 12;

  // Add leading zero if needed
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  var timeString = `${hours}:${minutes}:${seconds} ${meridiem}`;

  if ($('#clock')) {
    $('#clock').innerText = timeString;
  }
}

// Update the clock every second
setInterval(updateClock, 999);

// Initial call to display the clock immediately
// updateClock();

$('#toggle-btn').addEventListener('click', function () {
  var sidebar = $('#sidebar');
  $('#hamburger').classList.toggle("active");
  if (sidebar.style.left != '0px') {
    sidebar.style.left = '0px';
  } else {
    sidebar.style.left = '-500px';
  }
});

function isMobile() {
  return /Android|webOS|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Example usage:

// Function to toggle dark mode
function toggleDarkMode() {
  const body = document.querySelector('body');
  body.classList.toggle('dark-mode');

  // Save mode preference to local storage
  const isDarkMode = body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
}

// Check if dark mode preference is saved in local storage
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'true') {
  document.querySelector('body').classList.add('dark-mode');
  $('#darkModeSwitch').checked = true;
}

if ($('#darkModeSwitch')) {
  $('#darkModeSwitch').addEventListener('change', toggleDarkMode);
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => {
      console.log('Text copied to clipboard: ' + text);
      // You can also show a success message here if needed
    })
    .catch(err => {
      console.error('Unable to copy text to clipboard: ', err);
      // Handle errors, such as browser not supporting clipboard API
    });
}

const loadAds = async (url, targetElementId) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch snippet: ${response.statusText}`);
    }
    const html = await response.text();
    const targetClass = $(targetElementId);
    targetClass.forEach(function (element) {
      element.innerHTML = html;
    });
  } catch (error) {
    console.error(error);
    // document.getElementsByClassName(targetElementId).innerText = "Error loading content.";
  }
};
