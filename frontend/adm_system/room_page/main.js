let quarto = null;
let quartos = null;

async function carregarQuarto(id) {
    const response = await fetch(`http://localhost:8080/recanto-perdido/quartos/${id}`);
    quarto = await response.json();

    // Preencher os campos do quarto
    document.getElementById('nome').placeholder = quarto.nome || 'Digite o nome do quarto';
    document.getElementById('descricao').placeholder = quarto.descricao || 'Digite a descrição do quarto';
    document.getElementById('preco').placeholder = quarto.precoPorNoite || 'Digite o preço por noite do quarto';

    if (quarto.subterraneo) {
        document.querySelector('input[name="subterraneo"]').checked = true;
    } else {
        document.querySelector('input[name="subterraneo"]').checked = false;
    }
    
    carregarImagens(quarto.imagens);
}

async function carregarImagens(imagens) {
    const imagensQuarto = document.getElementById('imagens-quartos');
    imagensQuarto.innerHTML = '';

    try {
        for (const imagem of imagens) {
            const response = await fetch(`http://localhost:8080/recanto-perdido/quartos/imagem/${imagem}`);

            if (response.ok) {
                // Obtém os dados da imagem como um blob
                const blob = await response.blob(); 
                // Cria uma URL temporária para exibir a imagem
                const imageURL = URL.createObjectURL(blob); 

                const novaImagem = document.createElement('div');
                novaImagem.classList.add('imagens');

                const imgElement = document.createElement('img');
                imgElement.src = imageURL;
                imgElement.alt = `Imagem do hotel ${imagem}`;

                // Criando o botão de exclusão
                const deleteButton = document.createElement('button');
                deleteButton.innerHTML = 'X';
                deleteButton.classList.add('delete-imagens-btn');
                deleteButton.onclick = () => excluirImagemQuarto(imagem);

                novaImagem.appendChild(deleteButton);
                novaImagem.appendChild(imgElement);
                imagensQuarto.appendChild(novaImagem);
            } else {
                console.error(`Erro ao carregar a imagem ${imagem}: ${response.statusText}`);
            }
        }
    } catch (error) {
        console.error('Erro ao carregar imagens:', error);
    }
}

async function salvarAtualizacoes(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const descricao = document.getElementById('descricao').value.trim();
    const precoPorNoite = document.getElementById('preco').value.trim();
    const subterraneo = document.querySelector('input[name="subterraneo"]:checked').value;

    if (nome) quarto.nome = nome;
    if (descricao) quarto.descricao = descricao;
    if (precoPorNoite) quarto.precoPorNoite = precoPorNoite;
    quarto.subterraneo = subterraneo === 'sim';

    const result = atualizarQuarto(quarto);
    alert(result.message);
    
    carregarQuarto();
}

async function atualizarQuarto(quarto) {
    const response = await fetch(`http://localhost:8080/recanto-perdido/quartos/${quarto.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quarto)
    });

    return await response.json();
}

async function salvarImagemQuarto() {
    const fileInput = document.getElementById('nova-foto');
    const file = fileInput.files[0];

    if (!file) {
        alert('Por favor, selecione uma imagem!');
    };

    const formData = new FormData();
    formData.append('imagem', file);

    quarto.imagens.push(file.name);

    // Chamar função de atualizar info do quarto
    const response = await fetch(`http://localhost:8080/recanto-perdido/quartos/imagem/${quarto.id}`, {
        method: 'POST',
        body: formData,
    });

    const result = await response.json();
    alert(result.message);

    atualizarQuarto(quarto);
    carregarImagens(quarto.imagens);
};

async function excluirImagemQuarto(imagem) {
    const responseQuartos = await fetch('http://localhost:8080/recanto-perdido/quartos');
    const todosQuartos = await responseQuartos.json();

    const imagemEmUso = todosQuartos.some((quarto) => 
        quarto.id !== quarto.id && quarto.imagens.includes(imagem)
    );

    if (imagemEmUso) {
        alert('A imagem não pode ser excluída, pois está em uso por outro quarto.');
        return;
    }

    // Chamar função de atualizar info do quarto
    const response = await fetch(`http://localhost:8080/recanto-perdido/quartos/imagem/${imagem}`, {
        method: 'DELETE',
    });

    const result = await response.json();
    alert(result.message);

    quarto.imagens = quarto.imagens.filter((img) => img !== imagem);    

    atualizarQuarto(quarto);
    carregarImagens(quarto.imagens);
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("atualizar-quarto").addEventListener("click", salvarAtualizacoes);
});

async function carregarDadosSelect() {
    const selectId = document.getElementById("idQuarto");

    try {
        const response = await fetch(`http://localhost:8080/recanto-perdido/quartos`);
        const quartos_existentes = await response.json();

        selectId.innerHTML = "";

        quartos_existentes.forEach(quarto => {
            const option = document.createElement("option");
            option.value = quarto.id;
            option.textContent = `Quarto ${quarto.id}`;
            selectId.appendChild(option);
        });

        if (quartos_existentes.length > 0) {
            carregarQuarto(selectId.value);
        }

        selectId.addEventListener("change", function () {
            carregarQuarto(this.value);
        });

    } catch (error) {
        console.error("Erro ao carregar os quartos:", error);
    }
}

carregarDadosSelect();