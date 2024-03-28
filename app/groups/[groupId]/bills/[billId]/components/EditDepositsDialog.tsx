import {ChangeEvent, useEffect, useState} from "react";
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
import {Participant} from "@/app/api/types/group";
import {MoneyBreakdown} from "@/app/api/types/bill";

type StringMoneyBreakdown = {
  [key: string]: string
}

function moneyBreakdownToString(mb: MoneyBreakdown): StringMoneyBreakdown {
  const result: StringMoneyBreakdown = {};
  for (let key in mb) {
    result[key] = String(mb[key]);
  }

  return result;
}

export default function EditDepositsDialog({participants, initialValues, open, onClose, onSave}: {
  participants: Participant[],
  initialValues: MoneyBreakdown,
  open: boolean,
  onSave: (changedDeposits: MoneyBreakdown) => Promise<void>,
  onClose: () => void,
}) {
  const [waitingSave, setWaitingSave] = useState(false);
  const [deposits, setDeposits] = useState(moneyBreakdownToString(initialValues));

  useEffect(() => {
    setDeposits(moneyBreakdownToString(initialValues));
  }, [initialValues])

  const handleValueChange = (id: string, e: ChangeEvent<HTMLInputElement>) => {
    const changedDeposits: StringMoneyBreakdown = {...deposits};
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

    const depositsToSave: MoneyBreakdown = {};
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
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {handleValueChange(p.id, e)}}
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