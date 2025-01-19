const hotelJson = "../../../frontend/json/hotel-info.json";
const servicosJson = "../../../frontend/json/servicos-hotel.json";

const express = require('express');
const fs = require('fs');
const path = require('path');

const hotelInfoPath = path.join(__dirname, hotelJson);
const servicosPath = path.join(__dirname, servicosJson);

export class Routes {
    routes(app: any) {
        app.get('/recanto-perdido', (req, res) => {
            fs.readFile(hotelInfoPath, 'utf8', (err, data) => {
                if (err) {
                    return res.status(500).json({ message: 'Erro ao ler o arquivo jotel-info.json.' });
                }
                res.json(JSON.parse(data));
            });
        });

        app.post('/recanto-perdido', (req, res) => {
            const updatedHotelInfo = req.body;

            // Salvando os dados no arquivo JSON
            fs.writeFile(hotelInfoPath, JSON.stringify(updatedHotelInfo, null, 2), 'utf8', (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Erro ao salvar o arquivo.' });
                }
                res.json({ message: 'Informações do hotel atualizadas com sucesso!' });
            });
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

            // Salvando os dados no arquivo JSON
            fs.writeFile(servicosPath, JSON.stringify(updatedServicos, null, 2), 'utf8', (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Erro ao salvar o arquivo.' });
                }
                res.json({ message: 'Informações de serviços atualizadas com sucesso!' });
            });
        });
    }   
}