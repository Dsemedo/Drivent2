import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getUserTicket, getTicketType, postUserTicket } from "@/controllers/tickets-controller";
import createTicketSchema from "@/schemas/ticket-schame";
const ticketsRouter = Router();

ticketsRouter.all("/*", authenticateToken)
  .get("/", getUserTicket)
  .get("/types", getTicketType)
  .post("/", validateBody(createTicketSchema), postUserTicket);

export { ticketsRouter };
