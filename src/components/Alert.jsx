import React, { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const DismissibleAlert = ({ severity, title, message }) => {
  const [open, setOpen] = React.useState(true);

  // Severity :
  // error
  // warning
  // info
  // success

  //onClose()
  // callback function whatever you wan to use it when it close

  // useEffect(() => {
  //   if (!open) {
  //     onClose();
  //   }
  // }, [open]);

  return (
    <Collapse in={open}>
      <Alert
        severity={severity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Collapse>
  );
};

export default DismissibleAlert;
