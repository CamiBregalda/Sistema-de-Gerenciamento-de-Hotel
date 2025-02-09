let hotelInfo = null;
let servicos = [];

async function carregarHotelInfo() {
    const response = await fetch('http://localhost:8080/recanto-perdido');
    hotelInfo = await response.json();

    // Preencher os campos do hotel
    document.getElementById('nome').placeholder = hotelInfo.nome || 'Digite o nome do hotel';
    document.getElementById('descricao').placeholder = hotelInfo.descricao || 'Digite a descrição do hotel';
    document.getElementById('telefone').placeholder = hotelInfo.contatos.telefone || 'Digite o telefone do hotel';
    document.getElementById('email').placeholder = hotelInfo.contatos.email || 'Digite o endereço de email do hotel';
    document.getElementById('website').placeholder = hotelInfo.contatos.website || 'Digite o endereço do website do hotel';

    // Preencher os campos do endereço
    document.getElementById('rua').placeholder = hotelInfo.endereco.rua || 'Digite a rua onde está localizado o hotel';
    document.getElementById('numero').placeholder = hotelInfo.endereco.numero || 'Digite o número onde está localizado o hotel';
    document.getElementById('bairro').placeholder = hotelInfo.endereco.bairro || 'Digite o bairro onde está localizado o hotel';
    document.getElementById('cidade').placeholder = hotelInfo.endereco.cidade || 'Digite a cidade onde está localizado o hotel';
    document.getElementById('estado').placeholder = hotelInfo.endereco.estado || 'Digite o estado onde está localizado o hotel';
    document.getElementById('codigoPostal').placeholder = hotelInfo.endereco.codigoPostal || 'Digite o código postal onde está localizado o hotel';
    document.getElementById('pais').placeholder = hotelInfo.endereco.pais || 'Digite o país onde está localizado o hotel';

    carregarImagens(hotelInfo.imagens);
}

async function carregarServicos() {
    const response = await fetch('http://localhost:8080/recanto-perdido/servicos');
    servicos = await response.json();

    const listaServicos = document.getElementById('servicos-hotel');
    listaServicos.innerHTML = '';

    servicos.forEach((servico) => {
        const servicoDiv = document.createElement('div');
        servicoDiv.className = 'servicos';
        servicoDiv.innerHTML = `
        <span>${servico.nome}</span>
        <div class="servicos-btns">
            <button class="edit-btn" onclick="mostrarModal('atualizar', ${servico.id})">Editar</button>
            <button class="delete-btn" onclick="deleteServico(${servico.id})">Excluir</button>
        </div>
        `;
        listaServicos.appendChild(servicoDiv);
    });
}

async function carregarImagens(imagens) {
    const imagensHotelDiv = document.getElementById('imagens-hotel');

    try {
        for (const imagem of imagens) {
            const response = await fetch(`http://localhost:8080/recanto-perdido/imagem/${imagem}`);

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
                deleteButton.onclick = () => excluirImagemHotel(imagem);

                novaImagem.appendChild(deleteButton);
                novaImagem.appendChild(imgElement);
                imagensHotelDiv.appendChild(novaImagem);
            } else {
                console.error(`Erro ao carregar a imagem ${imagem}: ${response.statusText}`);
            }
        }
    } catch (error) {
        console.error('Erro ao carregar imagens:', error);
    }
}

async function salvarAtualizacoesHotel(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const descricao = document.getElementById('descricao').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const email = document.getElementById('email').value.trim();
    const website = document.getElementById('website').value.trim();

    if (nome) hotelInfo.nome = nome;
    if (descricao) hotelInfo.descricao = descricao;
    if (telefone) hotelInfo.contatos.telefone = telefone;
    if (email) hotelInfo.contatos.email = email;
    if (website) hotelInfo.contatos.website = website;

    atualizarHotel(hotelInfo);
    carregarHotelInfo();
}

async function salvarAtualizacoesEndereco(event) {
    event.preventDefault();

    const rua = document.getElementById('rua').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const bairro = document.getElementById('bairro').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const estado = document.getElementById('estado').value.trim();
    const pais = document.getElementById('pais').value.trim();
    const codigoPostal = document.getElementById('codigoPostal').value.trim();

    if (rua) hotelInfo.endereco.rua = rua;
    if (numero) hotelInfo.endereco.numero = numero;
    if (bairro) hotelInfo.endereco.bairro = bairro;
    if (cidade) hotelInfo.endereco.cidade = cidade;
    if (estado) hotelInfo.endereco.estado = estado;
    if (pais) hotelInfo.endereco.pais = pais;
    if (codigoPostal) hotelInfo.endereco.codigoPostal = codigoPostal;

    atualizarHotel(hotelInfo);
    carregarHotelInfo();
}

async function atualizarHotel(hotelInfo) {
    const response = await fetch(`http://localhost:8080/recanto-perdido`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hotelInfo)
    });

    const result = await response.json();
    alert(result.message);
}

