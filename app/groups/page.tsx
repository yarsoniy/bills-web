'use client'

import { Fab } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import GroupListItem from "./components/GroupListItem"
import AddIcon from '@mui/icons-material/Add';
import styles from "./styles.module.css"
import {useEffect, useState} from "react";
import SingleTextDialog from "@/app/components/SingleTextDialog";
import {api} from "@/app/api/api";
import {GroupPreview} from "@/app/api/types/group";

export default function GroupsPage() {
  const [openNewGroupDialog, setOpenNewGroupDialog] = useState<boolean>(false);
  const [data, setData] = useState<GroupPreview[]>([]);
  const [newGroupSaved, setNewGroupSaved] = useState<boolean>(false);

  useEffect(() => {
    api.getAllGroups().then((data) => {
      setData(data);
      setNewGroupSaved(false);
    });
  }, [newGroupSaved]);

  const handleOpenNewGroupDialog = () => {
    setOpenNewGroupDialog(true);
  }

  const handleCloseNewGroupDialog = () => {
    setOpenNewGroupDialog(false);
  }

  const handleSaveNewGroup = async (input: string) => {
    await api.createGroup(input);
    setNewGroupSaved(true);
  }

  return (
    <>
      <Grid container spacing={2}>
        {data.map((group) =>
          <Grid key={group.id} xs={12}>
            <GroupListItem group={group}></GroupListItem>
          </Grid>
        )}
      </Grid>
      <Fab className={styles.fab} size="large" color="primary" aria-label="add" onClick={handleOpenNewGroupDialog}>
        <AddIcon />
      </Fab>
      <SingleTextDialog
        title="New group"
        inputLabel="Title"
        open={openNewGroupDialog}
        onClose={handleCloseNewGroupDialog}
        onSave={handleSaveNewGroup}
      />
    </>
  )
}