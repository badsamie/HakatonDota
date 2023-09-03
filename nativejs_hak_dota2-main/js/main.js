//! Сохроняем API (база данных) в перемненную API
const API = "http://localhost:8000/heroes";
// !
let deleteBtn = document.querySelector(".delete_btn");
const openModalBtnAdd = document.getElementById("openModalBtnAdd");
const closeModalBtnAdd = document.querySelector(".closeAdd");
const addProductModal = document.getElementById("addProductModal");
const cardContainer = document.querySelector(".container_card");
let imageAdd = document.querySelector("#imageAdd");
let productName = document.querySelector("#productName");
let productPrice = document.querySelector("#productPrice");
let category = document.querySelector("#category");
// !
// ! PAGINATION start
let pagBtnPrew = document.querySelector("#pagBtnPrew");
let pagBtnCount = document.querySelector("#pagBtnCount");
let pagBtnNext = document.querySelector("#pagBtnNext");
let pagList = document.querySelector(".pagination-list");

let limit = 10;
let currentPage = 1;
let pageTotalCount = 1;
// !Search
let searchHero = document.querySelector("#searchHero");
let searchVal = "";
// ! filter
let radios = document.querySelectorAll("input[type='radio']");
let attribute = "";
// !
// !login admin
let close = document.querySelector(".close");
let regName = document.querySelector("#regName");
let regPass = document.querySelector("#regPass");
let regGo = document.querySelector("#regGo");

