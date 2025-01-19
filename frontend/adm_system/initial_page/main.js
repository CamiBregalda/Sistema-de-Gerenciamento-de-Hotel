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
            <button class="edit-btn" onclick="editServico(${servico.id})">Editar</button>
            <button class="delete-btn" onclick="deleteServico(${servico.id})">Excluir</button>
        </div>
        `;
        listaServicos.appendChild(servicoDiv);
    });
}

/*
// Função para salvar os dados do formulário
async function salvarAtualizacoes(event) {
    event.preventDefault(); // Evitar envio do formulário padrão

    // Obter os dados preenchidos no formulário
    const updatedHotelInfo = {};

    // Coletar dados de hotel
    const nome = document.getElementById('nome').value || undefined;
    if (nome) updatedHotelInfo.nome = nome;

    const endereco = {};
    const rua = document.getElementById('rua').value || undefined;
    if (rua) endereco.rua = rua;

    const numero = document.getElementById('numero').value || undefined;
    if (numero) endereco.numero = numero;

    const bairro = document.getElementById('bairro').value || undefined;
    if (bairro) endereco.bairro = bairro;

    const cidade = document.getElementById('cidade').value || undefined;
    if (cidade) endereco.cidade = cidade;

    const estado = document.getElementById('estado').value || undefined;
    if (estado) endereco.estado = estado;

    const codigoPostal = document.getElementById('codigoPostal').value || undefined;
    if (codigoPostal) endereco.codigoPostal = codigoPostal;

    const pais = document.getElementById('pais').value || undefined;
    if (pais) endereco.pais = pais;

    if (Object.keys(endereco).length > 0) {
        updatedHotelInfo.endereco = endereco;
    }

    // Coletar outros dados do hotel
    const telefone = document.getElementById('telefone').value || undefined;
    if (telefone) updatedHotelInfo.telefone = telefone;

    const email = document.getElementById('email').value || undefined;
    if (email) updatedHotelInfo.email = email;

    const descricao = document.getElementById('descricao').value || undefined;
    if (descricao) updatedHotelInfo.descricao = descricao;

    // Enviar os dados para o servidor
    const response = await fetch('http://localhost:8080/recanto-perdido', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedHotelInfo),
    });

    const result = await response.json();
    alert(result.message); // Exibe a resposta do servidor
}

// Carregar informações ao abrir a página
//window.onload = carregarHotelInfo;

// Adicionar evento de submit ao formulário
document.getElementById('update-hotel-info').addEventListener('submit', salvarAtualizacoes);
//document.getElementById('enderecoForm').addEventListener('submit', salvarAtualizacoes);
*/
// Função para adicionar um novo serviço
function addServico() {
    showModal();
    const novoNome = "teste";
    const novaDescricao = "teste";
    if (novoNome) {
        const ultimoId = servicos.reduce((maxId, servico) => Math.max(maxId, parseInt(servico.id)), 0)
        const novoServico = { 
            id: (ultimoId + 1).toString(), 
            nome: novoNome,
            descricao: novaDescricao 
        };
        servicos.push(novoServico);
        //salvarServicos();
        carregarServicos();
    }
}

// Função para editar um serviço
function editServico(id) {
    const servico = servicos.find((s) => s.id === id.toString());
    const novoNome = prompt('Edite o nome do serviço:', servico.nome);
    if (novoNome) {
        servico.nome = novoNome;
        salvarServicos();
        carregarServicos();
    }
}

// Função para excluir um serviço
function deleteServico(id) {
    if (confirm('Tem certeza de que deseja excluir este serviço?')) {
        servicos = servicos.filter((s) => s.id !== id.toString());
        salvarServicos();
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

document.getElementById('add-servicos').addEventListener('click', addServico);

carregarHotelInfo();
carregarServicos();



function showModal() {
    document.getElementById('modal').classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

function submitForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    if (name && email) {
        alert(`Nome: ${name}\nEmail: ${email}`);
        closeModal();
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}