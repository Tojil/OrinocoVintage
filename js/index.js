//getAllCameras()

let selectedCamera = undefined;

// Dans index.html appel reseaux et affichage des cameras

let contain = document.getElementById("camera-container")
let mainArticle = document.getElementById("main_Article")
const urlApi = "http://localhost:3000/api/cameras";

function getAllCameras() {
    fetch(urlApi)
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
      let camerasCount = value.length
      for(let i = 0; i < camerasCount; i++) {
        let relPrice = value[i].price
        document.getElementById("camera-container")
            .innerHTML += `<div >
                            <div class='card' style='width: 18rem;'>
                            <img src='${value[i].imageUrl}' class="card-img-top" alt="Camera Vintage">
                            <div class="card-body">
                                <h3 class="card-title">${value[i].name}</h3>
                                <p class="card-text">${value[i].description}</p>
                                <p class="card-price">${(relPrice / 100).toFixed(2)} EUR</p>
                                <a href="./html/product.html?id=${value[i]._id}" class="btn btn-primary" id="${value[i]._id}" class="lien">Choisir</a>
                                </div>
                            </div>
                            </div>`
      }
      contain.appendChild();
    })

    .catch(function(err) {
    console.log("Une erreur est survenue lors de la recuperation des cameras");
    })
}

// Debut Produit dans product.html 

function getProduct() {
  let queryParams = window.location.search.substr(1).split("&");
  let paramIdIndex = queryParams.findIndex(value => value.split("=")[0] == "id");
  let id = queryParams[paramIdIndex].split("=")[1];

    fetch(`${urlApi}/${id}`)
        .then(function(res) {
        if (res.ok) {
            return res.json();
        }
        })
        .then(function(value) {
        
            selectedCamera = value
            document.getElementById("main_Article")
                .innerHTML = `<div >
                                <div class='card' style='width: 18rem;'>
                                <img src='${value.imageUrl}' class="card-img-top" alt="Camera Vintage">
                                <div class="card-body">
                                    <h2 class="card-title">${value.name}</h2>
                                    <p class="card-text">${value.description}</p>
                                    <p class="card-price">${(value.price / 100).toFixed(2)} EUR</p>
                                    <form>
                                    <label for="lenses">Choisir l'objectif :</label>
                                    <select name="lenses" id="lenses">
                                    
                                    </select>
                    
                                    <button type="button" class="add-to-panier" data-price="${(value.price / 100).toFixed(2)}" data-name="${value.name}" data-id="${value._id}">Ajouter au panier</button>
                                    </form>
                                    <a href="../index.html" class="retour flex items-center  ">
                                    Retour
                                    </a>
                                </div>
                                </div>
                            </div>`;
        
            addToBasket()
            indicatorNbOfItemInBasket()
            addLenses(value)

        });
}

// Création de Panier
function createBasket() {

  if (localStorage.getItem('panierKey') == null) {
      
      let panierArray = [];
      let panierArrayStr = JSON.stringify(panierArray);
      localStorage.setItem("panierKey", panierArrayStr);
      
  }
}

// Ajout des lenses dans les cameras
function addLenses(value) {

  const lensesIndex = document.querySelector('#lenses');
  
  for (let nbLenses = 0; nbLenses < value.lenses.length; nbLenses++) {
      lensesIndex.innerHTML += 
      `<option class="optionLenses" value="${value.lenses[nbLenses]}">${value.lenses[nbLenses]}</option>`
  };
}

