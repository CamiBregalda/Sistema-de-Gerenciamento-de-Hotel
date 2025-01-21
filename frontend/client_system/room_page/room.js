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
            <hr/>
            <div>
                <p>${quarto.descricao}</p>
                <p> <b>preço: </b>R$ ${quarto.precoPorNoite},00</p>
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
        classeQuartoContainer.innerHTML = `<p>Erro ao carregar os pacotes. Tente novamente mais tarde.</p>`;
    }
}

function configuraCarrosseis(container) {
    const carrosselContainers = container.querySelectorAll('.carrossel');

    carrosselContainers.forEach(carrosselContainer =>{
        const imagens = carrosselContainer.querySelectorAll('.foto img');
        const btnAnterior = carrosselContainer.querySelector('.prev');
        const btnProximo = carrosselContainer.querySelector('.next');

        let indexAtual = 0;

        function atualizar() {
            imagens.forEach((imagem, index) => {
                imagem.style.display = index === indexAtual ? 'block' : 'none';
            });
        }

        btnAnterior.addEventListener('click', () =>{
            indexAtual = (indexAtual - 1 + imagens.length) % imagens.length;
            atualizar();
        });

        btnProximo.addEventListener('click', () =>{
            indexAtual = (indexAtual + 1) % imagens.length;
            atualizar();
        });

    });
}

carregarQuartos(quartoArvoreClasse, quarto => !quarto.subterraneo);
carregarQuartos(quartoSoloClasse, quarto => quarto.subterraneo);