//caminho para arquivo JSON
const quartosJson = "../../json/quartos-hotel.json";

const quartoArvoreClasse = document.querySelector('.quartoArvore');
const quartoSoloClasse = document.querySelector('.quartoSolo');


function criarCarrossel(imagens) {
    //map juntamente ao join está transformando o array das imagens, em uma string com várias img
    return `
        <div class="carrossel">
            <button class="prev">&lt;</button>
            <div class="foto">
                ${imagens.map(imagem => `
                    <img src="../../img/quartos/${imagem}" alt="Imagem do quarto">
                `).join('')}
            </div>
            <button class="next">&gt;</button>
        </div>`;
}

function criarDescricao(quarto) {
    return `
        <div class = "texto">
            <h3>${quarto.id}</h3>
            <div>
                <p>${quarto.descricao}</p>
                <p> preço: ${quarto.preco}</p>
                <button> comprar </button>
            </div>
        </div>
    `
}

//classeQuartoContainer será o DOM dos dois tipos de quarto que serão inseridos
//filtro define quais quartos poderão ou não ser exibidos
async function carregarQuartos(classeQuartoContainer, filtro) {
    try {
        // Carregando os dados do arquivo JSON
        const response = await fetch(quartosJson);

        // Verificando se o arquivo foi encontrado
        if (!response.ok) {
            throw new Error(`Erro ao carregar o arquivo JSON: ${response.statusText}`);
        }

        // Convertendo os dados para JSON
        const quartos = await response.json();

        const quartosFiltrados = quartos.filter(quarto => filtro(quarto));

        quartosFiltrados.forEach( quarto => {
            const quartoHTML = `
                <div class="quarto">
                    ${criarCarrossel(quarto.imagens)}
                    ${criarDescricao(quarto)}
                </div>
            `;
           
            classeQuartoContainer.innerHTML += quartoHTML;
        })

        //configura os carrosséis
        configuraCarrosseis(classeQuartoContainer);

    } catch (error) {
        console.error(error);
        quartoArvoreClasse.innerHTML = `<p>Erro ao carregar os pacotes. Tente novamente mais tarde.</p>`;
    }
}

function configuraCarrosseis(container) {
    const carrosselContainers = container.querySelectorAll('.carrossel');

    carrosselContainers.forEach(carrosselContainer =>{
        const carrossel = carrosselContainer.querySelector('.foto');
        const btnAnterior = carrosselContainer.querySelector('.prev');
        const btnProximo = carrosselContainer.querySelector('.next');

        const numImagens = carrossel.children.length;

        let indexAtual = 0;

        function atualizar(){
            carrossel.style.transform = `translateX(-${indexAtual * 100}%)`; //mover a imagem de maneira horizontal
        }

        btnAnterior.addEventListener('click', () =>{
            indexAtual = (indexAtual - 1 + numImagens) % numImagens;
            atualizar();
        });

        btnProximo.addEventListener('click', () =>{
            indexAtual = (indexAtual + 1) % numImagens;
            atualizar();
        });

    });
}

carregarQuartos(quartoArvoreClasse, quarto => !quarto.subterraneo);
carregarQuartos(quartoSoloClasse, quarto => quarto.subterraneo);