import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, Typography } from '@mui/material';

const DialogModal = ({ message = "Are you sure you want to proceed?", open, onClose, onYes }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          No
        </Button>
        <Button onClick={onYes} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogModal;
