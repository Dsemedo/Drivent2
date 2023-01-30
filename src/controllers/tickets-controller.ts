import { Request, Response } from "express";
import ticketsService from "@/services/tickets-service";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";

export async function getTicketType(req: Request, res: Response) {
  try {
    const ticketType = await ticketsService.getAllTicketsTypes();

    res.send(ticketType).status(httpStatus.OK);
  } catch (err) {
    return res.status(httpStatus.NO_CONTENT);
  }
}

export async function getUserTicket(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  try {
    const ticket = await ticketsService.getOnlyUserTicket(userId);

    res.send(ticket).status(httpStatus.OK);
  } catch (err) {
    if (err.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function postUserTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body;
  const userId = req.userId;

  try {
    const insertTicket = await ticketsService.postTicket(userId, ticketTypeId);

    return res.send(insertTicket).status(httpStatus.CREATED);
  } catch (err) {
    if (err.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if(err.name === "badRequestError") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

const ticketsController = {
  getTicketType,
  getUserTicket,
  postUserTicket
};

export default ticketsController;
