import { ReservaController } from "../controller/reserva.controller";

export class Routes {
    private reservaController: ReservaController;

    constructor() {
        this.reservaController = new ReservaController()
    }

    routes(app: any) {
        
        app.get("/", (req, res) => {
            res.send("Hello World!");
        });

        app.get("/reservas/:reservaId", (req, res) => {
            const { reservaId } = req.params;

            const response = this.reservaController.buscarDetalhesReserva(reservaId);
            res.send(response);
        });

        app.get("/reservas", (req, res) => {
            const response = this.reservaController.buscarReservas();
            res.send(response);
        });

        app.post("/reservas", (req, res) => {
            const { body } = req;

            const response = this.reservaController.criarReserva(body);
            res.send(response);
        });

        app.put("/reservas/:reservaId", (req, res) => {
            const { reservaId } = req.params;
            const { body } = req;

            const response = this.reservaController.atualizarReserva(reservaId, body);
            res.send(response);
        });

        app.delete("/reservas/:reservaId", (req, res) => {
            const { reservaId } = req.params;

            const response = this.reservaController.deletarReserva(reservaId);
            res.send(response);
        });
    }
}