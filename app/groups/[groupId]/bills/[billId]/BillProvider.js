'use client'

import {createContext, useEffect, useState} from "react";
import {api} from "@/app/api/api";
import {useParams} from "next/navigation";

export const BillContext = createContext(null);

export default function BillProvider({children}) {
  const params = useParams();
  const [bill, setBill] = useState(null);

  useEffect(() => {
    api.getBill(params.billId).then(bill => {setBill(bill)})
  }, [params.billId]);

  return <BillContext.Provider value={bill}>{children}</BillContext.Provider>;
}