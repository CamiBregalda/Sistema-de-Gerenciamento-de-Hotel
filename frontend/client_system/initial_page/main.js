// Caminho para o arquivo JSON
const pacotesJson = "../../json/pacotes-hotel.json";
const servicosJson = "../../json/servicos.json";

const container = document.querySelector('.pacotes');
const atracoes = document.querySelector('.atracoes');

// Função para carregar e renderizar os pacotes
async function carregarPacotes() {
    try {
        // Carregando os dados do arquivo JSON
        const response = await fetch(pacotesJson);


        // Verificando se o arquivo foi encontrado
        if (!response.ok) {
            throw new Error(`Erro ao carregar o arquivo JSON: ${response.statusText}`);
        }

        // Convertendo os dados para JSON
        const pacotes = await response.json();


        // Iterando sobre os pacotes e adicionando ao HTML
        pacotes.forEach(pacote => {
            const pacoteHTML = `
                <div class="pacote">
                    <img src="../img/pacotes/${pacote.imagem}" alt="${pacote.nome}">
                    <div>
                        <h3>${pacote.nome}</h3>
                        <p>${pacote.descricao}</p>
                        <button onclick="comprarPacote(${pacote.id})">
                            Comprar
                        </button>
                    </div>
                </div>
            `;
            container.innerHTML += pacoteHTML;
        });


    } catch (error) {
        console.error(error);
        container.innerHTML = `<p>Erro ao carregar os pacotes. Tente novamente mais tarde.</p>`;
    }
}

// Função chamada ao clicar no botão "Comprar"
function comprarPacote(id) {
    alert(`Pacote ${id} selecionado para compra!`);
}

// Carregar os pacotes ao carregar a página
carregarPacotes();

async function carregarServicos() {
    try {
        // Carregando os dados do arquivo JSON
        const response = await fetch(servicosJson);


        // Verificando se o arquivo foi encontrado
        if (!response.ok) {
            throw new Error(`Erro ao carregar o arquivo JSON: ${response.statusText}`);
        }

        // Convertendo os dados para JSON
        const servicos = await response.json();

        for(let i = 0; i < servicos.length; i++){
            const classe = i % 2;
            const servicoHTML =  `
                <div class="atracao${classe}">
                    <img src="../img/servicos/${servicos[i].imagem}" alt="${servicos[i].nome}">
                    <div>
                        <h3>${servicos[i].nome}</h3>
                        <p>${servicos[i].descricao}</p>
                        <button onclick="comprarServico(${servicos[i].id})">
                            Comprar
                        </button>
                    </div>
                </div>
            `;
            container.innerHTML += servicoHTML;
        }


    } catch (error) {
        console.error(error);
        container.innerHTML = `<p>Erro ao carregar os servicos. Tente novamente mais tarde.</p>`;
    }
}

// Função chamada ao clicar no botão "Comprar"
function comprarServico(id) {
    alert(`Serviços ${id} selecionado para compra!`);
}

// Carregar os pacotes ao carregar a página
carregarServicos();