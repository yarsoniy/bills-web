'use client';

import {useEffect, useState} from "react";
import {api} from "@/app/api/api";
import styles from "./styles.module.css";
import List from "@mui/material/List";
import {Button, ListItem, ListItemButton, ListItemText} from "@mui/material";
import AddBillItemDialog from "@/app/groups/[groupId]/bills/[billId]/components/AddBillItemDialog";
import BallanceDetailsTable from "@/app/groups/[groupId]/bills/[billId]/components/BillParticipantSummary";
import BillParticipantSummary from "@/app/groups/[groupId]/bills/[billId]/components/BillParticipantSummary";

export default function BillPage({params}) {
  const [group, setGroup] = useState(null);
  const [bill, setBill] = useState(null);
  const [billUpdated, setBillUpdated] = useState(false);
  const [openAddItemDialog, setOpenAddItemDialog] = useState(false);

  useEffect(() => {
    api.getGroup(params.groupId).then((data) => {
      setGroup(data);
    });
  }, []);
  useEffect(() => {
    api.getBill(params.billId).then((bill) => {
      setBill(bill);
      setBillUpdated(false);
    })
  }, [billUpdated]);

  const handleAddItemClick = () => {
    setOpenAddItemDialog(true);
  }
  const handleCloseAddItemDialog = () => {
    setOpenAddItemDialog(false);
  }
  const handleSaveAddItemDialog = async (title, cost) => {
    await api.createBillItem(bill.id, title, cost);
    setBillUpdated(true);
  }

  if (!bill || !group) {
    return <div className={styles.loader}>Loading...</div>
  }

  return (
    <>
      <p>Title: {bill.title}</p>
      <p>{bill.createdAt}</p>
      <p>Total cost: {bill.totalCost}</p>
      <BillParticipantSummary participants={group.participants} billId={bill.id} />
      <div className={styles.addBillItemBtnContainer}>
        <Button variant="contained" onClick={handleAddItemClick}>Add item</Button>
        <AddBillItemDialog
          open={openAddItemDialog}
          onClose={handleCloseAddItemDialog}
          onSave={handleSaveAddItemDialog}
        />
      </div>
      <List>
        {bill.items.map((billItem) =>
          <ListItemButton className={styles.billItemContainer} key={billItem.id} href="">
            <ListItem>
              <ListItemText primary={billItem.title} secondary={billItem.cost} />
            </ListItem>
          </ListItemButton>
        )}
      </List>
    </>
  )
}
