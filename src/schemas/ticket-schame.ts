import Joi from "joi";

const createTicketSchema = Joi.object({
  ticketTypeId: Joi.number().required()
});

export default createTicketSchema; 
