import HotelRepository from "../repository/hotel.repository"

export default class HotelService {
    private hotelRepository: HotelRepository

    constructor() {
        this.hotelRepository = new HotelRepository();
    }

    async salvarDetalhesHotel(hotel: any) {
        return this.hotelRepository.salvarDetalhesHotel(null, hotel);
    }

    async buscarDetalhesHotel() {
        return this.hotelRepository.buscarDetalhesHotel();
    }

    async atualizarDetalhesHotel(hotelId: String, hotel: any) {
        return this.hotelRepository.salvarDetalhesHotel(hotelId, hotel);
    }
}