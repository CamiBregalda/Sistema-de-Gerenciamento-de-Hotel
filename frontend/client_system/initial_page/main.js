// Caminho para o arquivo JSON
const pacotesJson = "../../json/pacotes-hotel.json";

const container = document.querySelector('.pacotes');

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
