'use client'

import {createContext, useEffect, useState} from "react";
import {api} from "@/app/api/api";
import {useParams} from "next/navigation";
import Loader from "@/app/components/Loader";

export const BillItemContext = createContext(null);

export default function BillItemProvider({children}) {
  const params = useParams();
  const [data, setData] = useState(null);
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