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

async function updateTicket(ticketId: number) {
  return await prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: "PAID",
    }
  });
}

async function getTicketById(id: number) {
  return await prisma.ticket.findFirst({
    where: {
      id,
    },
  });
}

async function getTicketTypeBYId(ticketTypeId: number) {
  return await prisma.ticketType.findFirst({
    where: {
      id: ticketTypeId
    },
    select: {
      price: true,
    }
  });
}

const ticketsRepository = {
  getTicketsType,
  getUserTicket,
  newTicket,
  updateTicket,
  getTicketById,
  getTicketTypeBYId
};

export default ticketsRepository;
