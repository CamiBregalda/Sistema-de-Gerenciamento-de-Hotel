const pacotesClasse = document.querySelector('.pacotes');
const atracoesClasse = document.querySelector('.atracoes');
const contatoClasse = document.querySelector('.metodosContato');
const planoDeFundo = document.querySelector('.plano-de-fundo');

async function carregarPlanoDeFundo() {
    try{
        const response = await fetch('http://localhost:8080/recanto-perdido');
        const hotel = await response.json();

        if (!hotel.imagens || hotel.imagens.length === 0) {
            throw new Error("Nenhuma imagem disponível.");
        }

        const imagemHTML = hotel.imagens[0];

        planoDeFundo.style.backgroundImage = `url('../../img/hotel/${imagemHTML}')`;
        planoDeFundo.style.backgroundSize = "cover";
        planoDeFundo.style.backgroundPosition = "center";

    } catch (error){
        console.error(error);
        planoDeFundo.innerHTML = `<p>Erro ao carregar o plano de fundo. Tente novamente mais tarde.</p>`;
    }
}   


/* -- Não estou conseguindo fazer funcionar

async function carregarPlanoDeFundo() {
    try{
        const response = await fetch('http://localhost:8080/recanto-perdido');
        const hotel = await response.json();

        if (!hotel.imagens || hotel.imagens.length === 0) {
            throw new Error("Nenhuma imagem disponível.");
        }

        planoDeFundo.innerHTML = criarCarrossel(hotel.imagens);
        iniciarCarrossel();

    } catch (error){
        console.error(error);
        planoDeFundo.innerHTML = `<p>Erro ao carregar o plano de fundo. Tente novamente mais tarde.</p>`;
    }
}   


function criarCarrossel(imagens){
    return`
        <div class="carrossel">
            <div class = "foto">
            ${imagens.map((imagem, index) => `
                <img src="../../img/hotel/${imagem}" alt="Imagem do hotel" class="${index === 0 && 'ativo'}">
                `).join('')}            
            </div>
        </div>`
}


function iniciarCarrossel(){
    const carrossel = document.querySelector('.carrossel');
    const imagens = document.querySelectorAll('.foto img');

    let index = 0;

    function atualizaCarrossel(){
        imagens.forEach((imagem, i) =>{
            imagem.classList.toggle('ativo', i === index);
        });
    }

    function avancar(){
        index = (index + 1) % imagens.length;
        atualizaCarrossel();
    }

    setInterval(avancar, 300);
}
*/ 


// Função para carregar e renderizar os pacotes
async function carregarPacotes() {
    try {
        // Carregando os dados de pacotes
        const response = await fetch(`http://localhost:8080/recanto-perdido/pacotes`);

        // Convertendo os dados para JSON
        const pacotes = await response.json();

        // Iterando sobre os pacotes e adicionando ao HTML
        pacotes.forEach(pacote => {
            const pacoteHTML = `
                <div class="pacote">
                    <img src="../../img/pacotes/${pacote.imagem}" alt="${pacote.nome}">
                    <div>
                        <h3>${pacote.nome}</h3>
                        <p>${pacote.descricao}</p>
                        <button onclick="comprarPacote(${pacote.id})">
                            Comprar
                        </button>
                    </div>
                </div>
            `;
            pacotesClasse.innerHTML += pacoteHTML;
        });

    } catch (error) {
        console.error(error);
        pacotesClasse.innerHTML = `<p>Erro ao carregar os pacotes. Tente novamente mais tarde.</p>`;
    }
}

// Função chamada ao clicar no botão "Comprar"
function comprarPacote(id) {
    alert(`Pacote ${id} selecionado para compra!`);
}

async function carregarServicos() {
    try {
        // Carregando os dados de serviços
        const response = await fetch(`http://localhost:8080/recanto-perdido/servicos`);
        
        // Convertendo os dados para JSON
        const servicos = await response.json();

        for(let i = 0; i < servicos.length; i++){
            const classe = i % 2;
            const servicoHTML =  `
                <div class="atracao${classe}">
                    <img src="../../img/servicos/${servicos[i].imagem}" alt="${servicos[i].nome}">
                    <div>
                        <h3>${servicos[i].nome}</h3>
                        <p>${servicos[i].descricao}</p>
                    </div>
                </div>
            `;
            atracoesClasse.innerHTML += servicoHTML;
        }

    } catch (error) {
        console.error(error);
        atracoesClasse.innerHTML = `<p>Erro ao carregar os serviços. Tente novamente mais tarde.</p>`;
    }
}

// Função chamada ao clicar no botão "Comprar"
function comprarServico(id) {
    alert(`Serviços ${id} selecionado para compra!`);
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
                        <a href="${hotel.contatos.website}">${hotel.contatos.website}</a>
                    </div>
                    
                </div>
            `;
            contatoClasse.innerHTML += contatoHTML;

    } catch (error) {
        console.error(error);
        contatoClasse.innerHTML = `<p>Erro ao carregar os classes. Tente novamente mais tarde.</p>`;
    }
}

carregarPacotes();
carregarServicos();
carregarContatos();
carregarPlanoDeFundo();