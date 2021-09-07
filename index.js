
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
        .innerHTML += `<div class='card' style='width: 18rem;'>
                        <img src='${value[i].imageUrl}' class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${value[i].name}</h5>
                          <p class="card-text">${value[i].description}</p>
                          <p>${value[i].price} EUR</p>
                          <a href="#" class="btn btn-primary">Choisir</a>
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