import { Box, Button, IconButton, MenuItem, Modal, Select, TextField } from '@mui/material';
import React from 'react'
import Textarea from '@mui/joy/Textarea';

export const CreateProduct = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen} className="!mb-8" variant="contained">Add Product</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="grid place-items-center overflow-y-scroll py-6"
      >
        <Box className="bg-white rounded-md p-6 flex flex-col gap-3">
          <img src="https://via.placeholder.com/300x300" className="w-full rounded-md" />
          <Button variant="contained" component="label">
            Upload
            <input hidden accept="image/*" multiple type="file" />
          </Button>
          <div className="flex gap-3">
            <TextField required label="Name" />
            <TextField required type="number" label="Price" />
          </div>
          <Select
            defaultValue={1}
            placeholder="Type"
            className="w-full"
          >
            <MenuItem value={1}>Type 1</MenuItem>
            <MenuItem value={2}>Type 2</MenuItem>
            <MenuItem value={2}>Type 3</MenuItem>
          </Select>
          <Textarea placeholder="Description" minRows={3} />
          <div className="flex gap-3">
            <Button onClick={handleClose} className="w-full">Cancel</Button>
            <Button variant="contained" color="primary" className="w-full">Confirm</Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
