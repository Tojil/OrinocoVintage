const { query } = require("express")

getAllCameras()
getProduit()


// Dans index.html appel reseaux et affichage des cameras

let contain = document.getElementById("camera-container")

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
                            <p>${(relPrice / 100).toFixed(2)} EUR</p>
                            <a href="./html/product.html?id=${value[i]._id}" class="btn btn-primary" id="${value[i]._id}" class="lien">Choisir</a>
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

let mainArticle = document.querySelector("#mainArticle")

function getProduit() {
    fetch("http://localhost:3000/api/cameras")
    .then(function(res) {
    //   console.log(res)
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
        let nbOfValue = value.length
        fetch("http://localhost:3000/api/cameras" + idProduit)
        for(let i = 0; i < nbOfValue; i++) {
            let idProduit = value[i]._id
            let urlProduit = "./html/product.html" + idProduit
            fetch(urlProduit)
            document
            .getElementsByClassName("btn")
            .addEventListener("btn", onclick)
            .getElementById("mainArticle")
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
        console.log(value)
    })
        .catch(function(err) {
        // Une erreur est survenue
    })
}