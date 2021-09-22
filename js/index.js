//getAllCameras()



// Dans index.html appel reseaux et affichage des cameras

let contain = document.getElementById("camera-container")
let mainArticle = document.getElementById("main_Article")
let urlApi = "http://localhost:3000/api/cameras";

function getAllCameras() {
    fetch("http://localhost:3000/api/cameras")
    .then(function(res) {
    //   console.log(res)
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
                            <p>${(relPrice / 100).toFixed(2)} EUR</p>
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
            document
            .getElementById("main_Article")
            .innerHTML = `<div >
                            <div class='card' style='width: 18rem;'>
                            <img src='${value.imageUrl}' class="card-img-top" alt="Camera Vintage">
                            <div class="card-body">
                                <h3 class="card-title">${value.name}</h3>
                                <p class="card-text">${value.description}</p>
                                <p>${(value.price / 100).toFixed(2)} EUR</p>
                                <a href="./html/product.html?id=${value._id}" class="btn btn-primary" id="${value._id}" class="lien">Choisir</a>
                                </div>
                            </div>
                            </div>`;
            // .innerHTML = `<div >
            //                 <div class='card' style='width: 18rem;'>
            //                 <img src='${value.imageUrl}' class="card-img-top" alt="Camera Vintage">
            //                 <div class="card-body">
            //                     <h3 class="card-title">${value.name}</h3>
            //                     <p class="card-text">${value.description}</p>
            //                     <p>${(relPrice / 100).toFixed(2)} EUR</p>
            //                     <a href="./html/product.html?id=${value._id}" class="btn btn-primary" id="${value._id}" class="lien">Choisir</a>
            //                     </div>
            //                 </div>
            //                 </div>`;
        
      //  mainArticle.appendChild()
    })
        .catch(function(err) {
        // Une erreur est survenue
    })
}

// Fin Produit

// Debut creation panier

// Fin Panier
