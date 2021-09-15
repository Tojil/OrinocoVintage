getAllCameras()
getProduct()
createPanier()
indicateurNbArticlePanier()
nbArticlesDansPanier()


// Dans index.html appel reseaux et affichage des cameras

let contain = document.getElementById("camera-container")

function getAllCameras() {
    fetch("http://localhost:3000/api/cameras")
    .then(function(res) {
      console.log(res)
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
      console.log(value)
      let nbOfValue = value.length
      console.log(nbOfValue)
      for(let i = 0; i < nbOfValue; i++) {
        let relPrice = value[i].price
        document
        .getElementById("camera-container")
        .innerHTML += `<div >
                        <div class='card' style='width: 18rem;'>
                          <img src='${value[i].imageUrl}' class="card-img-top" alt="Camera Vintage">
                          <div class="card-body">
                            <h3 class="card-title">${value[i].name}</h3>
                            <p class="card-text">${value[i].description}</p>
                            <p>${relPrice / 100}.00 EUR</p>
                            <a href="./html/product.html" class="btn btn-primary" id="${value[i]._id}" class="lien">Choisir</a>
                            </div>
                          </div>
                        </div>`
      }
      contain.appendChild()
      console.log(value)
    })

    .catch(function(err) {
    // Une erreur est survenue
    })
}

// debut Code pour le Produit dans product.html

let containMain = document.getElementById("mainArticle")

function getProduct() {
  fetch("http://localhost:3000/api/cameras")
  .then(function(res) {
    console.log(res)
    if (res.ok) {
      return res.json();
    }
  })
}

mainIndex()


function mainIndex(){

    const mainIndex = document.querySelector("#mainIndex");
    const msgAccueil = document.querySelector(".msg-accueil");
    const body404 = document.querySelector("body");

    let urlApi = `http://localhost:3000/api/cameras/`;

    fetch(urlApi)
    .then(function(response) {
        // exécution en cas d'erreur
        problemErrorServeur()

        function problemErrorServeur() {
            if (response.status >= 400 && response.status < 600) {
                const codeErreur = response.status;
    
                body404.innerHTML = 
                `<header>
                    <div class="into-header">
                        <div><a href="index.html">Orin'ours</a></div>
                        
                        <nav>
                            <a href="panier.html" id="panier">
                                <div class="nb-articles cache"> </div>
                                <i class="fas fa-shopping-basket"></i>
                                <p>Panier</p>
                            </a>
                            
                        </nav>
                    </div>
                </header>
        
                <main id="main404">
    
                    <div id="bloc404">
    
                        <div class="text404">
                            <h1>OUPS !</h1>
                            <h2>La page que vous cherchez semble introuvable.</h2>
                            <p>Code erreur : <span>${codeErreur}</span></p>
                            <a href="index.html">Réactualiser</a>
                
                        </div>
                
                        <div class="img404">
                            <img src="./images/teddy4044.jpg" alt="ours triste">
                        </div>
    
                    </div>
    
                </main>
        
                <footer>
        
                    <div class="footer_div_centrale">
                        <section>
                            <h3>A PROPOS</h3>
                            <a href="">Conditions générales de ventes</a>
                            <a href="">Conditions générales d'utilisation</a>
                            <a href="">Données personnelles</a>
                            <a href="">Mentions</a>
                        </section>
                        <section>
                            <h3>SERVICES</h3>
                            <a href="">SAV</a>
                            <a href="">Besoin d'aide ?</a>
                            <a href="">Contactez-nous</a>
                        </section>
                        <section>
                            <h3>LE GROUPE ORINOCO</h3>
                            <a href="">A propos d'Orinours</a>
                            <a href="">Recrutement</a>
                            <a href="">Groupe Orinoco</a>
                        </section>
                        <section>
                            <h3>NOS AUTRES SITES</h3>
                            <a href=""><i class="fas fa-tshirt"></i>Oritextil</a>
                            <a href=""><i class="fas fa-book"></i>Oribook</a>
                            <a href=""><i class="fas fa-camera"></i>Oricam</a>
                            <a href=""><i class="fas fa-chair"></i>Orikea</a>
                        </section>
                        <section>
                            <h3>PAIEMENTS</h3>
                            <div id="footer_paiement">
                                <i class="fab fa-cc-paypal"></i>
                                <i class="fab fa-cc-visa"></i>
                                <i class="fab fa-cc-mastercard"></i>
                            </div>
                        </section>
                    </div>
            
                    <div id="copyright" class="footer_div_centrale">
                        <p><i class="far fa-copyright"></i>2021 - Tous droits réservés - Orinoco & filiales </p>
                    </div>
        
                </footer>`;
            }
        }

        return response.json();

    })
    .then(function(response) {

        const objets = response;
        const nombreDeCameras = objets.length;

        creationCartePourProduits()
        bientotNouveauProduits()


        function bientotNouveauProduits() {
            // création d'une carte si le nombre de produits est impair
            if (nombreDeCameras%2) {

                let bientotNewCamera = document.createElement("bientot");
                bientotNewCamera.classList.add("bientot");
                bientotNewCamera.innerHTML = 
                `<div class="text_bientot"> Bientôt <br>
                de nouvelles<br> 
                cameras<br>disponibles</div>`;

                mainIndex.appendChild(bientotNewPeluche);
            }
        }
        
        function creationCartePourProduits() {
            // Répartition des objets en forme de carte
            for (let objet in objets) {
            
                msgAccueil.classList.add("cache");

                const priceEuro = convertPrice(objets[objet].price);
                const urlForEachArticle = "article.html" + "?" + objets[objet]._id;
            
                let objetCarte = document.createElement("div");
                objetCarte.classList.add("card");
                objetCarte.innerHTML =
                `<div class="bloc-img">
                <img src=${objets[objet].imageUrl}>
                </div>
                <h3>${objets[objet].name}</h3>
                <div class="prix">${priceEuro} €</div>
                <a href=${urlForEachArticle} id=${objets[objet]._id} class="lien"> Choisir </a>`;
        
                mainIndex.appendChild(objetCarte);
            }
        }
    })
    .catch((error) => {
        // Message d'erreur si problème de serveur
        function problemeServeur() {

            msgAccueil.classList.add("cache");
            mainIndex.innerHTML = 
            `<div class="cardError">
                <p> Désolé, nous n'avons pas pu charger les articles.</p> 
                <p> Vérifier que le serveur soit bien fonctionnel.</p>
            </div>`;
            
        }

        problemeServeur()
        
    });
}

