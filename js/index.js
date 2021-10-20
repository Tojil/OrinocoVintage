/********************************************************
*** GESTION DE LA PAGE D'ACCUEIL
*********************************************************/

// Dans index.html appel reseaux et affichage des cameras

let contain = document.getElementById("camera-container")
let mainArticle = document.getElementById("main_Item")
const urlApi = "http://localhost:3000/api/cameras";
let currentProduct = undefined;

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

/********************************************************/


/********************************************************
*** GESTION DE LA PAGE PRODUIT
*********************************************************/

// Ajout l'article de la page au panier
function addToBasket(event) {
  event.preventDefault();
  
  // creer constante avec les proprietes de l'itemSelected
  const itemSelected = {
      name: currentProduct.name,
      id: currentProduct._id,
      lense: currentProduct.lenses,
      price: currentProduct.price,
      quantity: 1
  };

  // creer variable avec basketKey qui se trouve dans localStorage
  let basket = JSON.parse(localStorage.getItem("basketKey"));

  const articleIndex = basket.findIndex(el => el.id === itemSelected.id);

  // si l'article choisi existe deja dans le panier alors ajute-le et incrmente la quantité
  if(articleIndex > -1) {
    basket[articleIndex].quantity += 1;
  } else {
    basket.push(itemSelected)
  }

  // creer variable avec numGetPanier converti en String JSON
  let strNumGetPanier = JSON.stringify(basket);

  // stock en localStorage basketKey avec la valeur strNumGetPanier en string JSON
  localStorage.setItem("basketKey", strNumGetPanier);

  // appel la fonction du nombre d'articles
  indicatorNbOfItemInBasket();
}

