
import styles from "./styles.module.css";
import {CircularProgress} from "@mui/material";
import {ReactNode} from "react";

export default function Loader(): ReactNode {
  return (
    <div className={styles.loader}>
      <CircularProgress/>
    </div>
  )
}
