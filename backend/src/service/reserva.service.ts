export default class TripService {

    async buscarDetalhesReserva(tripId: string) {
        const trip = await prisma.trip.findUnique({
            select: {
                id: true,
                destination: true,
                starts_at: true,
                ends_at: true,
                is_confirmed: true
            },  
            where: { id: tripId }
        })
    
        if(!trip){
            throw new ClientError('Trip not found')
        }
    
        return { trip }
    }

}