// Ajout l'article de la page au panier
function addToBasket() {

  const buttonSendToBasket = document.querySelector("button");

  buttonSendToBasket.addEventListener("click", function(event) {

      event.preventDefault();

      // creer differentes constantes avec les valeurs de l'itemSelected
      const nameItemSelected = document.querySelector("h2");
      const articleId = window.location.search.slice(1).split('&').map(el => el.split('=')).find(el => el[0] == 'id')[1];
      const lenseChoisi = document.querySelector("#lenses");
      const priceItemSelected = document.querySelector(".card-price");
      let quantityArticle = 1
      
      // creer constante avec les proprietes de l'itemSelected
      const itemSelected = {
          name: nameItemSelected.textContent,
          id: articleId,
          lense: lenseChoisi.options[lenseChoisi.selectedIndex].text,
          price: priceItemSelected.textContent,
          quantity: quantityArticle
      };

      // converti en String JSON itemSelected 
      const stringItemSelected = JSON.stringify(itemSelected)

      // creer variable avec panierKey qui se trouve dans localStorage
      let basket = JSON.parse(localStorage.getItem("panierKey"));

      //basket = basket.map(el => JSON.parse(el));

      const articleIndex = basket.findIndex(el => el.id === itemSelected.id);

      if(articleIndex > -1) {
        basket[articleIndex].quantity += 1;
      } else {
        basket.push(itemSelected)
      }
      // // si l'article choisi existe deja dans le panier alors ajute-le et incrmente la quantité

      // creer variable avec numGetPanier converti en String JSON
      let strNumGetPanier = JSON.stringify(basket);

      // stock en localStorage panierKey avec la valeur strNumGetPanier en string JSON
      localStorage.setItem("panierKey", strNumGetPanier);

      // appel la fonction du nombre d'articles
      indicatorNbOfItemInBasket();
  });
}

// Indicateur du nombre d'articles dans le panier
function indicatorNbOfItemInBasket() {

  let getBasket = localStorage.getItem("panierKey");

  let arrayGetBasket = JSON.parse(getBasket);
  let nbItemInBasket = 0;
  arrayGetBasket.forEach(el => nbItemInBasket += el.quantity);
  
  if (nbItemInBasket > 0) {

      const headerReload = document.querySelector(".nb-articles");
      headerReload.innerHTML =
      `
      <span> ${nbItemInBasket} </span>
      `;

      let displayNbItemBasket = document.querySelector(".nb-articles");
      displayNbItemBasket.classList.remove("cache");
  }
  let basketEmptyDiv = document.querySelector("#paniervide");
  if(basketEmptyDiv) {
      if(nbItemInBasket > 0) {
      basketEmptyDiv.classList.add("cache");
    } else {
        basketEmptyDiv.classList.remove("cache");
    }
  }
}


function pageBasket() {

  // creer variable avec panierKey qui se trouve dans localStorage
  let basket = JSON.parse(localStorage.getItem("panierKey"));
  
  if (basket.length == 0) {
      const messageEmptyBasket = document.querySelector(".paniervide");  
      messageEmptyBasket.classList.remove("cache");
  }

  for (let itemSelected in basket) {
  
      let itemBasket = basket[itemSelected];
      let subPrice = parseInt(itemBasket.price);
      let subTotal = subPrice*itemBasket.quantity;
      
      let arrayBasket = document.querySelector("#liste-panier");

      let cardSizeBasket = document.createElement("div");
      cardSizeBasket.classList.add("articles-panier-beta");
      cardSizeBasket.innerHTML = 
      `
      <div class="listeProducts">
        <div class="name"> ${itemBasket.name} </div>
        <div class="color"> ${itemBasket.lense} </div>
        <div class="price"> ${subTotal} </div>
        <div class="quantity"> ${itemBasket.quantity} </div>
      </div>
      `

      arrayBasket.appendChild(cardSizeBasket)
      verifForm()
      sendForm()
      
  }

  addButtonDelete();

  function addButtonDelete() {

      numOfArticles = basket.length;
      let i = 0

      for (i; i < numOfArticles; i++) {
          let artPanier = document.querySelector(".articles-panier-beta");
          artPanier.innerHTML += 
          `<div class="delete" id=${i} onclick="deleteItem(id)"><i class="fas fa-trash-alt"></i></div>`;
          artPanier.classList.add("articles-panier");
          artPanier.classList.remove("articles-panier-beta");
      }
  }

  const allPrices = document.querySelectorAll(".price"); 
  const arrayAllPrices = Array.from(allPrices)

  const nbPrices = arrayAllPrices.length
  let totalPanier = 0;
  
  for (let j = 0; j < nbPrices; j++) {
      let strBasis = arrayAllPrices[j].textContent;
      let newStrBasis = strBasis.substring(0, strBasis.length - 1);
      let convertStrInNum = parseInt(newStrBasis);

      totalPanier += convertStrInNum;
  }
  
  const affichageTotal = document.querySelector("#panierTotaux");
  let blocTotal = document.createElement("div");
  blocTotal.innerHTML =
  `<span>TOTAL :</span><span class="totalPanierN">${totalPanier} €</span>`;

  affichageTotal.appendChild(blocTotal);


  
}

