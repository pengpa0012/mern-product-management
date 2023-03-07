import { AppBar, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategorySharpIcon from '@mui/icons-material/CategorySharp';
import Inventory2SharpIcon from '@mui/icons-material/Inventory2Sharp';
import AssessmentSharpIcon from '@mui/icons-material/AssessmentSharp';
import React from 'react'

export const Sidebar = () => {
  const drawerWidth = 240
  const drawerList = [
    {
      icon: <DashboardIcon className="text-white" />,
      title: "Dashboard"
    },
    {
      icon: <CategorySharpIcon className="text-white" />,
      title: "Products"
    },
    {
      icon: <Inventory2SharpIcon className="text-white" />,
      title: "Inventory"
    },
    {
      icon: <AssessmentSharpIcon className="text-white" />,
      title: "Reports"
    },
  ]
  return (
    <AppBar
      position="fixed"
      className="min-h-screen !left-0 justify-between p-4 mr-[300px]"
      sx={{
        width: 300,
      }}
    >
      <div className="flex items-center justify-between">
        <p>Logo</p>
        <Button variant="text" className="!text-white">Logout</Button>
      </div>
      <List>
        {drawerList.map((text, index) => (
          <ListItem key={text.title} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {text.icon}
              </ListItemIcon>
              <ListItemText primary={text.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <p className="text-center">Footer Here</p>
    </AppBar>
  )
}
