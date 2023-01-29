import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getUserTicket, getTicketType, postUserTicket } from "@/controllers/tickets-controller";

const ticketsRouter = Router();

ticketsRouter.all("/*", authenticateToken)
  .get("/", getUserTicket)
  .get("/types", getTicketType)
  .post("/", postUserTicket);

export { ticketsRouter };
