// Função para salvar a lista de serviços no JSON
async function logarSistema() {
    const login = {
        usuario: document.getElementById('usuario').value,
        senha: document.getElementById('senha').value,
    };

    const response = await fetch('http://localhost:8080/recanto-perdido/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(login),
    });

    const result = await response.json();

    if (result.message === 'Login realizado com sucesso!') { 
        alert(result.message);
        window.location.href = '../initial_page/index.html';
    } else {
        alert(result.message);
    }
}