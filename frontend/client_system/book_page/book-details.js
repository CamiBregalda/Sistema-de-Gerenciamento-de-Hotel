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
                <button class="reservarQuarto" onclick="mostrarModal()">Reservar Quarto</button>
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

function mostrarModal() {
    document.getElementById('modal').classList.add('active');
}

function fecharModal() {
    document.getElementById('modal').classList.remove('active');
}

async function addReserva() {
    const nome = document.getElementById('nomeCliente').value;
    const numeroAcompanhantes = document.getElementById('numeroAcompanhantesCliente').value;
    const dataEntrada = document.getElementById('dataEntradaCliente').value;
    const dataSaida = document.getElementById('dataSaídaCliente').value;
    const contato = document.getElementById('contatoCliente').value;
    const email = document.getElementById('emailCliente').value;

    if(dataEntrada > dataSaida){
        alert('Data de entrada deve ser menor que a data de saída.');
        return;
    }

    if (nome && numeroAcompanhantes && dataEntrada && dataSaida && contato && email) {
        let response = await fetch(`http://localhost:8080/recanto-perdido/reservas`);
        const reservas = await response.json();

        const ultimoId = reservas.reduce((maxId, reserva) => Math.max(maxId, parseInt(reserva.id)), 0)

        const novaReserva = { 
            id: (ultimoId + 1).toString(), 
            nome: nome,
            numeroAcompanhantes: numeroAcompanhantes,
            dataEntrada: dataEntrada,
            dataSaida: dataSaida,
            contato: contato,
            email: email
        };

        response = await fetch('http://localhost:8080/recanto-perdido/reservas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novaReserva),
        });
    
        const result = await response.json();
        alert(result.message); 
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

carregarDetalhesQuarto();