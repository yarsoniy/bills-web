'use client'

import {createContext, useEffect, useState} from "react";
import {api} from "@/app/api/api";
import {useParams} from "next/navigation";
import Loader from "@/app/components/Loader";

export const BillContext = createContext(null);

export default function BillProvider({children}) {
  const params = useParams();
  const [data, setData] = useState(null);
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