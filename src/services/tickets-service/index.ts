import ticketsRepository from "@/repositories/tickets-repository.ts";
import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";

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
  const result = await enrollmentRepository.findEnrollmentByUserId(userId);

  if (!result) {
    throw notFoundError();
  }

  return await ticketsRepository.newTicket(ticketTypeId, result.id);
}

const ticketsService = {
  getAllTicketsTypes,
  getOnlyUserTicket,
  postTicket
};

export default ticketsService;
