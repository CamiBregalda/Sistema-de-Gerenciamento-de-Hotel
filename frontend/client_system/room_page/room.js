//caminho para arquivo JSON
const quartosJson= "../../json/quartos-hotel.json";

const quartoArvoreClasse = document.querySelector('.quartoArvore');
const quartoSoloClasse = document.querySelector('.quartoSolo');


async function carregarQuartos0() {
    try {
        // Carregando os dados do arquivo JSON
        const response = await fetch(quartosJson);

        // Verificando se o arquivo foi encontrado
        if (!response.ok) {
            throw new Error(`Erro ao carregar o arquivo JSON: ${response.statusText}`);
        }

        // Convertendo os dados para JSON
        const quartos = await response.json();

        // Iterando sobre os quartos e adicionando ao HTML
        quartos.forEach(quarto => {
        
            console.log("passou aqui");

            if(quarto.subterraneo != true){

                console.log("passou aqui"); 

                quarto.imagens.forEach(imagem =>{
                
                const quartoHTML = `
                    <div class="room">

                        <img src="../../img/quartos/${imagem}" alt="">
                        <div>
                            <h3>${quarto.id}</h3>
                            <p>${quarto.descricao}</p>
                            <p>${quarto.preco}</p>
                            <button> comprar </button>
                        </div>
                    </div>
                `;

                quartoArvoreClasse.innerHTML += quartoHTML;
            })   
            }
          
        });

    } catch (error) {
        console.error(error);
        quartoArvoreClasse.innerHTML = `<p>Erro ao carregar os pacotes. Tente novamente mais tarde.</p>`;
    }
}

async function carregarQuartos1() {
    try {
        // Carregando os dados do arquivo JSON
        const response = await fetch(quartosJson);

        // Verificando se o arquivo foi encontrado
        if (!response.ok) {
            throw new Error(`Erro ao carregar o arquivo JSON: ${response.statusText}`);
        }

        // Convertendo os dados para JSON
        const quartos = await response.json();

        // Iterando sobre os quartos e adicionando ao HTML
        quartos.forEach(quarto => {

            if(quarto.subterraneo == true){

                quarto.imagens.forEach(imagem =>{
                
                const quartoHTML = `
                    <div class="room">

                        <img src="../../img/quartos/${imagem}" alt="">
                        <div>
                            <h3>${quarto.id}</h3>
                            <p>${quarto.descricao}</p>
                            <p>${quarto.preco}</p>
                            <button> comprar </button>
                        </div>
                    </div>
                `;

                quartoSoloClasse.innerHTML += quartoHTML;
            })   
            }

          
        });

    } catch (error) {
        console.error(error);
        quartoSoloClasse.innerHTML = `<p>Erro ao carregar os pacotes. Tente novamente mais tarde.</p>`;
    }
}

carregarQuartos0();
carregarQuartos1();