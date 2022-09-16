import * as React from 'react';

import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

export default function Snackbar(props) {
  const [state, setState] = React.useState({
    open: props.showSnackBar,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div>
       <Snackbar
       anchorOrigin={{ vertical: "top", horizontal: "center"  }}
        open={openSnack}
        autoHideDuration={500000}
        message="Sucessfully Cancel"
        onClose={handleToClose}

        // action={
        //   <React.Fragment>
        //     <IconButton
        //       size="small"
        //       aria-label="close"
        //       color="inherit"
        //       onClick={handleToClose}
        //     >
        //       <CloseIcon fontSize="small" />
        //     </IconButton>
        //   </React.Fragment>
        // }
      />
    </div>
  );
}