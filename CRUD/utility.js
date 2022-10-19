import { USERS } from "./data.js";

let mockUsers = [...USERS];

/**
 * Metodo di utilità che serve a creare in maniera dinamica dei tag, dar loro del valore o delle classi
 * tagName: (string) nome del tag da creare
 * value: (string) testo da rappresentare all'interno del tag
 * classes: (string) classi da inserire all'interno del tag, separate da uno spazio
 * */
export const createElement = (tagName, value, classes) => {
  /**
   * .createElement()
   * Permette di creare un tag in maniera dinamica attraverso Javascript
   * Prende un parametro: il nome tag da creare 
   */
  const element = document.createElement(tagName);

  /**
   * innerHtml
   * Imposta il valore all'interno del tag
   */
  element.innerHTML = value;
  if (classes) {
    /**
     * classList
     * Lista delle classi di quel tag
     */
    element.classList = classes;
  }
  return element;
};

/**
 * Metodo di utilità che popola la tabella in base all'array passato come parametro
 * Di default, quindi se non si passa nulla, prende i dati dal file `data.js`
 *
 * - Recupera dal DOM il tag `tbody`,
 * - Lo pulisce, rimuovendo tutti i figli
 * - Controlla se il parametro passato in input esiste ed ha una lunghezza
 * - Se è vero, cicla l'array e per ogni utente crea una riga e alla quale inserisce tutte le colonne
 * - Se è falso, crea una riga, con un'unica colonna, con il messaggio "Non è presente nessun utente"
 * @param {Array} users
 */
export const showUsers = (users = mockUsers) => {
  const tBodyElement = document.querySelector("tbody");
  // Rimuove tutti i figli del tag tbody, pulendo la tabella
  while (tBodyElement.firstChild) {
    tBodyElement.removeChild(tBodyElement.lastChild);
  }

  if (users && users.length) {
    users.forEach((user) => {
      const trElement = document.createElement("tr");
      trElement.append(createElement("th", user.id, "p-2"));
      trElement.append(createElement("td", user.name, "p-2"));
      trElement.append(createElement("td", user.username, "p-2"));
      trElement.append(createElement("td", user.email, "p-2"));
      trElement.append(createElement("td", user.address.city, "p-2"));
      tBodyElement.append(trElement);
    });
  } else {
    const trElement = document.createElement("tr");
    trElement.append(createElement("td", "Non è presente nessun utente"));
    tBodyElement.append(trElement);
  }
};

/**
 * Recupera l'utente con l'id passato come parametro.
 * - Se lo trova, mostra la lista con quell'utente
 * - Altrimenti, mostra una lista con il messaggio di errore
 * @param {String} id
 */
export const getById = (id) => {
  const foundedUser = mockUsers.find((user) => user.id == id);
  foundedUser ? showUsers([foundedUser]) : showUsers([]);
};
/**
 * Modifica l'utente con l'id passato come parametro, con l'oggetto passato come parametro
 * @param {String} id
 * @param {object} value
 */
export const edit = (id, value) => {
  if (!id) {
    alert("inserire un id");
  } else {
    /**
     * Approccio immutabile, attraverso map, l'array viene ciclato
     * se trova un utente con l'id uguale a quello del parametro
     * allora effettua un merge delle proprietà
     * se non lo trova, restituisce l'oggetto invariato
     */
    mockUsers = mockUsers.map((user) =>
      user.id == id ? { ...user, ...value } : user
    );

    /**
     * Approccio mutabile
     * Troviamo l'indice dell'utente che possiede l'id uguale a quello passato come parametro
     * Se questo è maggiore di 0 (quindi viene trovato)
     * modifichiamo l'oggetto alla posizione appena trovata, effettuando un merge delle proprietà
     */
    // const foundedUserIndex = mockUsers.findIndex((user) => user.id == id);
    // if (foundedUserIndex >= 0) {
    //   mockUsers[foundedUserIndex] = {
    //     ...mockUsers[foundedUserIndex],
    //     ...value,
    //   };
    // }
    showUsers();
  }
};

/**
 * Rimuove dall'array l'utente con l'id passato come parametro
 * @param {String} id
 */
export const deleteUser = (id) => {
  if (!id) {
    alert("inserire un id");
  } else {
    /**
     * Approccio immutabile
     * Restituiamo un nuovo array che comprende tutti gli utenti, che non hanno l'id passato come parametro
     */
    mockUsers = mockUsers.filter((user) => user.id != id);

    /**
     * Approccio mutabile
     * Troviamo l'indice dell'array dell'utente che quell'id
     * Attraverso splice, lo rimuoviamo
     * passando come primo parametro l'indice appena trovato
     * passando come secondo parametro 1 (il numero di elementi da voler rimuovere)
     */
    // const foundedUserIndex = mockUsers.findIndex((user) => user.id == id);
    // if (foundedUserIndex) {
    //   mockUsers.splice(foundedUserIndex, 1);
    // }

    showUsers();
  }
};

/**
 * Aggiunge alla lista un nuovo utente
 * @param {User} newUser
 */
export const createUser = (newUser) => {
  if (newUser) {
    /**
     * Approccio immutabile
     * Crea un nuovo array, facendo lo spread di mockUsers e aggiunggendo alla fine il nuovo utente
     */
    mockUsers = [...mockUsers, newUser];

    /**
     * Approccio mutabile
     */
    // mockUsers.push(newUser);
    showUsers();
  }
};
/**
 * Filtra la lista di utenti
 * Per non renderlo case sensitive, si traformano entrambe le stringhe in minuscolo con toLowerCase()
 * @param {String} searchTerm
 */
export const filterByName = (searchTerm) => {
  const filteredUsers = mockUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  showUsers(filteredUsers);
};

export const filterByCity = (searchTerm) => {
  const filteredUsers = mockUsers.filter((user) =>
    user.address.city.toLowerCase().includes(searchTerm.toLowerCase())
  );
  showUsers(filteredUsers);
};

/**
 * Riordina la lista per nome in ordine alfabetico
 * attraverso localeCompare() confrontiamo sia maiuscole che minuscole e anche accenti
 */
export const sortByName = () => {
  mockUsers = mockUsers.sort((u1, u2) => u1.name.localeCompare(u2.name));
  showUsers();
};
