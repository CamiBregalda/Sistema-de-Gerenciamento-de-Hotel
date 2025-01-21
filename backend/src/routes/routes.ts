import { console } from "inspector";

const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const loginInfoPath = path.join(__dirname, "../../../frontend/json/credenciais-hotel.json");
const hotelInfoPath = path.join(__dirname, "../../../frontend/json/hotel-info.json");
const servicosPath = path.join(__dirname, "../../../frontend/json/servicos-hotel.json");

const hotelImagensPath = path.join(__dirname, '../../../frontend/img/hotel/');

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
    }   
}