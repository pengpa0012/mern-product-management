import React from 'react'
import { Card, Paper, TextField } from '@mui/material'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen grid place-items-center">
      <Paper className="px-8 py-12" elevation={3}>
        <Grid container direction="column" alignContent="center" spacing={2}>
          <h1 className="text-center text-2xl pt-4">Product Management</h1>
          <Grid item>
            <TextField id="outlined-basic" label="Username" variant="outlined" style={{ width: 300 }} />
          </Grid>
          <Grid item>
            <TextField id="outlined-basic" label="Password" variant="outlined" style={{ width: 300 }} />
          </Grid>
          <Grid item className="flex justify-center">
            <Button className="flex-1" onClick={() => navigate("/register")}>Register</Button>
            <Button variant="contained" color="success" className="!mr-2 flex-1">Login</Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}
