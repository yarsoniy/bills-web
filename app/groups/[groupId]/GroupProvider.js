'use client'

import {createContext, useEffect, useState} from "react";
import {api} from "@/app/api/api";
import {useParams} from "next/navigation";
import Loader from "@/app/components/Loader";

export const GroupContext = createContext(null);

export default function GroupProvider({children}) {
  const params = useParams();
  const [data, setData] = useState(null);
  const [needRefresh, setNeedRefresh] = useState(false);

  useEffect(() => {
    api.getGroup(params.groupId).then(data => {
      setData(data);
      setNeedRefresh(false);
    })
  }, [params.groupId, needRefresh]);

  const refresh = () => {
    setNeedRefresh(true);
  }

  if (!data) {
    return <Loader/>
  }

  return <GroupContext.Provider value={[data, refresh]}>{children}</GroupContext.Provider>;
}