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
                                <h3 class="card-title">${value.name}</h3>
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
        
      //  mainArticle.appendChild()
      createPanier()
      addLenses()
      ajoutAuPanier()
      tableOfProducts()
      
      // Ajout des lenses dans les cameras
      function addLenses() {

        const lensesIndex = document.querySelector('#lenses');
        
        for (let nbLenses = 0; nbLenses < value.lenses.length; nbLenses++) {
            lensesIndex.innerHTML += 
            `<option class="optionLenses" value="${value.lenses[nbLenses]}">${value.lenses[nbLenses]}</option>`
        };
      }

      // Debut Création de Panier

      // Comportement du panier au survol pour affichage de son contenu

      var timeout;

      $for('#panier').on({
        mouseenter: function() {
          $('#panier-dropdown').show();
        },
        mouseleave: function() {
          timeout = setTimeout(function() {
            $('#panier-dropdown').hide();
          }, 200);
        }
      })

      // Laisse le contenu ouvert à son survol
      // Le cache quand la souris sort

      $('#panier-dropdown').on({
        mouseenter: function() {
          clearTimeout(timeout);
        },
        mouseleave: function() {
          $('#panier-dropdown').hide;
        }
      });

      // Creation du panier

        function createPanier() {

          let panier = []
          panier.push(selectedCamera)
          localStorage.setItem("panierKey", panier)

          if (localStorage.getItem('panierKey') == null) {
              let panierArrayStr = JSON.stringify(panier);
              localStorage.setItem("panierKey", panierArrayStr);
          }
        }

        function Camera(name,lense,price) {
          this.name = name,
          this.lense = lense,
          this.price = price
        }

      let produits = new Camera(selectedCamera.name, selectedCamera.lense[""], selectedCamera.price);

      })

      const buttonSendPanier = document.querySelector("button");
      buttonSendPanier.addEventListener("click", function(event) {
        
      event.preventDefault();
      
      panier.push(produits)

      function tableOfProducts() {
        let listOfProducts = ``;
        camerasSelected.forEach(prod => 
          listOfProducts += `
          <thead class="articles-titre">
            <tr>
                <th>NOM</th>
                <th>COULEUR</th>
                <th>PRIX</th>
            </tr>
          </thead>
          <div class="paniervide">Votre panier est vide <i class="far fa-frown"></i></div>
          `
          )
          document.getElementsById("liste-panier").innerHTML = listOfProducts
        }
      })
        .catch(function(err) {
        // Une erreur est survenue
    })
}

// Fin Produit



// Fin Panier