function mostrarModal(acao, id) {
    document.getElementById('modal').classList.add('active');

    document.getElementById('nomeServico').value = '';
    document.getElementById('descricaoServico').value = '';
    document.getElementById('fotoServico').value = '';

    if (acao === "atualizar") {
        document.getElementById('nomeServico').value = `${servicos.find((s) => s.id === id.toString()).nome}`;
        document.getElementById('descricaoServico').value = `${servicos.find((s) => s.id === id.toString()).descricao}`;
        document.getElementById('fotoServico').value = '';

        document.getElementById('modalTitulo').innerText = 'Atualizar Serviço';
        document.getElementById('modalBotao').innerText = 'Atualizar Serviço';
        document.getElementById('modalBotao').setAttribute(`onclick', 'updateServico(${id})`);
    } else if (acao === "adicionar") {
        document.getElementById('modalTitulo').innerText = 'Adicionar Serviço';
        document.getElementById('modalBotao').innerText = 'Adicionar Serviço';
        document.getElementById('modalBotao').setAttribute('onclick', 'addServico()');
    }
}

function fecharModal() {
    document.getElementById('modal').classList.remove('active');
}

// Função para adicionar um novo serviço
function addServico() {
    const novoNome = document.getElementById('nomeServico').value;
    const novaDescricao = document.getElementById('descricaoServico').value;
    const arquivo = document.getElementById('fotoServico').files[0];

    if (novoNome && novaDescricao && arquivo) {
        const ultimoId = servicos.reduce((maxId, servico) => Math.max(maxId, parseInt(servico.id)), 0)

        const novoServico = { 
            id: (ultimoId + 1).toString(), 
            nome: novoNome,
            descricao: novaDescricao,
            imagem: arquivo.name
        };

        servicos.push(novoServico);

        salvarServicos();
        salvarImagemServico(arquivo);
        fecharModal();
        carregarServicos();
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

// Função para editar um serviço
function updateServico(id) {
    const novoNome = document.getElementById('nomeServico').value;
    const novaDescricao = document.getElementById('descricaoServico').value;
    const arquivo = document.getElementById('fotoServico').files[0];

    const servico = servicos.find((s) => s.id === id.toString());
    
    if (novoNome) {
        servico.nome = novoNome;
    }

    if (novaDescricao) {
        servico.descricao = novaDescricao;
    }

    if (arquivo) {
        excluirImagemServico(servico.imagem);
        servico.imagem = arquivo.name;
        salvarImagemServico(arquivo);
    }
    
    salvarServicos();
    fecharModal();
    carregarServicos();
}

// Função para excluir um serviço
function deleteServico(id) {
    const servico = servicos.find((s) => s.id === id.toString());

    if (confirm('Tem certeza de que deseja excluir este serviço?')) {
        servicos = servicos.filter((s) => s.id !== id.toString());
        salvarServicos();
        excluirImagemServico(servico);
        carregarServicos();
    }
}

// Função para salvar a lista de serviços no JSON
async function salvarServicos() {
    const response = await fetch('http://localhost:8080/recanto-perdido/servicos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(servicos),
    });

    const result = await response.json();
    alert(result.message); 
}

async function salvarImagemServico(arquivo) {
    const formData = new FormData();
    formData.append('fotoServico', arquivo);

    const response = await fetch('http://localhost:8080/recanto-perdido/servicos/imagem', {
        method: 'POST',
        body: formData,
    });

    const result = await response.json();
    alert(result.message); 
}

async function excluirImagemServico(servico) {
    //Se mais nenhum serviço utilizar essa imagem
    const response = await fetch(`http://localhost:8080/recanto-perdido/servicos/imagem/${servico.imagem}`, {
        method: 'DELETE',
    });

    const result = await response.json();
    alert(result.message);
}

async function atualizarImagensHotel() {
    await fetch(`http://localhost:8080/recanto-perdido`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hotelInfo)
    });
}

async function salvarImagemHotel() {
    const fileInput = document.getElementById('nova-foto');
    const file = fileInput.files[0];

    if (!file) {
        alert('Por favor, selecione uma imagem!');
    };

    const formData = new FormData();
    formData.append('fotoHotel', file);

    hotelInfo.imagens.push(file.name);

    atualizarImagensHotel();

    const response = await fetch('http://localhost:8080/recanto-perdido/imagem', {
        method: 'POST',
        body: formData,
    });

    const result = await response.json();
    alert(result.message);
};

async function excluirImagemHotel(imagem) {
    hotelInfo.imagens = hotelInfo.imagens.filter((img) => img !== imagem);    

    atualizarImagensHotel();

    const response = await fetch(`http://localhost:8080/recanto-perdido/imagem/${imagem}`, {
        method: 'DELETE',
    });

    const result = await response.json();
    alert(result.message);
}

carregarHotelInfo();
carregarServicos();

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("atualizar-hotel-info").addEventListener("click", salvarAtualizacoesHotel);
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("atualizar-hotel-endereco").addEventListener("click", salvarAtualizacoesEndereco);
});