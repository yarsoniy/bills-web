'use client';

import {useContext, useState} from "react";
import {api} from "@/app/api/api";
import styles from "./styles.module.css";
import List from "@mui/material/List";
import {Button, ListItem, ListItemButton, ListItemText} from "@mui/material";
import AddBillItemDialog from "@/app/groups/[groupId]/bills/[billId]/components/AddBillItemDialog";
import BillParticipantSummary from "@/app/groups/[groupId]/bills/[billId]/components/BillParticipantSummary";
import {GroupContext} from "@/app/groups/[groupId]/GroupProvider";
import {BillContext} from "@/app/groups/[groupId]/bills/[billId]/BillProvider";
import {useRouter} from "next/navigation";

export default function BillPage() {
  const router = useRouter();
  const [group] = useContext(GroupContext);
  const [bill, refreshBill] = useContext(BillContext);
  const [openAddItemDialog, setOpenAddItemDialog] = useState(false);

  const handleAddItemClick = () => {
    setOpenAddItemDialog(true);
  }
  const handleCloseAddItemDialog = () => {
    setOpenAddItemDialog(false);
  }
  const handleSaveAddItemDialog = async (title: string, cost: number) => {
    await api.createBillItem(bill.id, title, cost);
    refreshBill();
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
          <ListItemButton
            className={styles.billItemContainer}
            key={billItem.id}
            onClick={() => router.push("/groups/"+group.id+"/bills/"+bill.id+"/items/"+billItem.id)}
          >
            <ListItem>
              <ListItemText primary={billItem.title} secondary={billItem.cost} />
            </ListItem>
          </ListItemButton>
        )}
      </List>
    </>
  )
}
