import ReservaService from "../service/reserva.service"

export class ReservaController {
    private reservaService: ReservaService

    constructor() {
        this.reservaService = new ReservaService();
    }

    async buscarDetalhesReserva(reservaId: string) {
        return this.reservaService.buscarDetalhesReserva(reservaId);
    }/*

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