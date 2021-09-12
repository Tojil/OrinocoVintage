//<!-- window est la fenetre du navigateur, onload est un evenement qui est declanché au chargement de la page  qui appele la fonction() -->
window.onload = function() {
  console.log("hello");
  getAllCameras();
  getHeader();
}

// Dans index.html appel reseaux et affichage des cameras

let contain = document.getElementById("camera-container")

function getAllCameras() {
    fetch("http://localhost:3000/api/cameras")
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
      let nbOfValue = value.length
      console.log(nbOfValue)
      for(let i = 0; i < nbOfValue; i++) {
        document
        .getElementById("camera-container")
        .innerHTML += `<div >
                        <div class='card' style='width: 18rem;'>
                          <img src='${value[i].imageUrl}' class="card-img-top" alt="Camera Vintage">
                          <div class="card-body">
                            <h3 class="card-title">${value[i].name}</h3>
                            <p class="card-text">${value[i].description}</p>
                            <p>${value[i].price} EUR</p>
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

function getProduct() {
  let produitId = getAllCameras.value[i].id
  .then(function(i){
    if (i = 0) {

    }
  })


}

// Fin code produit
// Code pour le Panier dans basket.html

