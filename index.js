const namesList = document.getElementById("names-list");
const formSubmit = document.getElementById("form-submit");
const editFormSubmit = document.getElementById("edit-form-submit");
const fName = document.getElementById("fname");
const lName = document.getElementById("lname");
const editFName = document.getElementById("edit-fname");
const editLName = document.getElementById("edit-lname");
let currentId;

const fetchPeople = () => {
  fetch("http://localhost:3000")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      renderUsers(data);
    });
};

const createPerson = (data) => {
  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then(() => {
      namesList.innerHTML = "";
      formSubmit.reset();
      fetchPeople();
    });
};

fetchPeople();

const renderUsers = (arr) => {
  namesList.innerHTML = "";
  arr.forEach((element) => {
    let li = document.createElement("li");
    let editBtn = document.createElement("button");
    let deleteBtn = document.createElement("button");

    editBtn.innerText = "Edit";
    deleteBtn.innerText = "Delete";

    editBtn.addEventListener("click", (e) => {
      e.preventDefault();
      editUser(element);
    });

    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      deleteUser(element.id);
    });

    li.innerText = `${element.firstName} ${element.lastName}`;

    namesList.append(li);
    li.append(editBtn);
    li.append(deleteBtn);
  });
};

const editUser = (obj) => {
  currentId = obj.id;
  editFormSubmit.style.visibility = "visible";
  editFName.value = obj.firstName;
  editLName.value = obj.lastName;

  editFormSubmit.addEventListener("submit", (e) => {
    e.preventDefault();

    let newUser = {
      firstName: e.target[0].value,
      lastName: e.target[1].value,
    };

    fetch(`http://localhost:3000/users/${currentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).then(() => {
      editFormSubmit.reset();
      namesList.innerHTML = "";
      editFormSubmit.style.visibility = "hidden";
      fetchPeople();
    });
  });
};

const deleteUser = (id) => {
  fetch(`http://localhost:3000/users/${id}`, {
    method: "DELETE",
  }).then(() => {
    namesList.innerHTML = "";
    fetchPeople();
  });
};

formSubmit.addEventListener("submit", (e) => {
  e.preventDefault();
  let newUser = {
    firstName: fName.value,
    lastName: lName.value,
  };

  createPerson(newUser);
});

const fetchCats = () => {
  fetch("http://localhost:3000/cats")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let joesCats = data.filter((element) => {
        return element.user_id === 3;
      });

      console.log(joesCats);
    });
};

fetchCats();