// Création de Panier
function createPanier() {

  if (localStorage.getItem('panierKey') == null) {
      
      let panierArray = [];
      let panierArrayStr = JSON.stringify(panierArray);
      localStorage.setItem("panierKey", panierArrayStr);
      
  }
}

// Converssion du prix
function convertPrice(price) {
    return (price / 100);
}

// Indicateur du nombre d'articles dans le panier
function indicateurNbArticlePanier() {

  let getPanier = localStorage.getItem("panierKey");

  let arrayGetPanier = JSON.parse(getPanier);
  const nbArticleInPanier = arrayGetPanier.length;
  
  if (nbArticleInPanier > 0) {

      const headerReload = document.querySelector(".into-header");
      headerReload.innerHTML =
      `
        <div><a href="../index.html" class="oricam"><h1>Ori'Cam</h1></a></div>
        <nav>
            <a href="html/basket.html" id="panier">
                <div class="nb-articles cache"> ${nbArticleInPanier} </div>
                <i class="fa-solid fa-basket-shopping"></i>
                <p>Panier</p>
            </a>
        </nav>
      `;

      let affichageNbArticlesPanier = document.querySelector(".nb-articles");
      affichageNbArticlesPanier.classList.remove("cache");
  }
}

mainArticle()

function mainArticle() {

    const urlWindow = window.location.search;
    let idArticle = urlWindow.slice(1);
    let urlArticle = `http://localhost:3000/api/cameras` + idArticle;

    const mainArticle = document.querySelector("#mainArticle");

    fetch(urlArticle)
    .then(response => response.json()

    .then(function(response) {

        const articleCameras = response;
        const lenses = response.lenses;

        const priceEuro = convertPrice(articleCameras.price);

        createCartes();
        addLenses();
        ajoutAuPanier();

        // Création des cartes
        function createCartes() {
            let articleCarte = document.createElement("div");
            articleCarte.classList.add("article");
    
            articleCarte.innerHTML = 
            `
            <img id="article-img" src=${articleCameras.imageUrl} alt="camera vintage">
    
            <section id="bloc-article-text">
                <h2 class="nameArticle">${articleCameras.name}</h2>
                <div class="descriptionArticle"> ${articleCameras.description} </div>
                <div class="prixArticle">${priceEuro} €</div>
    
                <form>
                    <label for="lenses">Choisir la couleur :</label>
                    <select name="lenses" id="lenses">
                    
                    </select>
    
                    <button id=${articleCameras._id}>Ajouter au panier</button>
                </form>
    
                <a href="index.html" class="retour flex items-center  ">
                Retour
                </a>
            </section>
            `;
    
            mainArticle.appendChild(articleCarte);
        }

    
        // Ajout des lenses dans les cameras
        function addLenses() {

            const lensesIndex = document.querySelector('#lenses');
            
            for (let nbLenses = 0; nbLenses < lenses.length; nbLenses++) {
                lensesIndex.innerHTML += 
                `<option class="optionLenses" value="${lenses[nbLenses]}">${lenses[nbLenses]}</option>`
            };
        }

        // Ajout l'article de la page au panier
        function ajoutAuPanier() {

            const buttonSendPanier = document.querySelector("button");

            buttonSendPanier.addEventListener("click", function(event) {
    
                event.preventDefault();

                const nameArticleChoisi = document.querySelector("h2");
                const urlArticleChoisi = window.location.search;
                const lensesChoisi = document.querySelector("#lenses");
                const prixArticleChoisi = document.querySelector(".prixArticle");
                
                const articleChoisi = {
                    name: nameArticleChoisi.textContent,
                    id: urlArticleChoisi.slice(1),
                    color: lensesChoisi.options[lensesChoisi.selectedIndex].text,
                    price: prixArticleChoisi.textContent
                };

                const stringArticleChoisi = JSON.stringify(articleChoisi)

                let getPanier = localStorage.getItem("panierKey");

                let numGetPanier = JSON.parse(getPanier);

                numGetPanier.push(stringArticleChoisi);

                let strNumGetPanier = JSON.stringify(numGetPanier);

                localStorage.setItem("panierKey", strNumGetPanier);

                indicateurNbArticlePanier()
            }) 
        }
    }));
}

