'use client'

import React, {createContext, useEffect, useState} from "react";
import {api} from "@/app/api/api";
import {useParams} from "next/navigation";
import Loader from "@/app/components/Loader";
import {BillItem} from "@/app/api/types/billItem";
import {number} from "prop-types";

const defaultData: BillItem = {
  id: '',
  title: '',
  cost: 0,
  agreement: {
    rules: []
  },
  costBreakdown: {values: {}}
}
export const BillItemContext = createContext<[BillItem, () => void]>([defaultData, () => {}]);

export default function BillItemProvider({children}: {
  children: React.ReactNode
}) {
  const params: {
    billId: string,
    itemId: string
  } = useParams();
  const [data, setData] = useState(defaultData);
  const [needRefresh, setNeedRefresh] = useState(false);

  useEffect(() => {
    api.getBillItem(params.billId, params.itemId).then((data) => {
      setData(data);
      setNeedRefresh(false);
    })
  }, [params.billId, params.itemId, needRefresh]);

  const refresh = () => {
    setNeedRefresh(true);
  }

  if (!data) {
    return <Loader/>
  }

  return <BillItemContext.Provider value={[data, refresh]}>{children}</BillItemContext.Provider>;
}