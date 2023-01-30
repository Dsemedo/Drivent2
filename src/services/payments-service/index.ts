import paymentsRepository from "@/repositories/payments-repository";
import { PaymentType } from "@/protocols";
import ticketsRepository from "@/repositories/tickets-repository.ts";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { notFoundError, unauthorizedError } from "@/errors";

async function findPayment(ticketId: number, userId: number) {
  const user = await enrollmentRepository.findEnrollmentByUserId(userId);
  if(!user) {
    throw notFoundError();
  }
  const ticket = await ticketsRepository.getUserTicket(ticketId);
  if(!ticket) {
    throw notFoundError();
  }
  const payment = await paymentsRepository.getPayment(ticketId);
  if(!payment) {
    throw notFoundError();
  }
  return payment;
}

async function postPayment(paymentData: PaymentType, userId: number) {
  const ticketById = await ticketsRepository.getTicketById(paymentData.ticketId);
  if(!ticketById) {
    throw notFoundError();
  }
  const enrollment = await enrollmentRepository.findEnrollmentByUserId(userId);
  if(!enrollment) {
    throw notFoundError();
  }

  await ticketsRepository.updateTicket(paymentData.ticketId);
  
  const payment = await paymentsRepository.createPayment(paymentData);

  return payment;
}

const paymentServices = {
  postPayment, findPayment
};

export default paymentServices;
