import mongoose from "mongoose";
const { Schema, model } = mongoose;

export const EnderecoSchema = new Schema({
    rua: { type: String, required: true },
    numero: { type: Number, required: true },
    complemento: { type: String },
    bairro: { type: String, required: true },
    cidade: { type: String, required: true },
    estado: { type: String, required: true }
});

export const HotelSchema = new Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    endereco: { type: EnderecoSchema, required: true },
    servicosPrestados: { type: [String], required: true },
    contatos: { type: [String], required: true },
    imagem: { type: [Buffer] },
    createdAt: { type: Date, default: Date.now }
});

const Hotel = model("Hotel", HotelSchema);
export default Hotel;