'use client'

import React, {createContext, useEffect, useState} from "react";
import {api} from "@/app/api/api";
import {useParams} from "next/navigation";
import Loader from "@/app/components/Loader";
import {Bill} from "@/app/api/types/bill";
const defaultData: Bill = {
  id: '',
  title: '',
  createdAt: '',
  totalCost: 0,
  items: [],
}
export const BillContext = createContext<[Bill, () => void]>([defaultData, () => {}]);

export default function BillProvider({children}: {
  children: React.ReactNode
}) {
  const params = useParams<{
    billId: string
  }>();
  const [data, setData] = useState<Bill|null>(null);
  const [needRefresh, setNeedRefresh] = useState(false);

  useEffect(() => {
    api.getBill(params.billId).then(data => {
      setData(data);
      setNeedRefresh(false);
    })
  }, [params.billId, needRefresh]);

  const refresh = () => {
    setNeedRefresh(true);
  }

  if (!data) {
    return <Loader/>
  }

  return <BillContext.Provider value={[data, refresh]}>{children}</BillContext.Provider>;
}