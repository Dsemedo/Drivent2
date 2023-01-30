import { authenticateToken, validateBody } from "@/middlewares";
import { getUserPayment, postUserPayment } from "@/controllers/payments-controller.";
import { Router } from "express";
import { PaymentSchema } from "@/schemas/payment-schema";

export const paymentRouter = Router();

paymentRouter.all("/*", authenticateToken)
  .get("/", getUserPayment)
  .post("/process", validateBody(PaymentSchema), postUserPayment);
