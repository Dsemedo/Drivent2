import { prisma } from "@/config";
import { TicketStatus } from "@prisma/client";

async function getTicketsType() {
  return await prisma.ticketType.findMany();
}

async function getUserTicket(id: number) {
  return await prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId: id,
      },
    },
    include: {
      TicketType: true,
    },
  });
}

async function newTicket(ticketTypeId: number, enrollmentId: number) {
  return await prisma.ticket.create({
    data: {
      ticketTypeId,
      status: TicketStatus.RESERVED,
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

const ticketsRepository = {
  getTicketsType,
  getUserTicket,
  newTicket
};

export default ticketsRepository;
