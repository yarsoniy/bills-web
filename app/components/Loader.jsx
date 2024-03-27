
import styles from "./styles.module.css";
import {CircularProgress} from "@mui/material";

export default function Loader() {
  return (
    <div className={styles.loader}>
      <CircularProgress/>
    </div>
  )
}