import ReservaService from "../service/reserva.service"

export class ReservaController {
    private reservaService: ReservaService

    constructor() {
        this.reservaService = new ReservaService();
    }

    async buscarDetalhesReserva(tripId: string) {
        console.log("Teste");
    }
}