// Dans product.html appel reseaux et affichage d'une seule camera
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
    
        currentProduct = value
        document.getElementById("main_Item")
            .innerHTML = `<div >
                            <div class='card' style='width: 18rem;'>
                            <img src='${value.imageUrl}' class="card-img-top" alt="Camera Vintage">
                            <div class="card-body">
                                <h2 class="card-title">${value.name}</h2>
                                <p class="card-text">${value.description}</p>
                                <p class="card-price">${formatPrice(value.price)} EUR</p>
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
    
        document.querySelector("button.add-to-panier").addEventListener("click", addToBasket);
        indicatorNbOfItemInBasket();
        addLenses(value);

    });
}

// Ajout des options d'objectif lenses dans les cameras
function addLenses(value) {

    const lensesIndex = document.querySelector('#lenses');
    
    for (let nbLenses = 0; nbLenses < value.lenses.length; nbLenses++) {
        lensesIndex.innerHTML += 
        `<option class="optionLenses" value="${value.lenses[nbLenses]}">${value.lenses[nbLenses]}</option>`
    };
}
// Creation du panier
function createBasket() {

  if (localStorage.getItem('basketKey') == null) {
      
      let panierArray = [];
      let panierArrayStr = JSON.stringify(panierArray);
      localStorage.setItem("basketKey", panierArrayStr);
      
  }
}

// Indicateur du nombre d'articles dans le panier
function indicatorNbOfItemInBasket() {

  let getBasket = localStorage.getItem("basketKey");

  let arrayGetBasket = JSON.parse(getBasket);
  let nbItemInBasket = 0;
  arrayGetBasket.forEach(el => nbItemInBasket += el.quantity);
  
  if (nbItemInBasket > 0) {

      let displayNbItemBasket = document.querySelector(".nb-articles");
      if(displayNbItemBasket) {
          displayNbItemBasket.innerHTML =
          `
          <span> ${nbItemInBasket} </span>
          `;
          displayNbItemBasket.classList.remove("cache");
      }      
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

/********************************************************/


/********************************************************
*** GESTION DE LA PAGE BASKET
*********************************************************/

function sendForm(e) {
    e.preventDefault();

    let basket = localStorage.getItem("basketKey");
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
}
// Creation de la page panier
function pageBasket() {

  // creer variable avec basketKey qui se trouve dans localStorage
  let basket = JSON.parse(localStorage.getItem("basketKey"));
  
  if (basket.length == 0) {
      const messageEmptyBasket = document.querySelector(".paniervide");  
      messageEmptyBasket.classList.remove("cache");
  }

  for (let itemSelected in basket) {
  
    let itemBasket = basket[itemSelected];
      
    let arrayBasket = document.querySelector("#liste-panier");

    let cardSizeBasket = document.createElement("div");
    cardSizeBasket.classList.add("articles-panier-beta");
    cardSizeBasket.innerHTML = 
    `
    <div class="listeProducts">
    <div class="boxSizeForm name"> ${itemBasket.name} </div>
    <div class="boxSizeForm lense"> ${itemBasket.lense} </div>
    <div class="boxSizeForm price"> ${formatPrice(itemBasket.price)} € </div>
    <div class="boxSizeForm quantity"> ${itemBasket.quantity} </div>
    </div>
    `

    arrayBasket.appendChild(cardSizeBasket) 
  }
  
  verifForm();
  document.querySelector("button").addEventListener('click', sendForm);

  addButtonDelete();
// Ajoute l'icon poubelle 
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

  const nbPrices = basket.length
  let totalPanier = 0;
  
  for (let i = 0; i < nbPrices; i++) {
      totalPanier += (basket[i].price * basket[i].quantity);
  }
  
  // Ajoute le prix total du panier
  const affichageTotal = document.querySelector("#panierTotaux");
  let blocTotal = document.createElement("div");
  blocTotal.innerHTML =
  `<span>TOTAL :</span><span class="totalPanierN"> ${formatPrice(totalPanier)} €</span>`;

  affichageTotal.appendChild(blocTotal);
  
}

// Elimine le produit du panier 
function deleteItem(indexDel) {

  let basketForDel = JSON.parse(localStorage.getItem("basketKey"));
  basketForDel.splice(indexDel, 1);
  const newPanier = JSON.stringify(basketForDel);
  localStorage.setItem("basketKey", newPanier);
  
  alert("Votre article à bien été supprimé");
  setTimeout(300);
  window.location.reload();
  
}

let form = document.querySelector("#contact")


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

// --- Vérification Formulaire avant envoie
function verifForm() {

  form.firstName.addEventListener('change', function() {

      const msgError = document.querySelector("#firstN");

      if(validLetter(this) == false) {
          
          msgError.classList.remove("cache");

      } else {

          msgError.classList.add("cache");

      }
  });

  form.lastName.addEventListener('change', function() {

      const msgError = document.querySelector("#lastN");
      
      if(validLetter(this) == false) {
          
          msgError.classList.remove("cache");

      } else {

          msgError.classList.add("cache");

      }

  });

  form.address.addEventListener('change', function() {

      const msgError = document.querySelector("#addrS");
      
      if(validAddress(this) == false) {
          
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

      const msgError = document.querySelector("#emaiL");
      
      if(validEmail(this) == false) {
          
          msgError.classList.remove("cache");

      } else {

          msgError.classList.add("cache");

      }
  });
}

/********************************************************/


/********************************************************
*** GESTION DE LA PAGE DE CORFIRMATION
*********************************************************/

// Envoie le message de confirmation avec le total et le numero de commande
function messageOrder() {
    
    localStorage.removeItem("basketKey");

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
// Retabli le panier à cero
function restoreHome() {

    let buttonBack = document.querySelector("button");
    buttonBack.addEventListener("click", function() {

        localStorage.removeItem("totalKey");
        localStorage.removeItem("orderKey");

        location.replace("../index.html");

    })
    
}

function formatPrice(price) {
    return (price / 100).toFixed(2)
}

/********************************************************/


/********************************************************
*** GESTION INITIALIZE
*********************************************************/

function initialize() {
    createBasket();
    indicatorNbOfItemInBasket();
}

initialize();

