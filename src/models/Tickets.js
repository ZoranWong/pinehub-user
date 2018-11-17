import Model from './Model';
import TicketTransformer from '@/models/transformers/Ticket';

export default class Tickets extends Model {
  constructor (application) {
    super(application);
    this.transformer = TicketTransformer;
  }
}
