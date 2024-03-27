'use client'

import {createContext, useEffect, useState} from "react";
import {api} from "@/app/api/api";
import {useParams} from "next/navigation";
import Loader from "@/app/components/Loader";

export const BillItemContext = createContext(null);

export default function BillItemProvider({children}) {
  const params = useParams();
  const [billItem, setBillItem] = useState(null);

  useEffect(() => {
    api.getBillItem(params.billId, params.itemId).then((billItem) => {setBillItem(billItem)})
  }, [params.billId, params.itemId]);

  return <Loader/>
  if (!billItem) {
    return <Loader/>
  }

  return <BillItemContext.Provider value={billItem}>{children}</BillItemContext.Provider>;
}