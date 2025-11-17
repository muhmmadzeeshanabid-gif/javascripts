// ===== Step 1 — Select elements =====
const expenseForm = document.querySelector("#expense-form");
const expenseName = document.querySelector("#expense-name");
const expenseAmount = document.querySelector("#expense-amount");
const expenseDate = document.querySelector("#expense-date"); // new date input
const balanceEl = document.querySelector("#balance");
const loanEl = document.querySelector("#loan");
const expenseList = document.querySelector("#expense-list");

// ===== Step 2 — Initial variables =====
let totalAmount = 7000;
let balance = totalAmount;
let loan = 0;
let expenses = [];

// ===== Step 2.1 — Pagination variables =====
let currentPage = 1;
const itemsPerPage = 4;

// ===== Step 2.2 — Load data from LocalStorage =====
function loadData() {
  const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses = savedExpenses;

  const savedTotal = parseFloat(localStorage.getItem("totalAmount"));
  totalAmount = !isNaN(savedTotal) ? savedTotal : totalAmount;

  const savedLoan = parseFloat(localStorage.getItem("loan"));
  loan = !isNaN(savedLoan) ? savedLoan : 0;

  updateBalance();
  renderExpenses();
}
loadData(); // call it on page load

// ===== Step 3 — Form submit listener =====
expenseForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = expenseName.value.trim();
  const amount = parseFloat(expenseAmount.value);
  const date = expenseDate.value; // user-selected date

  if (name === "" || isNaN(amount) || amount <= 0 || date === "") {
    alert("Please enter valid name, amount and date!");
    return;
  }

  if (amount > balance) {
    const loanAmount = amount - balance;
    addExpense(name, balance, loanAmount, date);
  } else {
    addExpense(name, amount, 0, date);
  }

  expenseName.value = "";
  expenseAmount.value = "";
  expenseDate.value = "";
});

// ===== Step 4 — Add expense function =====
function addExpense(name, normalAmount, loanAmount, date) {
  const expense = {
    id: Date.now(),
    name: name,
    amount: normalAmount,
    loanAmount: loanAmount || 0,
    date: date,
  };
  expenses.push(expense);

  if (loanAmount > 0) {
    loan += loanAmount;
  }

  saveData(); // save after every addition
  updateBalance();

  currentPage = Math.ceil(expenses.length / itemsPerPage);
  renderExpenses();
}

// ===== Step 5 — Render expenses function =====
function renderExpenses() {
  expenseList.innerHTML = "";

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedExpenses = expenses.slice(startIndex, endIndex);

  paginatedExpenses.forEach((expense) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${expense.name}: Rs ${expense.amount}${
      expense.loanAmount > 0 ? " + Loan Rs " + expense.loanAmount : ""
    }
      <span style="font-size:0.8em; color:#555">(${expense.date})</span>
    `;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteExpense(expense.id));

    li.appendChild(deleteBtn);
    expenseList.appendChild(li);
  });

  renderPagination();
  updateLoanDisplay();
}

// ===== Step 6 — Update balance function =====
function updateBalance() {
  balance = totalAmount - expenses.reduce((sum, exp) => sum + exp.amount, 0);
  balanceEl.textContent = `Rs ${balance}`;
}

// ===== Step 6.1 — Update loan display =====
function updateLoanDisplay() {
  loanEl.textContent = `Loan Taken: Rs ${loan}`;
}

// ===== Step 7 — Delete expense function =====
function deleteExpense(id) {
  const expToDelete = expenses.find((exp) => exp.id === id);
  if (expToDelete.loanAmount > 0) {
    loan -= expToDelete.loanAmount;
  }

  expenses = expenses.filter((exp) => exp.id !== id);
  saveData();
  updateBalance();

  const totalPages = Math.ceil(expenses.length / itemsPerPage);
  if (currentPage > totalPages) currentPage = totalPages || 1;

  renderExpenses();
}

// ===== Step 8 — Save to LocalStorage =====
function saveData() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  localStorage.setItem("totalAmount", totalAmount);
  localStorage.setItem("loan", loan);
}

// ===== Step 9 — Pagination controls =====
function renderPagination() {
  const paginationDiv = document.querySelector("#pagination");
  paginationDiv.innerHTML = "";

  const totalPages = Math.ceil(expenses.length / itemsPerPage);
  if (totalPages <= 1) return;

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "◀ Prev";
  prevBtn.disabled = currentPage === 1;
  prevBtn.addEventListener("click", () => {
    currentPage--;
    renderExpenses();
  });
  paginationDiv.appendChild(prevBtn);

  const pageInfo = document.createElement("span");
  pageInfo.textContent = ` Page ${currentPage} of ${totalPages} `;
  pageInfo.style.margin = "0 10px";
  paginationDiv.appendChild(pageInfo);

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next ▶";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.addEventListener("click", () => {
    currentPage++;
    renderExpenses();
  });
  paginationDiv.appendChild(nextBtn);
}
