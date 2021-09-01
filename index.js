class Camera {
  constructor(lens, id, name, price, description, imageUrl) {
    this.lens = lens;
    this.id = id;
    this.name = name
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }
}

let firstCamera = new Camera 



function card() {
    fetch("http://localhost:3000/api/cameras")
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(res) {
      document
          .getElementById("card-title")
          .innerText = res.name;
    })
    .catch(function(err) {
    // Une erreur est survenue
    });
  }