// Fin code produit

// Pour la page panier

function pagePanier() {

    let getPanier = localStorage.getItem("panierKey");
    let numGetPanier = JSON.parse(getPanier);
    
    if (numGetPanier.length == 0) {
        const messagePanierVide = document.querySelector(".paniervide ")
        messagePanierVide.classList.remove("cache");
    }

    for (let articleChoisi in numGetPanier) {
    
        let articlePanier = numGetPanier[articleChoisi];
        let convertInArray = JSON.parse(articlePanier);
        
        const tableauPanier = document.querySelector("#liste-panier");

        let carteFormatPanier = document.createElement("div");
        carteFormatPanier.classList.add("articles-panier-beta")
        carteFormatPanier.innerHTML = 
        `
        <div class="name"> ${convertInArray.name} </div>
        <div class="color"> ${convertInArray.color} </div>
        <div class="price"> ${convertInArray.price} </div>
        `;

        tableauPanier.appendChild(carteFormatPanier);

    }

    addButtonDelete();

    function addButtonDelete() {

        numOfArticles = numGetPanier.length;
        let i = 0

        for (i; i < numOfArticles; i++) {
            let artPanier = document.querySelector(".articles-panier-beta");
            artPanier.innerHTML += 
            `<div class="delete" id=${i} onclick="deleteArt(id)"><i class="fas fa-trash-alt"></i></div>`;
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
        let newStrBasis = strBasis.substring(0, strBasis.length - 2);
        let convertStrInNum = parseInt(newStrBasis);

        totalPanier += convertStrInNum;
    }
    
    const affichageTotal = document.querySelector("#panierTotaux");
    let blocTotal = document.createElement("div");
    blocTotal.innerHTML =
    `<span>TOTAL :</span><span class="totalPanierN">${totalPanier} €</span>`;

    affichageTotal.appendChild(blocTotal);
    
}


function deleteArt(indexDel) {

    let getPanierForDel = JSON.parse(localStorage.getItem("panierKey"));
    getPanierForDel.splice(indexDel, 1);
    const newPanier = JSON.stringify(getPanierForDel);
    localStorage.setItem("panierKey", newPanier);
    
    alert("Votre article à bien été supprimé");
    setTimeout(300);
    window.location.reload();
    
}


function nbArticlesDansPanier() {

    let getPanier = localStorage.getItem("panierKey");
    let arrayGetPanier = JSON.parse(getPanier);
    const nbArticleInPanier = arrayGetPanier.length;

    if (nbArticleInPanier == 1) {

        let titrePanier = document.querySelector(".panier-art-titre");
        titrePanier.innerText = `Votre article`

    } else if (nbArticleInPanier > 1) {

        let titrePanier = document.querySelector(".panier-art-titre");
        titrePanier.innerText = `Vos ${nbArticleInPanier} articles`

    } else {

    }
}

//-------------------------------------------
// Formulaire panier Validation
//-------------------------------------------
let form = document.querySelector("#contact")

verifForm()
envoieFormulaire()


function envoieFormulaire() {

    let button = document.querySelector("button");

    button.addEventListener('click', function(e) {

        e.preventDefault();

        let getPanier = localStorage.getItem("panierKey");
        let numGetPanier = JSON.parse(getPanier);


        if (validLetter(form.firstName) && validLetter(form.lastName) && validAddress(form.address) && validLetter(form.city) && validEmail(form.email)) {
            
            if (numGetPanier == 0) {
                
                alert ("Vous ne pouvez pas commander un panier qui est vide, veuillez sélectionner un article au minimum");

            } else {

                // Récupération des srtings articles du panier
                let products = [];

                for (let articleInPanier in numGetPanier) {
    
                    let articlePanier = numGetPanier[articleInPanier];
                    let convertInArray = JSON.parse(articlePanier);
                    
                    let getIdArtPanier = convertInArray.id;
                    
                    products.push(getIdArtPanier);
                    
                }
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


                // Envoie des données avec FETCH
                fetch("http://localhost:3000/api/cameras/order",
                {
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({contact, products})
                })
                .then(response => response.json())
                .then(function(response) {

                    let objetRetour = response;

                    console.log(objetRetour["orderId"]);
                    localStorage.setItem("orderKey", objetRetour["orderId"]);
                    
                    let totaldupanier = document.querySelector(".totalPanierN");
                    localStorage.setItem("totalKey", totaldupanier.textContent);


                    alert("Veuillez cliquer sur OK pour comfirmer votre commande.");
                    location.replace("commande.html");
                })
                .catch(function(error){

                    console.log(error)

                })

            }

        } else {

            if (numGetPanier == 0) {
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


// Fin code Panier

