import Command from '@/commands/Command';

export default class LoadCanReceiveTicketsCommand extends Command {
    async handle () {
        let response = await this.service('http.tickets').canReceiveTickets();
        console.log(response, 'can receive');
        this.model.user.tickets.dispatch('canReceiveTicketsList', {
            tickets: response
        })
    }

    static commandName () {
        return 'LOAD_CAN_RECEIVE_TICKETS';
    }
}
