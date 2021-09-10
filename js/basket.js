createPanier()
indicateurNbArticlePanier()


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

        const headerReload = document.querySelector("header");
        headerReload.innerHTML =
        `
        <div class="into-header">
            <div><a href="index.html">Orin'ours</a></div>
        
            <nav>
                <a href="panier.html" id="panier">
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