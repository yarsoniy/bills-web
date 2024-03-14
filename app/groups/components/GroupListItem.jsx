import { Chip, Divider, Paper, Stack } from "@mui/material";
import styles from "../styles.module.css"

export default function GroupListItem({group}) {
  return (
    <Paper className={styles.groupListItem}>
      <div className={styles.details}>
        <h3>{group.title}</h3>
        <div className={styles.createdAt}>{group.createdAt}</div>
      </div>
      <Divider></Divider>
      <div className={styles.participants}>
        {!group.participants.length ? "No participants" : ""}
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
          {group.participants.map((p) => {
            return <Chip key={p.id} label={p.title}></Chip>
          })}
        </Stack>
      </div>
    </Paper>
  )
}