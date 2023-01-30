import paymentsRepository from "@/repositories/payments-repository";
import { PaymentInput } from "@/protocols";
import ticketsRepository from "@/repositories/tickets-repository.ts";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { notFoundError, unauthorizedError } from "@/errors";
import { badRequestError } from "@/errors/bad-request-error";

async function findPayment(ticketId: number, userId: number) {
  const user = await enrollmentRepository.findEnrollmentByUserId(userId);
  if (!user) {
    throw notFoundError();
  }

  const ticketById = await ticketsRepository.getTicketById(ticketId);
  if (!ticketById) {
    throw notFoundError();
  }
  if (ticketById.Enrollment.userId !== userId) {
    throw unauthorizedError();
  }

  const payment = await paymentsRepository.getPayment(ticketId);
  if (!payment) {
    throw notFoundError();
  }

  return payment;
}

async function postPayment(paymentData: PaymentInput, userId: number) {
  const enrollment = await enrollmentRepository.findEnrollmentByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticketById = await ticketsRepository.getTicketById(paymentData.ticketId);
  if (!ticketById) {
    throw notFoundError();
  }
  if (ticketById.Enrollment.userId !== userId) {
    throw unauthorizedError();
  }
  if (!paymentData.ticketId) {
    throw badRequestError();
  }
  if (!paymentData) {
    throw badRequestError();
  }

  const ticketType = await ticketsRepository.getTicketTypeById(ticketById.ticketTypeId);

  await ticketsRepository.updateTicket(paymentData.ticketId);

  const body = {
    ticketId: paymentData.ticketId,
    value: ticketType.price,
    cardIssuer: paymentData.cardData.issuer,
    cardLastDigits: paymentData.cardData.number.toString().slice(-4),
  };

  const payment = await paymentsRepository.createPayment(body);

  return payment;
}

const paymentServices = {
  postPayment, findPayment
};

export default paymentServices;
