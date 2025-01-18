import Hotel from "../model/Hotel";

export default class HotelRepository {
    constructor() {}

    async buscarDetalhesHotel() {
        return await Hotel.findOne().sort({ createdAt: -1 });
    }  

    async salvarDetalhesHotel(hotelId: String | null, hotel: any) {
        try {
            const updatedHotel = await Hotel.findByIdAndUpdate(
                hotelId,          
                { $set: hotel },
                { new: true, upsert: true } 
            );
    
            if (!updatedHotel) {
                throw new Error("Hotel não encontrado");
            }
    
            return updatedHotel;
        } catch (error) {
            console.error("Erro ao atualizar os detalhes do hotel:", error);
            throw new Error("Erro ao atualizar os detalhes do hotel");
        }
    }
}