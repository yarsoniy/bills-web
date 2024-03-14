'use client'

import { Container, Fab, Paper } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import GroupListItem from "./components/GroupListItem"
import FavoriteIcon from '@mui/icons-material/Favorite';
import styles from "./styles.module.css"
import { useState } from "react";

export default function GroupsPage() {
  const [data, setData] = useState([
    {
      id: '1',
      title: "Party",
      createdAt: '2023-03-22 13:45:18',
      participants: [
        {id: 11, title: "John"},
        {id: 12, title: "Hanna"},
        {id: 13, title: "Bill"},
        {id: 14, title: "Kate"},
      ]
    },
    {
      id: '2',
      title: "Party 2",
      createdAt: '2023-03-22 13:45:18',
      participants: [
        {id: 11, title: "John"},
        {id: 12, title: "Hanna"},
        {id: 13, title: "Bill"},
        {id: 14, title: "Kate"},
      ]
    }
  ]);

  const groupItems = data.map((group) => {
    console.log(group)
    return (
      <Grid xs={12}>
        <GroupListItem key={group.id} group={group}></GroupListItem>
      </Grid>
    )
  })

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          {groupItems}
        </Grid>
        <Fab className={styles.fab} size="large" color="primary" aria-label="add">
          <FavoriteIcon />
        </Fab>
      </Container>
    </>
  )
}