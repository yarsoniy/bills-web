import {BillItemPreview} from "@/app/api/types/billItem";

export type BillPreview = {
  id: string,
  title: string,
  createdAt: string,
  totalCost: number,
}
export type Bill = {
  id: string,
  title: string,
  createdAt: string,
  totalCost: number,
  items: BillItemPreview[],
}
export type MoneyBreakdown = {
  [key: string]: number
}
export type ParticipantSummary = {
  deposits: {
    values: MoneyBreakdown
  },
  breakdown: {
    values: MoneyBreakdown
  },
  balance: {
    values: MoneyBreakdown
  },
}
export type ParticipantDeposits = {}