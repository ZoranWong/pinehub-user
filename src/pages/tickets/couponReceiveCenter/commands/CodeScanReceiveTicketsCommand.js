import Command from '@/commands/Command';

export default class CodeScanReceiveTicketsCommand extends Command {
    async handle (id) {
        let response = await this.service('http.tickets').ticketDetail(id);
        console.log(response, 'can receive');
        this.model.user.tickets.dispatch('codeScanReceiveTicket', {
            ticket: response
        })
    }

    static commandName () {
        return 'CODE_SCAN_RECEIVE_TICKETS';
    }
}
