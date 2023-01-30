/* eslint-disable no-empty */
import { Response } from "express";
import paymentServices from "@/services/payments-service";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import { PaymentType } from "@/protocols";

async function getUserPayment(req: AuthenticatedRequest, res: Response) {
  const ticketId = req.query.ticketId as string | undefined;
  const userId = req.userId;

  try {
    const newPayment = await paymentServices.findPayment(Number(ticketId), userId);
    return res.status(httpStatus.OK).send(newPayment);
  } catch (err) {
    if (err.name === "BadRequestError") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    else if (err.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    else if (err.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  }
}

async function postUserPayment(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const payment = req.body as PaymentType;

  try {
    const insertPayment = await paymentServices.postPayment(payment, userId);
    return res.status(httpStatus.OK).send(insertPayment);
  } catch (err) {
    if (err.name === "BadRequestError") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    else if (err.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    else if (err.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  }
}

const paymentController = {
  getUserPayment,
  postUserPayment
};

export default paymentController;
