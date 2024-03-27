import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card} from "@mui/material";
import styles from '../styles.module.css'

export default function BillItemShares({participants, shares}) {
  return (
    <Card className={styles.costBreakdownContainer}>
      <div>Cost breakdown</div>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Participant</TableCell>
              <TableCell align="right">Share</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {participants.map((p) =>
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell align="right">{shares[p.id]}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}