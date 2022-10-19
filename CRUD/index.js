/**
 * import
 * Permette di importare variabili, metodi, oggetti, classi
 * da un altro file javascript, a patto che questi abbiamo la keyword "export"
 */

import { newUser } from "./data.js";
import {
  showUsers,
  getById,
  edit,
  deleteUser,
  createUser,
  filterByName,
  filterByCity,
  sortByName,
} from "./utility.js";

// Reference dei vari bottoni
/**
 * .querySelector
 * Permette di recuperare un elemento del dom
 * È un metodo che prende un parametro, una stringa,
 * che sarebbe il selettore CSS per selezionare quell'elemento. 
 * (Valgono tutte le regole dei selettori CSS)
 */

const getAllBtnElement = document.querySelector("#get-all");
const getByIdBtnElement = document.querySelector("#get-by-id");
const editBtnElement = document.querySelector("#edit");
const deleteBtnElement = document.querySelector("#delete");
const createBtnElement = document.querySelector("#create");
const filterByNameBtnElement = document.querySelector("#filter-name");
const filterByCityBtnElement = document.querySelector("#filter-city");
const sortByNameBtnElement = document.querySelector("#sort-name");

// Reference dell'input di tipo testuale
const inputElement = document.querySelector("input");

/**
 * .addEventListener
 * Permette di aggiungere un "ascoltatore di eventi" ad un elemento.
 * È un metodo che prende due parametri:
 * - Il primo, una stringa che definisce il tipo di evento da ascoltare
 * - Il secondo, una funzione che viene eseguita quando l'evento viene scatenato
 * https://www.w3schools.com/jsref/met_document_addeventlistener.asp
 */

getAllBtnElement.addEventListener("click", () => showUsers());

getByIdBtnElement.addEventListener("click", () => getById(inputElement.value));

editBtnElement.addEventListener("click", () => {
  const changes = { name: "Zio Pino", username: "pinux" };
  edit(inputElement.value, changes);
});

deleteBtnElement.addEventListener("click", () =>
  deleteUser(inputElement.value)
);

createBtnElement.addEventListener("click", () => createUser(newUser));

filterByNameBtnElement.addEventListener("click", () =>
  filterByName(inputElement.value)
);

filterByCityBtnElement.addEventListener("click", () =>
  filterByCity(inputElement.value)
);

sortByNameBtnElement.addEventListener("click", () => sortByName());
