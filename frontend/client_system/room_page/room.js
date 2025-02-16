const quartoArvoreClasse = document.querySelector('.quartoArvore');
const quartoSoloClasse = document.querySelector('.quartoSolo');
const detalhesContainer = document.querySelector('.detalhes-quarto');
const contatoClasse = document.querySelector('.metodosContato');

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
            <h3>${quarto.nome}</h3>
            <hr/>
            <div>
                <p>${quarto.descricao}</p>
                <p> <b>preço: </b>R$ ${quarto.precoPorNoite},00</p>
                <button onclick = "redirecionarPaginaPeloIdQuarto('${quarto.id}')"> ver mais </button>
            </div>
        </div>
    `
}

async function redirecionarPaginaPeloIdQuarto(id) {
    const urlParams = new URLSearchParams();
    urlParams.append('id', id);
    window.location.href = `../book_page/book-details.html?${urlParams.toString()}`;
}

//classeQuartoContainer será o DOM dos dois tipos de quarto que serão inseridos
//filtro define quais quartos poderão ou não ser exibidos
async function carregarQuartos(classeQuartoContainer, filtro) {
    try {
        // Carregando os dados de quartos
        const response = await fetch(`http://localhost:8080/recanto-perdido/quartos`);

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

async function carregarContatos() {
    try {
        // Carregando os dados do hotel
        const response = await fetch(`http://localhost:8080/recanto-perdido`);

        // Convertendo os dados para JSON
        const hotel = await response.json();

        // Iterando sobre os contato e adicionando ao HTML
            const contatoHTML = `
                <div class = "contato">
                    <h3>Fale conosco</h3>
                        
                    <div>
                        <h4>E-mail:</h4>
                        <p>${hotel.contatos.email}</p>
                    </div>
                    <div>
                        <h4>Telefone:</h4>
                        <p>${hotel.contatos.telefone}</p>
                    </div>
                    <div>
                        <h4>Endereço:</h4>
                        <p>${hotel.endereco.rua}, ${hotel.endereco.cidade}, ${hotel.endereco.estado}, ${hotel.endereco.codigoPostal}, ${hotel.endereco.pais}</p>
                    </div>
                    <div>
                        <h4>Website:</h4>
                        <p>${hotel.contatos.website}</p>
                    </div>
                    
                </div>
            `;
            contatoClasse.innerHTML += contatoHTML;

    } catch (error) {
        console.error(error);
        contatoClasse.innerHTML = `<p>Erro ao carregar os classes. Tente novamente mais tarde.</p>`;
    }
}

carregarQuartos(quartoArvoreClasse, quarto => !quarto.subterraneo);
carregarQuartos(quartoSoloClasse, quarto => quarto.subterraneo);
carregarContatos();