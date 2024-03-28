import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";

export default function AddBillItemDialog({open, onSave, onClose}: {
  open: boolean,
  onSave: (title: string, cost: number) => Promise<void>,
  onClose: () => void,
}) {
  const [waitingSave, setWaitingSave] = useState(false);
  const [title, setTitle] = useState('');
  const [cost, setCost] = useState('');

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }
  const handleCostChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCost(e.target.value);
  }

  const handleClose = () => {
    setTitle('');
    setCost('');
    onClose();
  }
  const handleSave = () => {
    if (waitingSave) {
      return;
    }
    setWaitingSave(true);

    (async () => {
      try {
        await onSave(title, Number.parseFloat(cost));
      } finally {
        setWaitingSave(false);
      }
      handleClose();
    })()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add bill item</DialogTitle>
      <DialogContent>
        <Stack>
          <TextField value={title} label="Title" margin="dense" onChange={handleTitleChange}/>
          <TextField value={cost} label="Cost" margin="dense" onChange={handleCostChange}/>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button disabled={waitingSave} onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}