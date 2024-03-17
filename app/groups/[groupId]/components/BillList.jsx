import {Button, ListItem, ListItemText} from "@mui/material";
import List from "@mui/material/List";
import SingleTextDialog from "@/app/components/SingleTextDialog";
import {api} from "@/app/api/api";
import {useEffect, useState} from "react";
import styles from "../styles.module.css"

export default function BillList({groupId}) {
  const [openNewBillDialog, setOpenNewBillDialog] = useState(false);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    api.getBills(groupId).then((data) => {
      setBills(data)
    });
  }, []);

  const handleNewBillClick = () => {
    setOpenNewBillDialog(true);
  }
  const handleCloseNewBillDialog = () => {
    setOpenNewBillDialog(false);
  }
  const handleSaveNewBill = async(title) => {
    await api.createBill(groupId, title);
  }

  return (
    <>
      <div className={styles.newBillBtnContainer}>
        <Button variant="contained" onClick={handleNewBillClick}>Create bill</Button>
        <SingleTextDialog
          title="New bill"
          inputLabel="Title"
          open={openNewBillDialog}
          onClose={handleCloseNewBillDialog}
          onSave={handleSaveNewBill}
        />
      </div>
      <List>
        {bills.map((bill) =>
          <ListItem id={bill.id}>
            <div className={styles.billListItem}>
              <ListItemText primary={bill.title} secondary={bill.createdAt} />
              <p>{bill.totalCost}</p>
            </div>
          </ListItem>
        )}
      </List>
    </>
  );
}
