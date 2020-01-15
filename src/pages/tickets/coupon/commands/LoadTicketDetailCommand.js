import Command from '@/commands/Command';
export default class LoadTicketDetailCommand extends Command {
    async handle (id) {
        let response = await this.service('http.tickets').ticketDetail(id);
        
        this.model.user.tickets.dispatch('saveTicketDetail', {
            detail: response
        })
    }
    
    static commandName () {
        return 'LOAD_TICKET_DETAIL';
    }
}
