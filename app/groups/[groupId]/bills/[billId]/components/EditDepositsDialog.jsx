import {useEffect, useState} from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableRow, TextField
} from "@mui/material";

export default ({participants, initialValues, open, onClose, onSave}) => {
  const [waitingSave, setWaitingSave] = useState(false);
  const [deposits, setDeposits] = useState(initialValues);

  useEffect(() => {
    setDeposits(initialValues);
  }, [initialValues])

  const handleValueChange = (id, e) => {
    const changedDeposits = {...deposits};
    changedDeposits[id] = e.target.value;
    setDeposits(changedDeposits);
  }
  const handleClose = () => {
    onClose();
  }
  const handleSave = () => {
    if (waitingSave) {
      return;
    }
    setWaitingSave(true);

    const depositsToSave = {};
    for (let id in deposits) {
      depositsToSave[id] = Number.parseFloat(deposits[id]);
    }

    (async () => {
      try {
        await onSave(depositsToSave);
      } finally {
        setWaitingSave(false);
      }
      handleClose();
    })()
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit deposits</DialogTitle>
        <DialogContent>
          <Table size="small">
            <TableBody>
              {participants.map((p) =>
                <TableRow key={p.id}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>
                    <TextField
                      value={deposits[p.id]}
                      onChange={(e) => {handleValueChange(p.id, e)}}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={waitingSave} onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}