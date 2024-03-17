'use client'

import { Fab } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import GroupListItem from "./components/GroupListItem"
import AddIcon from '@mui/icons-material/Add';
import styles from "./styles.module.css"
import {useEffect, useState} from "react";
import SingleTextDialog from "@/app/components/SingleTextDialog";
import {api} from "@/app/api/api";

export default function GroupsPage() {
  const [openNewGroupDialog, setOpenNewGroupGialog] = useState(false);
  const [data, setData] = useState([]);
  const [newGroupSaved, setNewGroupSaved] = useState(false);

  useEffect(() => {
    api.getAllGroups().then((data) => {
      setData(data);
      setNewGroupSaved(false);
    });
  }, [newGroupSaved]);

  const handleOpenNewGroupDialog = () => {
    setOpenNewGroupGialog(true);
  }

  const handleCloseNewGroupDialog = () => {
    setOpenNewGroupGialog(false);
  }

  const handleSaveNewGroup = async (input) => {
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