function deleteItem(indexDel) {

  let basketForDel = JSON.parse(localStorage.getItem("panierKey"));
  basketForDel.splice(indexDel, 1);
  const newPanier = JSON.stringify(basketForDel);
  localStorage.setItem("panierKey", newPanier);
  
  alert("Votre article à bien été supprimé");
  setTimeout(300);
  window.location.reload();
  
}

//-------------------------------------------
// Formulaire panier Validation
//-------------------------------------------
let form = document.querySelector("#contact")

function sendForm() {

    let button = document.querySelector("button");

    button.addEventListener('click', function(e) {

        e.preventDefault();

        let basket = localStorage.getItem("panierKey");
        basket = JSON.parse(basket);


        if (validLetter(form.firstName) && validLetter(form.lastName) && validAddress(form.address) && validLetter(form.city) && validEmail(form.email)) {
            
            if (basket.length == 0) {
                
                alert ("Vous ne pouvez pas commander un panier qui est vide, veuillez sélectionner un article au minimum");

            } else {

                // Récupération des srtings articles du panier
                let products = [];

                basket.forEach(itemBasket => products.push(itemBasket.id));
                //---------------------------------------------


                // Récupération du formulaire
                let contact = {
                    firstName: form.firstName.value,
                    lastName: form.lastName.value,
                    address: form.address.value,
                    city: form.city.value,
                    email: form.email.value
                };
                //---------------------------------------------
                // const axios = require('axios').default;

                // // Send a POST request

            //     axios.post('http://localhost:3000/api/cameras/order', {
                //         firstName: 'Fred',
                //         lastName: 'Flintstone'
                //       })
                //       .then(function (response) {
                //         console.log(response);
                //       })
                //       .catch(function (error) {
                //         console.log(error);
                //       });

                // Envoie des données avec FETCH
                fetch('http://localhost:3000/api/cameras/order',
                {
                    method: 'POST',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({contact, products})
                })
                .then(response => response.json())
                .then(response => {

                    let objetRetour = response;

                    console.log(objetRetour["orderId"]);
                    localStorage.setItem("orderKey", objetRetour["orderId"]);
                    
                    let totaldupanier = document.querySelector(".totalPanierN");
                    localStorage.setItem("totalKey", totaldupanier.textContent);


                    alert("Veuillez cliquer sur OK pour comfirmer votre commande.");
                    location.replace("../html/confirmation.html");
                })
                .catch(function(error){

                    console.log(error)

                })
            }

        } else {

            if (basket.length == 0) {
                alert ("Votre panier est vide, veuillez sélectionner au moins un article et le formulaire n'est pas correctement rempli");
            } else {
                alert ("Le formulaire n'est pas correctement rempli");
            }
        } 
    });
}


// --- Vérification Formulaire avant envoie
function verifForm() {

  form.firstName.addEventListener('change', function() {
      validLetter(this);

      const msgError = document.querySelector("#firstN");

      if(validLetter(this) == false) {
          
          msgError.classList.remove("cache");

      } else {

          msgError.classList.add("cache");

      }
  });

  form.lastName.addEventListener('change', function() {
      validLetter(this);

      const msgError = document.querySelector("#lastN");
      
      if(validLetter(this) == false) {
          
          msgError.classList.remove("cache");

      } else {

          msgError.classList.add("cache");

      }

  });

  form.address.addEventListener('change', function() {
      validAddress(this);

      const msgError = document.querySelector("#addrS");
      
      if(validLetter(this) == false) {
          
          msgError.classList.remove("cache");

      } else {

          msgError.classList.add("cache");

      }
      
  });

  form.city.addEventListener('change', function() {
      validLetter(this);

      const msgError = document.querySelector("#citY");
      
      if(validLetter(this) == false) {
          
          msgError.classList.remove("cache");

      } else {

          msgError.classList.add("cache");

      }
      
  });

  form.email.addEventListener('change', function() {
      validEmail(this);

      const msgError = document.querySelector("#emaiL");
      
      if(validLetter(this) == false) {
          
          msgError.classList.remove("cache");

      } else {

          msgError.classList.add("cache");

      }
  });
}


