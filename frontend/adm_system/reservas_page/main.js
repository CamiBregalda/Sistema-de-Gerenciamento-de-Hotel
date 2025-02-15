let reservas = null;

async function carregarReservas() {
    const response = await fetch('http://localhost:8080/recanto-perdido/reservas');
    reservas = await response.json();

    const listaReservas = document.getElementById('reservas-hotel');
    listaReservas.innerHTML = '';

    reservas.forEach((reserva) => {
        const reservaDiv = document.createElement('div');
        reservaDiv.className = 'reservas';
        reservaDiv.innerHTML = `
        <div class="informacoes">
            <div class="informacoes-menores">
                <span><strong>Id da reserva: </strong>${reserva.id}</span>
                <span><strong>Nome do cliente: </strong>${reserva.nomeCliente}</span>
                <span><strong>Data de entrada: </strong>${reserva.dataEntrada}</span>
                <span><strong>Id do quarto: </strong>${reserva.idQuarto}</span>
                <span><strong>Número de acompanhantes: </strong>${reserva.numeroAcompanhantes}</span>
                <span><strong>Data de saída: </strong>${reserva.dataSaida}</span>
            </div>
            <div class="informacoes-linha">
                <span><strong>Número de contato: </strong>${reserva.contato}</span>
                <span><strong>Endereço de email: </strong>${reserva.email}</span>
            </div>
        </div>
        <div class="reservas-btn">
            <button class="delete-btn" onclick="deleteReserva(${reserva.id})">X</button>
        </div>
        `;
        listaReservas.appendChild(reservaDiv);
    });
}

// Função para excluir uma reserva
async function deleteReserva(id) {
    const reserva = reservas.find((s) => s.id === id.toString());

    if (confirm('Tem certeza de que deseja excluir esta reserva?')) {
        reservas = reservas.filter((reserva) => reserva.id !== id.toString());
        
        response = await fetch('http://localhost:8080/recanto-perdido/reservas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reservas),
        });
    
        const result = await response.json();
        alert(result.message);

        carregarReservas();
    }
}

carregarReservas();