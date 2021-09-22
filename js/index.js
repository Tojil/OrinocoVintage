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



//let chosenProduct = document.getAllCameras()._id
//console.log(chosenProduct)

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
                                <h3 class="card-title">${value.name}</h3>
                                <p class="card-text">${value.description}</p>
                                <p class="card-price">${(value.price / 100).toFixed(2)} EUR</p>
                                <form>
                                <label for="lenses">Choisir l'objectif :</label>
                                <select name="lenses" id="lenses">
                                
                                </select>
                
                                <button id=${value._id}>Ajouter au panier</button>
                                </form>
                                <a href="../index.html" class="retour flex items-center  ">
                                Retour
                                </a>
                              </div>
                            </div>
                          </div>`;
        
      //  mainArticle.appendChild()
      addLenses()
      ajoutAuPanier()
      // Ajout des lenses dans les cameras
      function addLenses() {

        const lensesIndex = document.querySelector('#lenses');
        
        for (let nbLenses = 0; nbLenses < value.lenses.length; nbLenses++) {
            lensesIndex.innerHTML += 
            `<option class="optionLenses" value="${value.lenses[nbLenses]}">${value.lenses[nbLenses]}</option>`
        };
      }

      function ajoutAuPanier() {

        const buttonSendPanier = document.querySelector("button");

        buttonSendPanier.addEventListener("click", function(event) {

            event.preventDefault();

            const nameArticleChoisi = document.querySelector("h3");
            const urlArticleChoisi = window.location.search;
            const lensesChoisi = document.querySelector("#lenses");
            const prixArticleChoisi = document.querySelector(".card-price");
            
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
    })

        .catch(function(err) {
        // Une erreur est survenue
    })
}

// Fin Produit

// Debut Création de Panier
function createPanier() {

  if (localStorage.getItem('panierKey') == null) {
      
      let panierArray = [];
      let panierArrayStr = JSON.stringify(panierArray);
      localStorage.setItem("panierKey", panierArrayStr);
      
  }
}
// Fin Panier
