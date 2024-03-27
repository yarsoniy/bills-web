'use client'

import {createContext, useEffect, useState} from "react";
import {api} from "@/app/api/api";
import {useParams} from "next/navigation";
import Loader from "@/app/components/Loader";

export const BillContext = createContext(null);

export default function BillProvider({children}) {
  const params = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.getBill(params.billId).then(data => {setData(data)})
  }, [params.billId]);

  if (!data) {
    return <Loader/>
  }

  return <BillContext.Provider value={data}>{children}</BillContext.Provider>;
}