import {MoneyBreakdown} from "@/app/api/types/bill";

export type BillItemPreview = {
  id: string,
  title: string,
  cost: number,
}
export type BillItem = {
  id: string,
  title: string,
  cost: number,
  agreement: SplitAgreement,
  costBreakdown: {
    values: MoneyBreakdown
  }
}
export type SplitAgreement = {
  rules: SplitRule[]
}
export type SplitRule = {
  itemPayers: string[],
  itemUsers: string[],
}