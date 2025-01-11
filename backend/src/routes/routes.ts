import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { TripController } from "../controller/trip.controller";
import { env } from "../env";
import { ParticipantController } from "../controller/participant.controller";
import { ActivityController } from "../controller/activity.controller";
import { LinkController } from "../controller/link.controller";
import { Activity } from "../model/Activity";
import { Link } from "../model/Link";


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