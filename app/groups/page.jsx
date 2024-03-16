'use client'

import { Fab } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import GroupListItem from "./components/GroupListItem"
import AddIcon from '@mui/icons-material/Add';
import styles from "./styles.module.css"
import {useEffect, useState} from "react";
import SingleTextDialog from "@/app/components/SingleTextDialog";

export default function GroupsPage() {
  const [openNewGroupDialog, setOpenNewGroupGialog] = useState(false);
  const [data, setData] = useState([]);
  const [newGroupSaved, setNewGroupSaved] = useState(false);

  useEffect(() => {
    fetch('/api/v1/participant_group')
      .then((response) => response.json())
      .then((data) => {setData(data.data)})
      .then(() => {setNewGroupSaved(false)})
  }, [newGroupSaved]);

  const groupItems = data.map((group) => {
    return (
      <Grid key={group.id} xs={12}>
          <GroupListItem group={group}></GroupListItem>
      </Grid>
    )
  })

  const handleOpenNewGroupDialog = () => {
    setOpenNewGroupGialog(true);
  }

  const handleCloseNewGroupDialog = () => {
    setOpenNewGroupGialog(false);
  }

  const handleSaveNewGroup = async (input) => {
    const response = await fetch('/api/v1/participant_group/', {
      method: 'POST',
      body: JSON.stringify({title: input})
    });
    if (response.status !== 200) {
      throw new Error('Request failed');
    }
    setNewGroupSaved(true);
  }

  return (
    <>
      <Grid container spacing={2}>
        {groupItems}
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