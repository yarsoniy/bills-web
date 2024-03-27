'use client'

import {createContext, useEffect, useState} from "react";
import {api} from "@/app/api/api";
import {useParams} from "next/navigation";
import styles from "@/app/groups/[groupId]/bills/[billId]/styles.module.css";
import Loader from "@/app/components/Loader";

export const GroupContext = createContext(null);

export default function GroupProvider({children}) {
  const params = useParams();
  const [group, setGroup] = useState(null);

  useEffect(() => {
    api.getGroup(params.groupId).then(data => {setGroup(data)})
  }, [params.groupId]);

  if (!group) {
    return <Loader/>
  }

  return <GroupContext.Provider value={group}>{children}</GroupContext.Provider>;
}