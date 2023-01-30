import ticketsRepository from "@/repositories/tickets-repository.ts";
import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { badRequestError } from "@/errors/bad-request-error";

async function getAllTicketsTypes() {
  const result = await ticketsRepository.getTicketsType();

  return result;
}

async function getOnlyUserTicket(userId: number) {
  const result = await ticketsRepository.getUserTicket(userId);

  if (!result) {
    throw notFoundError();
  }

  return result;
}

async function postTicket(userId: number, ticketTypeId: number) {
  const result = await enrollmentRepository.findByUserId(userId);

  if (!result) {
    throw notFoundError();
  }
  if (!ticketTypeId) {
    throw badRequestError();
  }

  const response = await ticketsRepository.newTicket(ticketTypeId, result.id);

  return response;
}

const ticketsService = {
  getAllTicketsTypes,
  getOnlyUserTicket,
  postTicket
};

export default ticketsService;
