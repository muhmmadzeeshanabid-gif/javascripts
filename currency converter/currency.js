// Updated Currency Converter (With More Countries

const countryData = {
  AED: { code: "AE", name: "United Arab Emirates" },
  AFN: { code: "AF", name: "Afghanistan" },
  ARS: { code: "AR", name: "Argentina" },
  AUD: { code: "AU", name: "Australia" },
  BDT: { code: "BD", name: "Bangladesh" },
  BRL: { code: "BR", name: "Brazil" },
  CAD: { code: "CA", name: "Canada" },
  CHF: { code: "CH", name: "Switzerland" },
  CNY: { code: "CN", name: "China" },
  DKK: { code: "DK", name: "Denmark" },
  EGP: { code: "EG", name: "Egypt" },
  EUR: { code: "FR", name: "France" },
  GBP: { code: "GB", name: "United Kingdom" },
  HKD: { code: "HK", name: "Hong Kong" },
  IDR: { code: "ID", name: "Indonesia" },
  ILS: { code: "IL", name: "Israel" },
  INR: { code: "IN", name: "India" },
  IQD: { code: "IQ", name: "Iraq" },
  IRR: { code: "IR", name: "Iran" },
  ITL: { code: "IT", name: "Italy" },
  JPY: { code: "JP", name: "Japan" },
  KES: { code: "KE", name: "Kenya" },
  KRW: { code: "KR", name: "South Korea" },
  KWD: { code: "KW", name: "Kuwait" },
  LKR: { code: "LK", name: "Sri Lanka" },
  MAD: { code: "MA", name: "Morocco" },
  MYR: { code: "MY", name: "Malaysia" },
  NGN: { code: "NG", name: "Nigeria" },
  NOK: { code: "NO", name: "Norway" },
  NPR: { code: "NP", name: "Nepal" },
  NZD: { code: "NZ", name: "New Zealand" },
  OMR: { code: "OM", name: "Oman" },
  PHP: { code: "PH", name: "Philippines" },
  PKR: { code: "PK", name: "Pakistan" },
  PLN: { code: "PL", name: "Poland" },
  PSE: { code: "PS", name: " Plaestin" },
  QAR: { code: "QA", name: "Qatar" },
  RUB: { code: "RU", name: "Russia" },
  SAR: { code: "SA", name: "Saudi Arabia" },
  SEK: { code: "SE", name: "Sweden" },
  SGD: { code: "SG", name: "Singapore" },
  THB: { code: "TH", name: "Thailand" },
  TRY: { code: "TR", name: "Turkey" },
  TWD: { code: "TW", name: "Taiwan" },
  USD: { code: "US", name: "United States" },
  UZS: { code: "UZ", name: "Uzbekistan" },
  VND: { code: "VN", name: "Vietnam" },
  ZAR: { code: "ZA", name: "South Africa" },
};

// DOM elements
const fromCurrency = document.querySelector("#from");
const toCurrency = document.querySelector("#to");
const fromFlag = document.querySelector("#from-flag");
const toFlag = document.querySelector("#to-flag");
const amountInput = document.querySelector("#amount");
const convertBtn = document.querySelector("#convert");
const result = document.querySelector("#result");

// Populate dropdowns
for (let curr in countryData) {
  const { code, name } = countryData[curr];

  const option1 = document.createElement("option");
  option1.value = curr;
  option1.textContent = `${name} (${curr})`;
  fromCurrency.append(option1);

  const option2 = document.createElement("option");
  option2.value = curr;
  option2.textContent = `${name} (${curr})`;
  toCurrency.append(option2);
}

// Default values
fromCurrency.value = "USD";
toCurrency.value = "PKR";
updateFlag(fromCurrency, fromFlag);
updateFlag(toCurrency, toFlag);

// Flag update function
function updateFlag(selectElement, imgElement) {
  const code = countryData[selectElement.value].code;
  imgElement.src = `https://flagsapi.com/${code}/flat/64.png`;
}

// Update flag on change
fromCurrency.addEventListener("change", () =>
  updateFlag(fromCurrency, fromFlag)
);
toCurrency.addEventListener("change", () => updateFlag(toCurrency, toFlag));

// Convert function
async function convertCurrency() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amount = parseFloat(amountInput.value);

  if (!amount) {
    alert("Please enter an amount");
    return;
  }

  try {
    const url = `https://open.er-api.com/v6/latest/${from}`;
    const res = await fetch(url);
    const data = await res.json();

    const rate = data.rates[to];
    const converted = (amount * rate).toFixed(2);

    result.textContent = `${amount} ${from} = ${converted} ${to}`;
  } catch (error) {
    result.textContent = "Error fetching data!";
    console.error(error);
  }
}

// Button + Enter event
convertBtn.addEventListener("click", convertCurrency);
amountInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") convertCurrency();
});
