import { prisma } from "@/config";
import { PaymentType } from "@/protocols";

async function getPayment(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function createPayment(data: PaymentType) {
  return prisma.payment.create({
    data
  });
}

const paymentsRepository = {
  getPayment,
  createPayment,
};

export default paymentsRepository;
