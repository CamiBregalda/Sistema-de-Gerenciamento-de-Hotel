import { console } from "inspector";

const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const loginInfoPath = path.join(__dirname, "../../../frontend/json/credenciais-hotel.json");
const hotelInfoPath = path.join(__dirname, "../../../frontend/json/hotel-info.json");
const servicosPath = path.join(__dirname, "../../../frontend/json/servicos-hotel.json");
const reservasPath = path.join(__dirname, "../../../frontend/json/reservas-hotel.json");
const quartosPath = path.join(__dirname, "../../../frontend/json/quartos-hotel.json");
const pacotesPath = path.join(__dirname, "../../../frontend/json/pacotes-hotel.json");

const hotelImagensPath = path.join(__dirname, '../../../frontend/img/hotel/');
const quartosImagensPath = path.join(__dirname, '../../../frontend/img/quartos/');

// Função para verificar e criar a pasta caso não exista
const ensureDirectoryExistence = (filePath) => {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    fs.mkdirSync(dirname, { recursive: true });
};

// Configuração do multer para armazenar a imagem na pasta hotel
const storageHotel = multer.diskStorage({
    destination: function (req, file, cb) {
        const pasta = path.join(__dirname, '../../../frontend/img/hotel');
        ensureDirectoryExistence(pasta); 
        cb(null, pasta); 
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const uploadHotel = multer({ storage: storageHotel });

// Configuração do multer para armazenar a imagem na pasta servicos
const storageServicos = multer.diskStorage({
    destination: function (req, file, cb) {
        const pasta = path.join(__dirname, '../../../frontend/img/servicos');
        ensureDirectoryExistence(pasta); 
        cb(null, pasta); 
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const uploadServicos = multer({ storage: storageServicos });

// Configuração do multer para armazenar a imagem na pasta quartos
const storageQuartos = multer.diskStorage({
    destination: function (req, file, cb) {
        const pasta = path.join(__dirname, '../../../frontend/img/quartos');
        ensureDirectoryExistence(pasta); 
        cb(null, pasta); 
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const uploadQuartos = multer({ storage: storageQuartos });

export class Routes {
    routes(app: any) {
        //Informações para login
        app.post('/recanto-perdido/login', async (req, res) => {
            try {
                const loginUser = req.body;

                fs.readFile(loginInfoPath, 'utf8', (err, data) => {
                    if (err) {
                        return res.status(500).json({ message: 'Erro ao ler o arquivo login-hotel.json.' });
                    }

                    const credenciais = JSON.parse(data);

                    const usuarioEncontrado = credenciais.find(credencial =>
                        credencial.usuario === loginUser.usuario && credencial.senha === loginUser.senha
                    );
    
                    if (usuarioEncontrado) {
                        res.status(200).json({ message: 'Login realizado com sucesso!' });
                    } else {
                        res.status(401).json({ message: 'Usuário ou senha inválidos.' });
                    }
                });
            } catch (error) {
                console.error('Erro ao processar login:', error);
                res.status(500).json({ message: 'Erro no servidor ao tentar realizar o login.' });
            }
        });

        //Informações do hotel
        app.get('/recanto-perdido', (req, res) => {
            fs.readFile(hotelInfoPath, 'utf8', (err, data) => {
                if (err) {
                    return res.status(500).json({ message: 'Erro ao ler o arquivo hotel-info.json.' });
                }
                res.json(JSON.parse(data));
            });
        });

        app.post('/recanto-perdido', (req, res) => {
            const updatedHotelInfo = req.body;

            fs.writeFile(hotelInfoPath, JSON.stringify(updatedHotelInfo, null, 2), 'utf8', (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Erro ao salvar o arquivo.' });
                }
                res.json({ message: 'Informações do hotel atualizadas com sucesso!' });
            });
        });

        app.get('/recanto-perdido/imagem/:imageName', (req, res) => {
            const { imageName } = req.params;
            const filePath = path.join(hotelImagensPath, imageName);
        
            if (fs.existsSync(filePath)) {
                res.sendFile(filePath);
            } else {
                res.status(404).json({ message: 'Imagem não encontrada.' });
            }
        });

        app.post('/recanto-perdido/imagem', uploadHotel.single('fotoHotel'), (req, res) => {
            const imagem = req.file;
            res.json({ message: `Imagem ${imagem.filename} salva com sucesso!` });
        });

        app.delete('/recanto-perdido/imagem/:foto', (req, res) => {
            const { foto } = req.params;
            const filePath = path.join(hotelImagensPath, foto);

            if (fs.existsSync(filePath)) {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Erro ao excluir a imagem:', err);
                        return res.status(500).json({ message: 'Erro ao excluir a imagem.' });
                    }
                    res.status(200).json({ message: 'Imagem excluída com sucesso!' });
                });
            } else {
                res.status(404).json({ message: 'Imagem não encontrada.' });
            }
        });

        // Informações de serviços
        app.get('/recanto-perdido/servicos', (req, res) => {
            fs.readFile(servicosPath, 'utf8', (err, data) => {
                if (err) {
                    return res.status(500).json({ message: 'Erro ao ler o arquivo servicos-hotel.json' });
                }
                res.json(JSON.parse(data));
            });
        });

        app.post('/recanto-perdido/servicos', (req, res) => {
            const updatedServicos = req.body;

            fs.writeFile(servicosPath, JSON.stringify(updatedServicos, null, 2), 'utf8', (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Erro ao salvar o arquivo servicos-hotel.json.' });
                }
                res.json({ message: 'Informações de serviços atualizadas com sucesso!' });
            });
        });

        app.post('/recanto-perdido/servicos/imagem', uploadServicos.single('fotoServico'), (req, res) => {
            const imagemServico = req.file;

            res.json({ message: `Imagem ${imagemServico.filename} salva com sucesso!` });
        });

        app.delete('/recanto-perdido/servicos/imagem/:foto', (req, res) => {
            const { foto } = req.params;
            const filePath = path.join(__dirname, '../../../frontend/img/servicos/', foto);

            // Verifica se o arquivo existe
            if (fs.existsSync(filePath)) {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Erro ao excluir a imagem:', err);
                        return res.status(500).json({ message: 'Erro ao excluir a imagem.' });
                    }
                    res.status(200).json({ message: 'Imagem excluída com sucesso!' });
                });
            } else {
                res.status(404).json({ message: 'Imagem não encontrada.' });
            }
        });

        // Informações de reservas
        app.get('/recanto-perdido/reservas', (req, res) => {
            fs.readFile(reservasPath, 'utf8', (err, data) => {
                if (err) {
                    return res.status(500).json({ message: 'Erro ao ler o arquivo reservas-hotel.json' });
                }
                res.json(JSON.parse(data));
            });
        });

        app.post('/recanto-perdido/reservas', (req, res) => {
            const updatedReservaInfo = req.body;

            fs.readFile(reservasPath, 'utf8', (err, data) => {
                if (err) {
                    return res.status(500).json({ message: 'Erro ao ler o arquivo reservas-hotel.json' });
                }
        
                let reservas;
                try {
                    reservas = JSON.parse(data);
                } catch (error) {
                    return res.status(500).json({ message: 'Erro ao processar os dados do JSON' });
                }
        
                const quartoOcupado = reservas.some(reserva => {
                    const entradaExistente = new Date(reserva.dataEntrada);
                    const saidaExistente = new Date(reserva.dataSaida);
        
                    // Se a nova reserva estiver entre as datas de outra reserva existente
                    const conflitoDatas =
                        (updatedReservaInfo.dataEntrada >= entradaExistente && updatedReservaInfo.dataEntrada < saidaExistente) || 
                        (updatedReservaInfo.dataSaida > entradaExistente && updatedReservaInfo.dataSaida <= saidaExistente) ||
                        (updatedReservaInfo.dataEntrada <= entradaExistente && updatedReservaInfo.dataSaida >= saidaExistente);
        
                    return conflitoDatas;
                });
        
                if (quartoOcupado) {
                    return res.status(400).json({ message: 'Já existe uma reserva nesse quarto nesse intervalo de datas' });
                }

                reservas.push(updatedReservaInfo);
        
                fs.writeFile(reservasPath, JSON.stringify(reservas, null, 2), 'utf8', (err) => {
                    if (err) {
                        return res.status(500).json({ message: 'Erro ao salvar o arquivo.' });
                    }
                    res.json({ message: 'Informações de reserva atualizadas com sucesso!' });
                });
            });
        });

        // Informações de quartos
        app.post('/recanto-perdido/quartos/:id', (req, res) => {
            const { id } = req.params;
            const updatedQuarto = req.body;

            fs.readFile(quartosPath, 'utf8', (err, data) => {
                if (err) {
                    return res.status(500).json({ message: 'Erro ao ler o arquivo quartos-hotel.json' });
                }
        
                let quartos;
                try {
                    quartos = JSON.parse(data);
                } catch (error) {
                    return res.status(500).json({ message: 'Erro ao processar os dados do JSON' });
                }
        
                const quartoIndex = quartos.findIndex(quarto => quarto.id === id.toString());
        
                if (quartoIndex === -1) {
                    return res.status(404).json({ message: 'Quarto não encontrado' });
                }
        
                quartos[quartoIndex] = { ...quartos[quartoIndex], ...updatedQuarto };
        
                fs.writeFile(quartosPath, JSON.stringify(quartos, null, 2), 'utf8', (writeErr) => {
                    if (writeErr) {
                        return res.status(500).json({ message: 'Erro ao salvar o arquivo quartos-hotel.json' });
                    }
        
                    res.status(200).json({ message: 'Quarto atualizado com sucesso', quarto: quartos[quartoIndex] });
                });
            });
        });

        app.get('/recanto-perdido/quartos', (req, res) => {
            fs.readFile(quartosPath, 'utf8', (err, data) => {
                if (err) {
                    return res.status(500).json({ message: 'Erro ao ler o arquivo quartos-hotel.json' });
                }
                res.json(JSON.parse(data));
            });
        });

        app.get('/recanto-perdido/quartos/:id', (req, res) => {
            const { id } = req.params;
        
            fs.readFile(quartosPath, 'utf8', (err, data) => {
                if (err) {
                    return res.status(500).json({ message: 'Erro ao ler o arquivo quartos-hotel.json' });
                }
        
                const quartos = JSON.parse(data); 
                const quarto = quartos.find(quarto => quarto.id === id.toString()); 
        
                if (!quarto) {
                    return res.status(404).json({ message: 'Quarto não encontrado' }); 
                }
        
                res.json(quarto); 
            });
        });

        app.get('/recanto-perdido/quartos/imagem/:imageName', (req, res) => {
            const { imageName } = req.params;
            const filePath = path.join(quartosImagensPath, imageName);
        
            if (fs.existsSync(filePath)) {
                res.sendFile(filePath);
            } else {
                res.status(404).json({ message: 'Imagem não encontrada.' });
            }
        });

        app.post('/recanto-perdido/quartos/imagem/:id', uploadQuartos.single('imagem'), (req, res) => {
            const imagem = req.file;
            res.json({ message: `Imagem ${imagem.filename} salva com sucesso!` });
        });

        app.delete('/recanto-perdido/quartos/imagem/:imagem', (req, res) => {
            const { imagem } = req.params;
            const filePath = path.join(quartosImagensPath, imagem);

            if (fs.existsSync(filePath)) {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Erro ao excluir a imagem:', err);
                        return res.status(500).json({ message: 'Erro ao excluir a imagem.' });
                    }
                    res.status(200).json({ message: 'Imagem excluída com sucesso!' });
                });
            } else {
                res.status(404).json({ message: 'Imagem não encontrada.' });
            }
        });

        // Informações de pacotes
        app.get('/recanto-perdido/pacotes', (req, res) => {
            fs.readFile(pacotesPath, 'utf8', (err, data) => {
                if (err) {
                    return res.status(500).json({ message: 'Erro ao ler o arquivo pacotes-hotel.json' });
                }
                res.json(JSON.parse(data));
            });
        });
    }   
}