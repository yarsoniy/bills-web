import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

export default function NewParticipantDialog({groupId, open, onClose, onSave}) {
  const [inputValue, setInputValue] = useState('');
  const [waitingSave, setWaitingSave] = useState(false);

  const handleSave = () => {
    if (waitingSave) {
      return;
    }
    setWaitingSave(true);

    (async () => {
      try {
        const response = await fetch('/api/v1/participant_group/'+groupId+'/participant', {
          method: 'POST',
          body: JSON.stringify({
            name: inputValue
          })
        });
        if (response.status !== 200) {
          throw new Error('Request failed');
        }
      } finally {
        setWaitingSave(false);
      }

      onClose();
      onSave();
    })();
  }

  const handleParticipantNameChange = (e) => {
    setInputValue(e.target.value);
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>New participant</DialogTitle>
      <DialogContent>
        <TextField label="Name" margin="dense" onChange={handleParticipantNameChange}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button disabled={waitingSave} onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}