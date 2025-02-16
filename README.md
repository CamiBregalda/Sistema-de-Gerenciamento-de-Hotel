# Sistema de Gerenciamento de Hotel

## 📌 Sobre o Projeto
Este é um sistema de gerenciamento de hotel que conta com duas interfaces principais:
- **Sistema do Cliente**: acessado pelos hóspedes para visualizar informações e realizar reservas de quarto.
- **Sistema do Administrador**: utilizado pela equipe do hotel para gerenciar informações do hotel, serviços e reservas de clientes.

O projeto é composto por um **backend** e um **frontend**, onde cada parte tem sua estrutura própria.

---

## 🚀 Como Executar o Projeto
Para rodar o sistema localmente, siga os passos abaixo:

### 1️⃣ **Iniciando o Backend**
Na pasta raiz do projeto, execute o seguinte comando:
```sh
npm run start
```
Isso iniciará o servidor do backend.

### 2️⃣ **Acessando o Frontend**
O frontend está separado em dois sistemas principais:

📌 **Sistema do Cliente**
- Localizado em: `frontend/client_system/initial_page`
- Página inicial: `index.html`

📌 **Sistema do Administrador**
- Localizado em: `frontend/adm_system/login_page`
- Página inicial: `index.html`

Para visualizar as páginas, basta abrir os arquivos correspondentes diretamente no navegador. 
> Obs. Somente poderá ser efetuado o login na tela de administrador se as credenciais passadas estiverem cadastradas no arquivo `credenciais-hotel.json`.

---

## 📂 Estrutura do Projeto

### 🔹 **Backend**
O backend é responsável pela lógica do sistema e comunicação com o banco de dados. Ele é iniciado pelo comando `npm run start` na pasta raiz.

### 🔹 **Frontend**
O frontend está dividido em dois sistemas distintos:
- **Client System (`client_system/`)** → voltado para os hóspedes.
- **Admin System (`adm_system/`)** → voltado para os administradores do hotel.

Cada tela do frontend está organizada em pastas próprias. Por exemplo:
```
frontend/
 ├── client_system/
 │    ├── initial_page/  (Página inicial do cliente)
 │    ├── room_page/  (Página dos quartos disponíveis)
 │    ├── book_page/  (Página do quarto selecionado para reserva)
 │
 ├── adm_system/
 │    ├── login_page/  (Página de acesso a aba do administrador)
 │    ├── initial_page/  (Painel inicial dos administradores)
 │    ├── reservas_page/  (Painel de reservas realizadas)
 │    ├── room_page/  (Painel de atualização dos quartos)
```

---

## 🎨 Estilização e Scripts
Cada página do sistema possui seus próprios arquivos de **CSS** e **JavaScript**, garantindo modularidade e organização.
- O estilo de cada página está definido no arquivo `main.css` dentro da sua respectiva pasta.
- As interações e lógica de cada página são gerenciadas no `main.js` correspondente.

Além disso, os **componentes reutilizáveis** como **header** e **footer** estão armazenados em suas próprias pastas para facilitar o compartilhamento entre as demais páginas.

---

## 📌 Conclusão
Este sistema foi projetado para ser modular, organizado e de fácil manutenção. Siga as instruções acima para rodá-lo corretamente.

Se tiver dúvidas ou precisar de ajustes, fique à vontade para contribuir! 🚀
