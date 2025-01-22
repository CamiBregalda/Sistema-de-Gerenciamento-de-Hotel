const detalheJson = '../../json/quartos-hotel.json';

const detalhesContainer = document.querySelector('.detalhes-quarto');
/*
export async function carregarDetalhes(quartoId){
    try{
        const response = await fetch(`http://localhost:8080/recanto-perdido/quartos`);

        if (!response.ok) {
            throw new Error(`Erro ao buscar dados de quartos: ${response.statusText}`);
        }

        const quartos = await response.json();

        //tentativa, não sei se vai funcionar

        if(!quarto){
            throw new Error(`Quarto não encontrado`);
        }

        detalhesContainer.innerHTML=`
            <div class = "texto">
                <h3>${quarto.id}</h3>
                <hr/>
                <div>
                    <p>${quarto.descricao}</p>
                    <p> <b>preço: </b>R$ ${quarto.precoPorNoite},00</p>
                </div>
            </div>
        `;
    
        const descricoes = document.getElementById('descricoes');
        if (descricoes) {
            descricoes.style.display = 'block';
        } else{
            console.error("Elemento #descricoes não encontrado no DOM");
        }

    
    } catch (error) {
        console.error(error);
        classeQuartoContainer.innerHTML = `<p>Erro ao carregar os detalhes. Tente novamente mais tarde.</p>`;
    }

    const fecharDetalhe = document.querySelector('.fechaDetalhes');
    if(fecharDetalhe){
        fecharDetalhe.addEventListener('click', () => {
            const descricao = document.getElementById('descricoes');
            if(descricao){
                descricao.style.display = 'none';
                detalhesContainer.innerHTML = ''; 
            }
        })
    }
}*/

async function carregarDetalhesQuarto(){
    try{
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        const response = await fetch(`http://localhost:8080/recanto-perdido/quartos/${id}`);
        
        const quarto = await response.json();
/* Copiado do arquivo romm.js
        const quartoHTML = `
                <div class="quarto">
                    ${criarCarrossel(quarto.imagens)}
                    ${criarDescricao(quarto)}
                </div>
            `;

            classeQuartoContainer.innerHTML += quartoHTML;*/

        const detalhesHTML = `
            <div class = "texto">
                <h3>${quarto.nome}</h3>
                <hr/>
                <div>
                    <p>${quarto.descricao}</p>
                    <p> <b>preço: </b>R$ ${quarto.precoPorNoite},00</p>
                </div>
            </div>
        `;
            console.log(quarto);

            detalhesContainer.innerHTML += detalhesHTML;

        // window.location.href = '../book_page/book-details.html';

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
            <h3>${quarto.id}</h3>
            <hr/>
            <div>
                <p>${quarto.descricao}</p>
                <p> <b>preço: </b>R$ ${quarto.precoPorNoite},00</p>
                <button onclick = "redirecionarPaginaPeloIdQuarto('${quarto.id}')"> ver mais </button>
            </div>
        </div>
    `
}

carregarDetalhesQuarto();