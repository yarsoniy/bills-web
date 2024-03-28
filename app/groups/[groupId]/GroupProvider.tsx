'use client'

import React, {createContext, useEffect, useState} from "react";
import {api} from "@/app/api/api";
import {useParams} from "next/navigation";
import Loader from "@/app/components/Loader";
import {Group} from "@/app/api/types/group";

const defaultData: Group = {
  id: '',
  title: '',
  createdAt: '',
  participants: []
}
export const GroupContext = createContext<[Group, () => void]>([defaultData, () => {}]);

export default function GroupProvider({children}: {
  children: React.ReactNode
}) {
  const params = useParams<{groupId: string}>();
  const [data, setData] = useState<Group|null>(null);
  const [needRefresh, setNeedRefresh] = useState<boolean>(false);

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