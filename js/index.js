//<!-- window est la fenetre du navigateur, onload est un evenement qui est declanché au chargement de la page  qui appele la fonction() -->


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
                            <a href="./html/product.html" class="btn btn-primary">Choisir</a>
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

// Fin code produit


// Création de Panier
function createPanier() {

  if (localStorage.getItem('panierKey') == null) {
      
      let panierArray = [];
      let panierArrayStr = JSON.stringify(panierArray);
      localStorage.setItem("panierKey", panierArrayStr);
      
  }
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
          <div><a href="../index.html" class="oricam"><h1>Orin'Cam</h1></a></div>
      
          <nav>
              <a href="html/basket.html" id="panier">
                  <div class="nb-articles cache"> ${nbArticleInPanier} </div>
                  <i class="fa-solid fa-basket-shopping"></i>
                  <p>Panier</p>
              </a>
              
          </nav>
      </div>
      `;

      let affichageNbArticlesPanier = document.querySelector(".nb-articles");
      affichageNbArticlesPanier.classList.remove("cache");
  }
}


// Fin code Panier