// ! запросы на героев
async function getHeroes() {
  let res = await fetch(
    `${API}?_page=${currentPage}&q=${searchVal}&attribute_like=${attribute}`
  );
  let data = await res.json();
  let count = res.headers.get("x-total-count");
  pageTotalCount = Math.ceil(count / limit);
  return data;
}
getHeroes();
// ! конец запроса
// ! POST для отправки на дб json
async function addHeroes(newData) {
  await fetch(API, {
    method: "POST",
    body: JSON.stringify(newData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  render();
}
// !
//! delete zapros
async function deleteHero(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
  render();
}
// ! Edit
async function editHero(newData, id) {
  await fetch(`${API}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(newData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  render();
}
// ! finish edit
// !modal open close
openModalBtnAdd.addEventListener("click", () => {
  addProductModal.style.display = "block";
});

closeModalBtnAdd.addEventListener("click", () => {
  addProductModal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === addProductModal) {
    addProductModal.style.display = "none";
  }
});
// !modal open close finish
//! Create
const addProductForm = document.getElementById("addProductForm");
addProductForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (
    !imageAdd.value.trim() ||
    !productName.value.trim() ||
    !productPrice.value.trim()
  ) {
    alert("zapolni pole");
    return;
  }
  let newOjb = {
    hero_name: productName.value,
    price: productPrice.value,
    image: imageAdd.value,
    attribute: attributeEdit.value,
  };
  editForm.style.display = "none";

  addHeroes(newOjb);
  addProductModal.style.display = "none";
});
// ! Crud
async function render() {
  const heroes = await getHeroes();
  cardContainer.innerHTML = "";
  heroes.forEach((item) => {
    cardContainer.innerHTML += `
    <div class="myHeroes">
    <div class="cardMyheroes">
      <img 
        src="${item.image}"
        alt="juggernaut"
      />
      <h3 class="hero__name">${item.hero_name}</h3>
      <h4 class="hero__price">${item.price}</h4>
          <p id="categoryCard">${item.attribute}</p>
      <div>
        <button id="${item.id}" class="edit_btn">Edit</button>
        <button id="${item.id}" class="delete_btn">Delete</button>
      </div>
    </div>
  </div>
    `;
  });
  renPagination();
}
render();
// ! Delete btn
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete_btn")) {
    deleteHero(e.target.id);
  }
});
//! modal edit form
let infoHeroMod = document.querySelector("#infoHeroMod");
let editModal = document.querySelector(".edit_btn");
let closeEditBtn = document.querySelector(".closeEdit");
let imageEdit = document.querySelector("#imageEdit");
let editHeroName = document.querySelector("#editHeroName");
let editHeroPrice = document.querySelector("#editHeroPrice");
let editSaveBtn = document.querySelector("#editSaveBtn");
let editForm = document.querySelector("#edit");
let attributeEdit = document.querySelector("#categoryEdit");
//! modal edit form finish

// !open close form
closeEditBtn.addEventListener("click", () => {
  editForm.style.display = "none";
  console.log(editForm);
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit_btn")) {
    editForm.style.display = "block";
  }
});
document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("edit_btn")) {
    id = e.target.id;
    let hero = await getOneHero(id);
    imageEdit.value = hero.image;
    editHeroName.value = hero.hero_name;
    editHeroPrice.value = hero.price;
  }
});
editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    !imageEdit.value.trim() ||
    !editHeroName.value.trim() ||
    !editHeroPrice.value.trim()
  ) {
    alert("zapolni vse");
    return;
  }

  let heroList = {
    hero_name: editHeroName.value,
    price: editHeroPrice.value,
    image: imageEdit.value,
    attribute: attributeEdit.value,
  };
  editHero(heroList, id);
});
// !open close finish

//! get one zapros
async function getOneHero(id) {
  let res = await fetch(`${API}/${id}`);
  let data = await res.json();
  return data;
}
//!finish get one zapros

//!start registr modal------------------------------------------

let openModalBtn = document.getElementById("openModalBtn");
let closeModalBtn = document.querySelector(".close");
let regModal = document.getElementById("registrationModal");

openModalBtn.addEventListener("click", () => {
  regModal.style.display = "block";
});

closeModalBtn.addEventListener("click", () => {
  regModal.style.display = "none";
});

document.addEventListener("click", (event) => {
  if (event.target === regModal) {
    regModal.style.display = "none";
  }
});
let regForm = document.getElementById("registrationForm");
regForm.addEventListener("submit", (event) => {
  event.preventDefault();
});
// !finish registr modal
// ! pagination start
function renPagination() {
  pagList.innerHTML = "";
  for (let i = 1; i <= pageTotalCount; i++) {
    pagList.innerHTML += `<li class="page-item"><button class="page-number">${i}</button></li>`;
  }
}
if (currentPage <= 1) {
  pagBtnPrew.classList.add("disabled");
} else {
  pagBtnPrew.classList.remove("disabled");
}
if (currentPage >= pageTotalCount) {
  pagBtnNext.classList.add("disables");
} else {
  pagBtnNext.classList.remove("disabled");
}
// !
pagBtnNext.addEventListener("click", () => {
  if (currentPage >= pageTotalCount) {
    return;
  }
  currentPage++;
  render();
});
// !
pagBtnPrew.addEventListener("click", () => {
  if (currentPage <= 1) {
    return;
  }
  currentPage--;
  render();
});
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("page-number")) {
    currentPage = +e.target.innerText;
    render();
  }
});
// !Pagination end
// !Search
searchHero.addEventListener("input", (e) => {
  searchVal = searchHero.value;
  currentPage = 1;
  render();
});
// !Filter
radios.forEach((item) => {
  item.addEventListener("change", (e) => {
    attribute = e.target.id;
    render();
  });
});
//! adminka
// !admin start
regGo.addEventListener("click", (e) => {
  let regNameValue = regName.value.trim();
  let regPassValue = regPass.value.trim();

  if (!regNameValue || !regPassValue) {
    return;
  } else if (regNameValue === "admin" && regPassValue === "admin") {
    document.querySelectorAll(".edit_btn").forEach((item) => {
      item.style.visibility = "visible";
    });
    document.querySelectorAll(".delete_btn").forEach((item) => {
      item.style.visibility = "visible";
    });
    document.querySelectorAll("#openModalBtnAdd").forEach((item) => {
      item.style.visibility = "visible";
    });
  } else {
    alert("wrong password");
  }
});
// !infoModal
let imageContainer = document.querySelector(".container_card");
let modalInfo = document.querySelector(".modalInfo");
let closeModalButton = document.querySelector(".close-modal");

imageContainer.addEventListener("click", () => {
  modalInfo.style.display = "block";
});

closeModalButton.addEventListener("click", () => {
  modalInfo.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
