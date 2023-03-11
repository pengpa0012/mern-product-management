import React, { useEffect, useState } from 'react'
import { Card, Paper, TextField } from '@mui/material'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Notiflix from 'notiflix'

export const Login = () => {
  const navigate = useNavigate()
  const [profile, setProfile] = useState({
    username: "",
    password: ""
  })
  const username = localStorage.getItem("username")
  
  useEffect(() => {
   if(username) {
    navigate("/")
   }
  }, [])

  const onLogin = () => {
    const { username, password } = profile
    if(!username || !password) return 
    axios.post(`${import.meta.env.VITE_ENDPOINT}login`, {
      username,
      password
    })
    .then(response => {
      Notiflix.Notify.success(response.data.message)
      localStorage.setItem("token", response.data.accessToken)
      localStorage.setItem("username", response.data.username)
      navigate("/")
    })
    .catch((err) => Notiflix.Notify.failure(err.response.data.message))
  }

  return (
    <div className="min-h-screen grid place-items-center">
      <Paper className="px-8 py-12" elevation={3}>
        <Grid container direction="column" alignContent="center" spacing={2}>
          <h1 className="text-center text-2xl pt-4">Product Management</h1>
          <Grid item>
            <TextField id="outlined-basic" label="Username" variant="outlined" style={{ width: 300 }} onChange={(e) => setProfile({...profile, username: e.target.value})} />
          </Grid>
          <Grid item>
            <TextField id="outlined-basic" type="password" label="Password" variant="outlined" style={{ width: 300 }} onChange={(e) => setProfile({...profile, password: e.target.value})} />
          </Grid>
          <Grid item className="flex justify-center">
            <Button className="flex-1" onClick={() => navigate("/register")}>Register</Button>
            <Button variant="contained" color="success" className="!mr-2 flex-1" onClick={onLogin}>Login</Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}
