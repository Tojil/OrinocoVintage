//getAllCameras()

let selectedCamera = undefined;

// Dans index.html appel reseaux et affichage des cameras

let contain = document.getElementById("camera-container")
let mainArticle = document.getElementById("main_Article")
let urlApi = "http://localhost:3000/api/cameras";

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
                            <p class="card-price">${(relPrice / 100).toFixed(2)} EUR</p>
                            <a href="./html/product.html?id=${value[i]._id}" class="btn btn-primary" id="${value[i]._id}" class="lien">Choisir</a>
                            </div>
                          </div>
                        </div>`
      }
      contain.appendChild()
    })

    .catch(function(err) {
    // Une erreur est survenue
    })
}

// Debut Produit dans product.html 

function getProduit() {
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
            document
            .getElementById("main_Article")
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
        
      createPanier()
      addLenses()
      ajoutAuPanier()

      // Création de Panier
      function createPanier() {

        if (localStorage.getItem('panierKey') == null) {
            
            let panierArray = [];
            let panierArrayStr = JSON.stringify(panierArray);
            localStorage.setItem("panierKey", panierArrayStr);
            
        }
      }
      
      // Ajout des lenses dans les cameras
      function addLenses() {

        const lensesIndex = document.querySelector('#lenses');
        
        for (let nbLenses = 0; nbLenses < value.lenses.length; nbLenses++) {
            lensesIndex.innerHTML += 
            `<option class="optionLenses" value="${value.lenses[nbLenses]}">${value.lenses[nbLenses]}</option>`
        };
      }

      // Ajout l'article de la page au panier
      function ajoutAuPanier() {

        const buttonSendPanier = document.querySelector("button");

        buttonSendPanier.addEventListener("click", function(event) {

            event.preventDefault();

            // creer differentes constantes avec les valeurs de l'articleChoisi
            const nameArticleChoisi = document.querySelector("h2");
            const urlArticleChoisi = window.location.search;
            const lenseChoisi = document.querySelector("#lenses");
            const prixArticleChoisi = document.querySelector(".card-price");
            
            // creer constante avec les proprietes de l'articleChoisi
            const articleChoisi = {
                name: nameArticleChoisi.textContent,
                id: urlArticleChoisi.slice(1),
                lense: lenseChoisi.options[lenseChoisi.selectedIndex].text,
                price: prixArticleChoisi.textContent
            };

            // converti en String JSON articleChoisi 
            const stringArticleChoisi = JSON.stringify(articleChoisi)

            // creer variable avec panierKey qui se trouve dans localStorage
            let getPanier = localStorage.getItem("panierKey");

            // creer variable avec getPanier et le converti en valeur JS
            let numGetPanier = JSON.parse(getPanier);

            // ajoute stringActicleChoisi dans numGetPanier
            numGetPanier.push(stringArticleChoisi);

            // creer variable avec numGetPanier converti en String JSON
            let strNumGetPanier = JSON.stringify(numGetPanier);

            // stock en localStorage panierKey avec la valeur strNumGetPanier en string JSON
            localStorage.setItem("panierKey", strNumGetPanier);

            // appel la fonction du nombre d'articles
            indicateurNbArticlePanier()
        }) 
      }

      // Indicateur du nombre d'articles dans le panier
      function indicateurNbArticlePanier() {

        let getPanier = localStorage.getItem("panierKey");

        let arrayGetPanier = JSON.parse(getPanier);
        const nbArticleInPanier = arrayGetPanier.length;
        
        if (nbArticleInPanier > 0) {

            const headerReload = document.querySelector("header");
            headerReload.innerHTML =
            `
            <div class="into-header">
                <div><a href="index.html">Ori'Cam</a></div>
            
                <nav>
                    <a href="basket.html" id="panier">
                        <div class="nb-articles cache"> ${nbArticleInPanier} </div>
                        <i class="fas fa-shopping-basket"></i>
                        <p>Panier</p>
                    </a>
                </nav>
            </div>
            `;

            let affichageNbArticlesPanier = document.querySelector(".nb-articles");
            affichageNbArticlesPanier.classList.remove("cache");
        }
      }
  
        tableOfProducts()

        .catch(function(err) {
        // Une erreur est survenue
    })
  })
}

