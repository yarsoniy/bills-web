'use client';

import {useEffect, useState} from "react";
import {api} from "@/app/api/api";
import styles from "@/app/groups/[groupId]/bills/[billId]/items/[itemId]/styles.module.css";
import {Button, TextField} from "@mui/material";
import BillItemShares from "@/app/groups/[groupId]/bills/[billId]/items/[itemId]/components/BillItemShares";
import SplitAgreement from "@/app/groups/[groupId]/bills/[billId]/items/[itemId]/components/SplitAgreement";

export default function BillItemPage({params}) {
  const [group, setGroup] = useState(null);
  const [bill, setBill] = useState(null);
  const [billItem, setBillItem] = useState(null);
  const [billItemTitle, setBillItemTitle] = useState(null);
  const [billItemCost, setBillItemCost] = useState(null);
  const [splitRules, setSplitRules] = useState([]);
  const [billItemUpdated, setBillItemUpdated] = useState(false);

  useEffect(() => {
    api.getGroup(params.groupId).then((data) => {
      setGroup(data);
    });
  }, [params.groupId]);
  useEffect(() => {
    api.getBill(params.billId).then((bill) => {
      setBill(bill);
    })
  }, [params.billId]);
  useEffect(() => {
    api.getBillItem(params.billId, params.itemId).then((billItem) => {
      setBillItem(billItem);
      setBillItemTitle(billItem.title);
      setBillItemCost(billItem.cost);
      setSplitRules(billItem.agreement.rules);
      setBillItemUpdated(false);
    })
  }, [params.billId, params.itemId, billItemUpdated]);

  const handleTitleChange = (e) => {
    setBillItemTitle(e.target.value);
  }
  const handleCostChange = (e) => {
    setBillItemCost(e.target.value);
  }
  const handleChangeSplitRules = (newSplitRules) => {
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
    setBillItemUpdated(true);
  }

  if (!group || !bill ||!billItem) {
    return <div className={styles.loader}>Loading...</div>
  }

  const shares = {};
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