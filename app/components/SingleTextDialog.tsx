import {ReactNode, useState, ChangeEvent} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

export default function SingleTextDialog({title, inputLabel, open, onSave, onClose}: {
  title: string,
  inputLabel: string,
  open: boolean,
  onSave: (value: string) => Promise<void>,
  onClose: () => void,
}): ReactNode {
  const [inputValue, setInputValue] = useState<string>('');
  const [waitingSave, setWaitingSave] = useState<boolean>(false);

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
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