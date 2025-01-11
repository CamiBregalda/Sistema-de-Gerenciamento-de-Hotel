import TripService from "../service/trip.service"

export class ReservaController {
    private reservaService: ReservaService

    constructor() {
        this.reservaService = new ReservaService();
    }

    async buscarDetalhesReserva(tripId: string) {
        console.log("Teste");
    }
}