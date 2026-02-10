// ------------------ DOM REFERENCES ------------------
const form = document.getElementById('studentForm');
const tableBody = document.getElementById('studentTable');

let students = JSON.parse(localStorage.getItem('students')) || [];
let editIndex = null;

// ------------------ RENDER TABLE ------------------
function renderTable() {
  tableBody.innerHTML = '';

  students.forEach((student, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.id}</td>
      <td>${student.email}</td>
      <td>${student.contact}</td>
      <td>
        <button class="action-btn edit" onclick="editStudent(${index})">Edit</button>
        <button class="action-btn delete" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });

  localStorage.setItem('students', JSON.stringify(students));
}

// ------------------ VALIDATION ------------------
function validate(name, id, email, contact) {
  const nameRegex = /^[A-Za-z ]+$/;
  const idRegex = /^\d+$/;
  const contactRegex = /^\d{10,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    nameRegex.test(name) &&
    idRegex.test(id) &&
    emailRegex.test(email) &&
    contactRegex.test(contact)
  );
}

// ------------------ ADD / UPDATE ------------------
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const id = document.getElementById('studentId').value.trim();
  const email = document.getElementById('email').value.trim();
  const contact = document.getElementById('contact').value.trim();

  if (!name || !id || !email || !contact) {
    alert('All fields are required');
    return;
  }

  if (!validate(name, id, email, contact)) {
    alert('Invalid input values');
    return;
  }

  const studentData = { name, id, email, contact };

  if (editIndex === null) {
    students.push(studentData);
  } else {
    students[editIndex] = studentData;
    editIndex = null;
  }

  form.reset();
  renderTable();
});

// ------------------ EDIT ------------------
window.editStudent = function (index) {
  const student = students[index];

  document.getElementById('name').value = student.name;
  document.getElementById('studentId').value = student.id;
  document.getElementById('email').value = student.email;
  document.getElementById('contact').value = student.contact;

  editIndex = index;
};

// ------------------ DELETE ------------------
window.deleteStudent = function (index) {
  students.splice(index, 1);
  renderTable();
};

// Initial render
renderTable();
