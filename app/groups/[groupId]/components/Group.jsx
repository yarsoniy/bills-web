import {Chip, Divider, IconButton, Paper, Stack} from "@mui/material";
import styles from "../styles.module.css";
import AddIcon from "@mui/icons-material/Add";
import {useContext, useEffect, useState} from "react";
import SingleTextDialog from "@/app/components/SingleTextDialog";
import {api} from "@/app/api/api";
import {GroupContext} from "@/app/groups/[groupId]/GroupProvider";

export default function Group() {
  const group = useContext(GroupContext);

  const [openNewParticipantDialog, setOpenNewParticipantDialog] = useState(false);

  const handleAddParticipantClick = () => {
    setOpenNewParticipantDialog(true);
  }
  const handleNewParticipantDialogClose = () => {
    setOpenNewParticipantDialog(false);
  }
  const handleNewParticipantSave = async (input) => {
    await api.createParticipant(group.id, input);
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