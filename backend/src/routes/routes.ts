import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { env } from "../env";
import { ReservaController } from "../controller/reserva.controller";


export class Routes {
    private reservaController: ReservaController;

    constructor() {
        this.reservaController = new ReservaController()
    }

    routes(app: FastifyInstance) {

        //Buscar detalhes da viagem pelo id
        app.withTypeProvider<ZodTypeProvider>().get(`/reservas/:reservaId`, {
            schema: {
                params: z.object({
                    reservaId: z.string().uuid()
                })
            },
        }, async (request) => {
            const { reservaId } = request.params
            return await this.reservaController.buscarDetalhesReserva(reservaId)
        })

    }
}