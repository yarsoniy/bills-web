import {Chip, Divider, IconButton, Paper, Stack} from "@mui/material";
import styles from "../styles.module.css";
import AddIcon from "@mui/icons-material/Add";
import {useEffect, useState} from "react";
import SingleTextDialog from "@/app/components/SingleTextDialog";

export default function Group({groupId}) {
  const [group, setGroup] = useState(null);
  const [groupOutdated, setGroupOutdated] = useState(false);
  const [openNewParticipantDialog, setOpenNewParticipantDialog] = useState(false);

  useEffect(() => {
    fetch('/api/v1/participant_group/' + groupId)
      .then((response) => response.json())
      .then((data) => {
        setGroup(data.data);
        setGroupOutdated(false);
      })
  }, [groupId, groupOutdated])

  const handleAddParticipantClick = () => {
    setOpenNewParticipantDialog(true);
  }
  const handleNewParticipantDialogClose = () => {
    setOpenNewParticipantDialog(false);
  }
  const handleNewParticipantSave = async (input) => {
    const response = await fetch('/api/v1/participant_group/'+groupId+'/participant', {
      method: 'POST',
      body: JSON.stringify({name: input})
    });
    if (response.status !== 200) {
      throw new Error('Request failed');
    }
    setGroupOutdated(true);
  }

  if (!group) {
    return <div className={styles.loader}>Loading...</div>
  }

  return (
    <Paper>
      <div className={styles.details}>
        <h3>{group.title}</h3>
        <div className={styles.createdAt}>{group.createdAt}</div>
      </div>
      <Divider></Divider>
      <div className={styles.participants}>
        {!group.participants.length ? "No participants" : ""}
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
          {group.participants.map((p) => {
            return <Chip key={p.id} label={p.name}></Chip>
          })}
        </Stack>
        <IconButton onClick={handleAddParticipantClick}>
          <AddIcon />
        </IconButton>
        <SingleTextDialog
          title="New participant"
          inputLabel="Name"
          open={openNewParticipantDialog}
          onClose={handleNewParticipantDialogClose}
          onSave={handleNewParticipantSave}
        />
      </div>
    </Paper>
  )
}