// REGEX pour formulaire
function validEmail(inputEmail) {
  let emailRegex = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');

  let testEmail = emailRegex.test(inputEmail.value);

  if (testEmail) {
      inputEmail.classList.add("borderGreen");
      inputEmail.classList.remove("borderRed");
  } else {
      inputEmail.classList.add("borderRed");
      inputEmail.classList.remove("borderGreen");
  }

  if (inputEmail.value.length == 0) {
      inputEmail.classList.remove("borderGreen");
      inputEmail.classList.remove("borderRed");        
  }

  return testEmail;
}

function validLetter(inputLetter) {
  let letterRegex = new RegExp('[a-zA-Z ,.-]$', 'g');

  let testLetter = letterRegex.test(inputLetter.value);

  if (inputLetter.value.length < 2) {
      inputLetter.classList.add("borderRed");
      inputLetter.classList.remove("borderGreen");
      testLetter = false;
  } else if (testLetter) {
      inputLetter.classList.add("borderGreen");
      inputLetter.classList.remove("borderRed");
  } else {
      inputLetter.classList.add("borderRed");
      inputLetter.classList.remove("borderGreen");
  }


  if (inputLetter.value.length == 0) {
      inputLetter.classList.remove("borderGreen");
      inputLetter.classList.remove("borderRed");        
  }
  
  return testLetter;
}

function validAddress(inputAddress) {
  let addressRegex = new RegExp ('[0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.-]$', 'g');

  let addressTest = addressRegex.test(inputAddress.value);

  if (inputAddress.value.length < 2) {
      inputAddress.classList.add("borderRed");
      inputAddress.classList.remove("borderGreen");
      addressTest = false;
  } else if (addressTest) {
      inputAddress.classList.add("borderGreen");
      inputAddress.classList.remove("borderRed");
  } else {
      inputAddress.classList.add("borderRed");
      inputAddress.classList.remove("borderGreen");
  }

  if (inputAddress.value.length == 0) {
      inputAddress.classList.remove("borderGreen");
      inputAddress.classList.remove("borderRed");
  }

  return addressTest;
}


function messageOrder() {
    
    localStorage.removeItem("panierKey");

    let orderIdOfOrder = localStorage.getItem("orderKey");
    let priceOfOrder = localStorage.getItem("totalKey");

    let mainCommande = document.querySelector("main");
    
    let messageOrderId = document.createElement("div");
    messageOrderId.classList.add("message");
    messageOrderId.innerHTML =
    `
    <h1>Merci</h1>
    <h2>d'avoir commandé sur <span class="title">Ori'Cam</span></h2>
    <h3>Votre numéro de commande est le suivant :</h3>
    <div class="order_id dyna"> ${orderIdOfOrder} </div>
    <h4>Pour un montant total de :</h4>
    <div class="total dyna"> ${priceOfOrder}</div>
    <h5>A bientôt sur notre site</h5>
    <i class="fas fa-chevron-down"></i>
    
    <button>Revenir à l'accueil</button>`;

    mainCommande.appendChild(messageOrderId);
    restoreHome()
    
}

function restoreHome() {

    let buttonBack = document.querySelector("button");
    buttonBack.addEventListener("click", function() {

        localStorage.removeItem("totalKey");
        localStorage.removeItem("orderKey");

        location.replace("../index.html");

    })
    
}

function initialize() {
    createBasket();
    indicatorNbOfItemInBasket();
}

initialize();

