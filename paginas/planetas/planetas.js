let currentPageUrl = 'https://swapi.dev/api/planets/'

window.onload = async() => {
    try{
      await loadCharacters(currentPageUrl);
    } catch (error) {
      console.log(error);
      alert('Erro ao carregar cards');
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
};

async function loadCharacters(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''; // limpar os resultados anteriores 

    try {

        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach(async (character) => {
            const card = document.createElement("div");
            let urlImg = `https://starwars-visualguide.com/assets/img/planets/${character.url.replace(/\D/g, "")}.jpg`;
            const response = await fetch(urlImg)
            if(response.status == '404'){
                urlImg = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
            }
            card.style.backgroundImage = `url('${urlImg}')`;
            card.className = 'cards';

            const characterNameBG = document.createElement("div")
            characterNameBG.className = "character-name-bg"

            const characterName = document.createElement("span")
            characterName.className = "character-name"
            characterName.innerText = `${character.name}`

            characterNameBG.appendChild(characterName)
            card.appendChild(characterNameBG)

            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ''

                const characterImage = document.createElement("div")
                characterImage.style.backgroundImage = 
                `url('https://starwars-visualguide.com/assets/img/planets/${character.url.replace(/\D/g, "")}.jpg')`
                characterImage.className = "character-image"

                const name = document.createElement("span")
                name.className = "character-details"
                name.innerText = `Nome: ${character.name}`;

                const rotationPeriod = document.createElement("span")
                rotationPeriod.className = "character-details"
                rotationPeriod.innerText = `Periodo de rotacao: ${character.rotation_period}`;

                const climate = document.createElement("span")
                climate.className = "character-details"
                climate.innerText = `Clima: ${character.climate}`;

                const population = document.createElement("span")
                population.className = "character-details"
                population.innerText = `Populaçao: ${character.population}`;

                const gravity = document.createElement("span")
                gravity.className = "character-details"
                gravity.innerText = `Gravidade: ${character.gravity}`;

                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(rotationPeriod)
                modalContent.appendChild(climate)
                modalContent.appendChild(population)
                modalContent.appendChild(gravity)
            
            }

            mainContent.appendChild(card)
        });

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.disabled = !responseJson.next
    backButton.disabled = !responseJson.previous
    
    backButton.style.visibility = responseJson.previous? "visible" : "hidden"

        currentPageUrl = url 

    } catch (error) {
    alert('Erro ao carregar os Planetas')
    console.log(error)
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a próxima página')
    }
} 

async function loadPreviousPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.previous)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a página anterior')
    }
} 

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
} 


function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
}


  function animarMenu(){
    const btn = document.getElementById('btn-menu')
    btn.classList.toggle('ativar') 
    menuDiv.classList.toggle('abrir')
    btnAnimar.classList.toggle('ativo')
}
  

  const menuDiv = document.getElementById('menu-mobile')
  const btnAnimar = document.getElementById('btn-menu')

  menuDiv.addEventListener('click', animarMenu)
