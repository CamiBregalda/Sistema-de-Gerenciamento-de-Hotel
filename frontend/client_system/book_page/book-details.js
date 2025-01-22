const detalheJson = '../../json/quartos-hotel.json';

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
}

