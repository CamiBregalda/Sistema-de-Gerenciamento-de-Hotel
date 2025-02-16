const pacotesClasse = document.querySelector('.pacotes');
const atracoesClasse = document.querySelector('.atracoes');
const contatoClasse = document.querySelector('.metodosContato');

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