import { Chip, Divider, Paper, Stack } from "@mui/material";
import styles from "../styles.module.css"
import Link from "next/link";

export default function GroupListItem({group}) {
  return (
    <Paper>
      <div className={styles.details}>
        <h3>
          <Link href={"/groups/" + group.id}>{group.title}</Link>
        </h3>
        <div className={styles.createdAt}>{group.createdAt}</div>
      </div>
      <Divider></Divider>
      <div className={styles.participants}>
        {!group.participants.length ? "No participants" : ""}
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
          {group.participants.map((p) => <Chip key={p.id} label={p.name}></Chip>)}
        </Stack>
      </div>
    </Paper>
  )
}