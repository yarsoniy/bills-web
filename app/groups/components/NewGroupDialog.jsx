import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

export default function NewGroupDialog({open, onClose}) {
  const [groupTitle, setGroupTitle] = useState('');
  const [waitingSave, setWaitingSave] = useState(false);

  const handleSave = () => {
    if (waitingSave) {
      return;
    }
    setWaitingSave(true);

    (async () => {
      try {
        const response = await fetch('/api/v1/participant_group/', {
          method: 'POST',
          body: JSON.stringify({
            title: groupTitle
          })
        });
        if (response.status !== 200) {
          throw new Error('Request failed');
        }
      } finally {
        setWaitingSave(false);
      }

      onClose();
    })();
  }

  const handleGroupTitleChange = (e) => {
    setGroupTitle(e.target.value);
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>New group</DialogTitle>
      <DialogContent>
        <TextField
          label="Group title"
          margin="dense"
          onChange={handleGroupTitleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button disabled={waitingSave} onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}