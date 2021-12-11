const name = document.querySelector("#fullName");
const age = document.querySelector("#age");
const form = document.querySelector("form");
const submitBtn = document.querySelector("#submit-btn");
const tbody = document.querySelector("#table tbody");
const selectedUserShow = document.querySelector("#show #selected-user");

let count = 1;
let submitAction = "add";
let userSerial = -1;

form.addEventListener("submit", submitForm);
name.addEventListener("change", buttonEnable);
age.addEventListener("change", buttonEnable);

function buttonEnable() {
  if (name.value !== "" && age.value !== "") {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

function clearSelectedUser() {
  selectedUserShow.innerHTML = "";
}

function submitForm(e) {
  e.preventDefault();

  if (submitAction === "add") {
    addUser();
  } else if (submitAction === "update") {
    updateUser(e);
  }
}

function getUser(e) {
  const selectedParent = e.target.parentElement;
  const selectedRow = selectedParent.parentElement;
  const selectedName = selectedRow.children[0].innerHTML;
  const selectedAge = selectedRow.children[1].innerHTML;
  const selectedUserDiv = document.createElement("div");

  selectedUserDiv.innerHTML = `
          <h3>${selectedName}</h3>
          <h3>${selectedAge}</h3>
      `;

  clearSelectedUser();

  selectedUserShow.appendChild(selectedUserDiv);
}

function addUser() {
  console.log(submitAction);
  clearSelectedUser();

  const person = { name: name.value, age: age.value };
  const tr = document.createElement("tr");
  tr.id = `user-${count}`;
  tr.innerHTML = `
          <td>${person.name} </td>
          <td>${person.age}</td>
          <td>
          <button id="select-${count}">Select</button>
          <button id="update-${count}">Update</button>
          <button id="delete-${count}">Delete</button>
          </td>
        `;
  tbody.appendChild(tr);

  const selectedBtn = document.querySelector(`#select-${count}`);
  selectedBtn.addEventListener("click", getUser);

  const deleteBtn = document.querySelector(`#delete-${count}`);
  deleteBtn.addEventListener("click", deleteUser);

  const updateBtn = document.querySelector(`#update-${count}`);
  updateBtn.addEventListener("click", setUpdateForm);

  ++count;

  form.reset();
  submitBtn.disabled = true;

  if (tbody.childElementCount > 0) {
    document.getElementById("show").style.display = "block";
  } else {
    document.getElementById("show").style.display = "none";
  }
}

function setUpdateForm(e) {
  clearSelectedUser();

  const btnParent = e.target.parentElement;
  const userRow = btnParent.parentElement;
  userSerial = +userRow.id.split("-")[1];
  const userName = userRow.children[0].innerText;
  const userAge = userRow.children[1].innerText;

  name.value = userName;
  age.value = userAge;

  submitBtn.disabled = false;

  submitAction = "update";

  console.log(userSerial);
}

function updateUser(e) {
  console.log(submitAction);
  const updatedName = name.value;
  const updatedAge = age.value;

  console.log(userSerial);
  const updatedRow = document.querySelector(`#user-${userSerial}`);

  updatedRow.children[0].innerText = updatedName;
  updatedRow.children[1].innerText = updatedAge;

  form.reset();
  submitBtn.disabled = true;
  submitAction = "add";
  console.log(updatedRow);
}

function deleteUser(e) {
  clearSelectedUser();

  const btnParent = e.target.parentElement;
  const userRow = btnParent.parentElement;
  userRow.remove();

  if (tbody.childElementCount > 0) {
    document.getElementById("show").style.display = "block";
  } else {
    document.getElementById("show").style.display = "none";
  }
}
