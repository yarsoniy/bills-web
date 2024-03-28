import {IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useEffect, useState} from "react";
import {api} from "@/app/api/api";
import EditIcon from "@mui/icons-material/Edit";
import EditDepositsDialog from "@/app/groups/[groupId]/bills/[billId]/components/EditDepositsDialog";
import {Participant} from "@/app/api/types/group";
import {MoneyBreakdown, ParticipantSummary} from "@/app/api/types/bill";

export default function BillParticipantSummary({billId, participants}: {
  billId: string,
  participants: Participant[]
}) {
  const [summaryChanged, setSummaryChanged] = useState(false);
  const [summary, setSummary] = useState<ParticipantSummary>({
    deposits: {values: {}},
    breakdown: {values: {}},
    balance: {values: {}},
  });

  const [openEditDepositsDialog, setOpenEditDepositsDialog] = useState(false);

  const handleOpenEditDepositsDialog = () => {
    setOpenEditDepositsDialog(true);
  }
  const handleCloseEditDepositsDialog = () => {
    setOpenEditDepositsDialog(false);
  }
  const handleSaveDeposits = async (changedDeposits: MoneyBreakdown) => {
    await api.putBillParticipantDeposits(billId, {values: changedDeposits})
    handleCloseEditDepositsDialog();
    setSummaryChanged(true);
  }

  useEffect(() => {
    api.getBillParticipantSummary(billId).then((data) => {
      setSummary(data);
      setSummaryChanged(false)
    })
  }, [billId, summaryChanged]);

  const [deposits, breakdown, balance]: [MoneyBreakdown, MoneyBreakdown, MoneyBreakdown] = [{}, {}, {}];
  for (let index in participants) {
    const p = participants[index];
    const id = p.id
    deposits[id] = summary.deposits.values[id] ? summary.deposits.values[id] : 0;
    breakdown[id] = summary.breakdown.values[id] ? summary.breakdown.values[id] : 0;
    balance[id] = summary.balance.values[id] ? summary.balance.values[id] : 0;
  }

  return (
    <>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Participant</TableCell>
              <TableCell align="right">
                <IconButton onClick={handleOpenEditDepositsDialog}>
                  <EditIcon fontSize="small"/>
                </IconButton>
                <EditDepositsDialog
                  participants={participants}
                  initialValues={deposits}
                  open={openEditDepositsDialog}
                  onClose={handleCloseEditDepositsDialog}
                  onSave={handleSaveDeposits}
                />
                Deposit
              </TableCell>
              <TableCell align="right">Share</TableCell>
              <TableCell align="right">Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {participants.map((p) =>
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell align="right">{deposits[p.id]}</TableCell>
                <TableCell align="right">{breakdown[p.id]}</TableCell>
                <TableCell align="right">{balance[p.id]}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}