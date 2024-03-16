import {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

export default function SingleTextDialog({title, inputLabel, open, onSave, onClose}) {
  const [inputValue, setInputValue] = useState('');
  const [waitingSave, setWaitingSave] = useState(false);

  const handleValueChange = (e) => {
    setInputValue(e.target.value);
  }
  const handleClose = () => {
    setInputValue('');
    onClose();
  }

  const handleSave = () => {
    if (waitingSave) {
      return;
    }
    setWaitingSave(true);

    (async () => {
      try {
        await onSave(inputValue);
      } finally {
        setWaitingSave(false);
      }
      handleClose();
    })()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField value={inputValue} label={inputLabel} margin="dense" onChange={handleValueChange}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button disabled={waitingSave} onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}