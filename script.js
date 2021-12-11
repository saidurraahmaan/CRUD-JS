      
const name = document.querySelector("#fullName");
const age = document.querySelector("#age");
const form = document.querySelector("form");
const submitBtn = document.querySelector("#submit-btn");
const tbody = document.querySelector("#table tbody");
const selectedUserShow=document.querySelector("#show #selected-user")
let count = 1;
form.addEventListener("submit", addUser);

name.addEventListener("change", buttonEnable);
age.addEventListener("change", buttonEnable);

function buttonEnable() {
    if (name.value !== "" && age.value !== "")
        submitBtn.disabled = false;
    else
        submitBtn.disabled = true;
}

function addUser(e) {

    e.preventDefault();
    clearSelectedUser();
    const person = { name: name.value, age: age.value };
    const tr = document.createElement("tr");

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
    updateBtn.addEventListener('click', updateUser);
    ++count;
    form.reset();
    buttonEnable()
    
    if (tbody.childElementCount > 0)
        document.getElementById("show").style.display = "block";
    else
        document.getElementById("show").style.display = "none";
    
    
}

function clearSelectedUser() {
    selectedUserShow.innerHTML = "";
}

function updateUser(e) {

    clearSelectedUser();
    const btnParent = e.target.parentElement;
    const userRow = btnParent.parentElement;
    console.log(userRow);
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
    selectedUserShow.appendChild(selectedUserDiv)
    
}

function deleteUser(e) {

    clearSelectedUser();
    const btnParent = e.target.parentElement;
    const userRow = btnParent.parentElement;
    userRow.remove();
    if (tbody.childElementCount > 0)
        document.getElementById("show").style.display = "block";
    else
        document.getElementById("show").style.display = "none";
    // const tBody = document.querySelector("#table #user-rows-body")
    // console.log(tBody);
    // tBody.removeChild(userRow);
}