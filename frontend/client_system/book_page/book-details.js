const detalheJson = '../../json/quartos-hotel.json';

const detalhesContainer = document.querySelector('.detalhes-quarto');

async function carregarDetalhesQuarto(){
    try{
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        const response = await fetch(`http://localhost:8080/recanto-perdido/quartos/${id}`);
        
        const quarto = await response.json();

        const detalhesHTML = `
            <div class="quarto">
                    ${criarCarrossel(quarto.imagens)}
                    ${criarDescricao(quarto)}
                </div>
        `;

            detalhesContainer.innerHTML += detalhesHTML;

            configuraCarrosseis(detalhesContainer);

    } catch (error){
        console.error(error);
        detalhesContainer.innerHTML = `<p>Erro ao carregar a página</p>`;
    }
}

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
                <p> <b>Preço: </b>R$ ${quarto.precoPorNoite},00</p>
            </div>
            <div class="botoes">
                <button class="reservarQuarto">Reservar Quarto</button>
                <button class="fechaDetalhes">Fechar Detalhes</button>
            </div>
        </div>

    `
}

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("fechaDetalhes")) {
        window.location.href = "../room_page/room.html";
    }
});

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

carregarDetalhesQuarto();