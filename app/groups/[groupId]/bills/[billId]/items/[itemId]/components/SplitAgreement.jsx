import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Card,
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import ParticipantMultiSelect from "@/app/groups/[groupId]/bills/[billId]/items/[itemId]/components/ParticipantMultiSelect";
import styles from "../styles.module.css";

export default function SplitAgreement({participants, splitRules, onChange}) {
  const handleAddSplitRule = () => {
    const newSplitRules = [...splitRules, {
      itemPayers: [],
      itemUsers: [],
    }];
    onChange(newSplitRules);
  }
  const handleRemoveSplitRule = (ruleIndex) => {
    const newSplitRules = splitRules.slice();
    newSplitRules.splice(ruleIndex, 1);
    onChange(newSplitRules);
  }
  const handlePayerSelect = (ruleIndex, selectedValues) => {
    const newSplitRules = splitRules.slice();
    newSplitRules[ruleIndex].itemPayers = selectedValues;
    onChange(newSplitRules);
  }
  const handleUserSelect = (ruleIndex, selectedValues) => {
    const newSplitRules = splitRules.slice();
    newSplitRules[ruleIndex].itemUsers = selectedValues;
    onChange(newSplitRules);
  }

  return (
    <Card className={styles.splitAgreementContainer}>
      <div>Split agreement</div>
      <TableContainer>
        <Table className={styles.splitArgeementTable}>
          <TableBody>
            {splitRules.map((rule, idx) =>
              <TableRow key={idx}>
                <TableCell className={styles.splitArgeementCellRemove}>
                  <IconButton onClick={() => handleRemoveSplitRule(idx)}>
                    <ClearIcon/>
                  </IconButton>
                </TableCell>
                <TableCell align="center" className={styles.splitArgeementCellSelect}>
                  <ParticipantMultiSelect
                    label="Who pays"
                    participants={participants}
                    selected={rule.itemPayers}
                    onSelect={(selected) => {handlePayerSelect(idx, selected)}}
                  />
                </TableCell>
                <TableCell align="center" className={styles.splitArgeementCellSelect}>
                  <ParticipantMultiSelect
                    label="For whom"
                    participants={participants}
                    selected={rule.itemUsers}
                    onSelect={(selected) => {handleUserSelect(idx, selected)}}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.addSplitRuleBtnContainer}>
        <Button onClick={handleAddSplitRule}>Add split rule</Button>
      </div>
    </Card>
  )
}