const detalheJson = '../../json/quartos-hotel.json';


const detalhesContainer = document.querySelector('.detalhes');

async function carregarDetalhes(quartoId){
    try{
        const response = await fetch(detalheJson);
        if (!response.ok) {
            throw new Error(`Erro ao carregar o arquivo JSON: ${response.statusText}`);
        }
        const quartos = await response.json();

       /* console.log(quartos);

        //tentativa, não sei se vai funcionar
        let quarto = null;
        //vou usar for of,, basicamente a constante recebe o valoa atual do primeiro elemento da array atual e o of passa a array que será percorrida
        for(const q of quartos){
            if(q.id === quartoId){
                quarto = q;
                break;
            }
        }

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
        }*/ 

    
    } 
    catch (error) {
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