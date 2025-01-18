import HotelService from "../service/hotel.service"

export class HotelController {
    private hotelService: HotelService

    constructor() {
        this.hotelService = new HotelService();
    }

    async salvarDetalhesHotel(hotel: any) {
        return this.hotelService.salvarDetalhesHotel(hotel);
    }

    async buscarDetalhesHotel() {
        return this.hotelService.buscarDetalhesHotel();
    }

    async atualizarDetalhesHotel(hotelId: String, hotel: any) {
        return this.hotelService.atualizarDetalhesHotel(hotelId, hotel);
    }
    /*

    async buscarReservas() {
        return this.reservaService.buscarReservas();
    }

    async criarReserva(body: any) {
        return this.reservaService.criarReserva(body);
    }

    async atualizarReserva(reservaId: string, body: any) {
        return this.reservaService.atualizarReserva(reservaId, body);
    }

    async deletarReserva(reservaId: string) {
        return this.reservaService.deletarReserva(reservaId);
    }*/
}