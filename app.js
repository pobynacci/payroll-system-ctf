/*
 * Northstar Payroll Portal — INTENTIONALLY VULNERABLE CTF EXERCISE
 * Finding: CWE-798, Use of Hard-coded Credentials
 * WARNING: Never copy this login mechanism into a real application.
 */

// TODO(legacy): Move these accounts to a secure server-side identity provider.
// CTF OBJECTIVE: Inspect the website's JavaScript and find the payroll admin login.
const PAYROLL_USERS = [
  {
    username: "employee01",
    password: "Employee123!",
    displayName: "Alex Rivera",
    role: "employee"
  },
  {
    username: "payroll_admin",
    password: "Payroll@2026!",
    displayName: "Payroll Administrator",
    role: "admin"
  }
];

// Fictional payslips: not connected to any real payroll service.
const SAMPLE_PAYSLIPS = [
  { employee: "Alex Rivera", period: "October 2026", gross: 45000, net: 38420 },
  { employee: "Jordan Cruz", period: "October 2026", gross: 52000, net: 44310 },
  { employee: "Taylor Santos", period: "October 2026", gross: 48000, net: 41050 }
];

// Static-only demo limitation: a technical participant can also extract the flag
// directly from this public JS file. Use a server-side flag check for scored events.
const CHALLENGE_FLAG = "CTF{SOURCE_CODE_SECRETS_ARE_NOT_SECRET}";

const loginView = document.getElementById("login-view");
const dashboardView = document.getElementById("dashboard-view");
const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");
const payrollRows = document.getElementById("payroll-rows");
const adminPanel = document.getElementById("admin-panel");

const peso = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 2
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  // INTENTIONAL BUG: Privileged credentials embedded in downloadable source code.
  const account = PAYROLL_USERS.find(
    (user) => user.username === username && user.password === password
  );

  if (!account) {
    loginError.textContent = "Invalid username or password.";
    return;
  }

  loginError.textContent = "";
  document.getElementById("password").value = "";
  displayDashboard(account);
});

function displayDashboard(account) {
  loginView.classList.add("hidden");
  dashboardView.classList.remove("hidden");
  document.getElementById("greeting").textContent = `Signed in as ${account.displayName}`;
  document.getElementById("role-label").textContent = account.role === "admin" ? "ADMINISTRATOR VIEW" : "EMPLOYEE VIEW";

  // Display all fictional employees to admin; only their own record to staff.
  const records = account.role === "admin"
    ? SAMPLE_PAYSLIPS
    : SAMPLE_PAYSLIPS.filter((record) => record.employee === account.displayName);

  payrollRows.replaceChildren();
  for (const record of records) {
    const tr = document.createElement("tr");
    for (const value of [record.employee, record.period, peso.format(record.gross), peso.format(record.net)]) {
      const td = document.createElement("td");
      td.textContent = value;
      tr.appendChild(td);
    }
    payrollRows.appendChild(tr);
  }

  adminPanel.classList.toggle("hidden", account.role !== "admin");
  document.getElementById("ctf-flag").textContent = account.role === "admin" ? CHALLENGE_FLAG : "";
}

document.getElementById("logout-button").addEventListener("click", () => {
  dashboardView.classList.add("hidden");
  loginView.classList.remove("hidden");
  loginForm.reset();
  loginError.textContent = "";
  document.getElementById("username").focus();
});
