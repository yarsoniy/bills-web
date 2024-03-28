'use client';

import {ChangeEvent, useContext, useEffect, useState} from "react";
import {api} from "@/app/api/api";
import styles from "@/app/groups/[groupId]/bills/[billId]/items/[itemId]/styles.module.css";
import {Button, TextField} from "@mui/material";
import BillItemShares from "@/app/groups/[groupId]/bills/[billId]/items/[itemId]/components/BillItemShares";
import SplitAgreement from "@/app/groups/[groupId]/bills/[billId]/items/[itemId]/components/SplitAgreement";
import {GroupContext} from "@/app/groups/[groupId]/GroupProvider";
import {BillItemContext} from "@/app/groups/[groupId]/bills/[billId]/items/[itemId]/BillItemProvider";
import {SplitRule} from "@/app/api/types/billItem";
import {MoneyBreakdown} from "@/app/api/types/bill";

export default function BillItemPage({params}: {
  params: {
    billId: string,
    itemId: string
  }
}) {
  const [group] = useContext(GroupContext);
  const [billItem, refreshBillItem] = useContext(BillItemContext);

  const [billItemTitle, setBillItemTitle] = useState('');
  const [billItemCost, setBillItemCost] = useState('');
  const [splitRules, setSplitRules] = useState<SplitRule[]>([]);

  useEffect(() => {
    if (!billItem) {
      return;
    }
    setBillItemTitle(billItem.title);
    setBillItemCost(String(billItem.cost));
    setSplitRules(billItem.agreement.rules);
  }, [billItem]);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBillItemTitle(e.target.value);
  }
  const handleCostChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBillItemCost(e.target.value);
  }
  const handleChangeSplitRules = (newSplitRules: SplitRule[]) => {
    setSplitRules(newSplitRules);
  }

  const handleSaveClick = async() => {
    await api.putBillItem(
      params.billId,
      params.itemId,
      billItemTitle,
      Number.parseFloat(billItemCost),
      {rules: splitRules}
    );
    refreshBillItem();
  }

  const shares: MoneyBreakdown = {};
  group.participants.map((p) => {
    shares[p.id] = billItem.costBreakdown.values[p.id];
  })

  return (
    <>
      <div className={styles.headerContainer}>
        <div>
          <TextField className={styles.textField} label="Title" value={billItemTitle} onChange={handleTitleChange}/>
          <TextField className={styles.textField} label="Cost" value={billItemCost} onChange={handleCostChange}/>
        </div>
        <div className={styles.saveBtnContainer}>
          <Button variant="outlined" onClick={handleSaveClick}>Save</Button>
        </div>
      </div>
      <BillItemShares participants={group.participants} shares={shares}/>
      <SplitAgreement
        participants={group.participants}
        splitRules={splitRules}
        onChange={handleChangeSplitRules}
      />
    </>
  )
}