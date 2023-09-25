import React, { useState, useRef } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const locations = [
  { label: '21250 Stevens Creek Boulevard, Cupertino, CA, USA' },
  { label: '21250 Hawthorne Boulevard, Torrance, CA, USA' },
  { label: '17 Mile Drive, Pebble Beach, CA, USA' },
  { label: '3131 Boulevard Cote Vertu Ouest, Saint-Laurent, QC, Canada' },
  { label: '11011 Russian Road, Gulf Shores, AL, USA' },
  { label: 'DLF Cyber City Road, 236-D, Bhubaneswar, Odisha, India, 751001' },
  { label: 'Santoshi Vihar Lane A7, 296-2980, Bhubaneswar, Odisha, India, 751006' },
];

export default function AddressForm() {
  const [selectedAddress, setSelectedAddress] = useState('');
  const [plotNo, setPlotNo] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [streetName, setStreetName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [open, setOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [, setJsonData] = useState(null);

  const autocompleteRef = useRef(null);

  const resetFields = () => {
    setSelectedAddress('');
    setPlotNo('');
    setZipcode('');
    setStreetName('');
    setCity('');
    setState('');
    setCountry('');
    if (autocompleteRef.current) {
      autocompleteRef.current.querySelector('input').value = '';
    }
  };

  const handlePlotNoChange = (event) => {
    const value = event.target.value;
    if (/^[a-zA-Z0-9][a-zA-Z0-9- ]*$/.test(value) || value === '') {
      setPlotNo(value);
    }
  };

  const handleZipcodeChange = (event) => {
    const value = event.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setZipcode(value);
    }
  };

  const handleAddressSelect = (event, value) => {
    setSelectedAddress(value);
    setStreetName('');
    setPlotNo('');
    setCity('');
    setState('');
    setCountry('');
    setZipcode('');
    autofillFields(value);
    autofillFields(value);
  };

  const autofillFields = (value) => {
    if (typeof value === 'object' && value !== null && value.label) {
      const addressPattern = /^(\d+\s[A-Za-z\s-]+,\s[A-Za-z\s-]+,\s[A-Za-z\s-]+,\s[A-Za-z\s-]+)$/;

      const match = value.label.match(addressPattern);

      if (match) {
        const matchComponents = value.label.split(',').map((component) => component.trim());

        setStreetName(matchComponents[0]);
        setCity(matchComponents[1]);
        setState(matchComponents[2]);
        setCountry(matchComponents[3]);
      }
      const addressComponents = value.label.split(',').map((component) => component.trim());
      if (addressComponents.length >= 6) {
        setStreetName(addressComponents[0]);
        setPlotNo(addressComponents[1]);
        setCity(addressComponents[2]);
        setState(addressComponents[3]);
        setCountry(addressComponents[4]);
        setZipcode(addressComponents[5]);
      }
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (streetName && city && state && country) {
      handleClickOpen();
      const jsonData = {
        selectedAddress,
        plotNo,
        zipcode,
        streetName,
        city,
        state,
        country,
      };
      setJsonData(jsonData);
      console.log(jsonData);
    } else {
      setErrorDialogOpen(true);
    }
  };

  const handleConfirmClick = () => {
    setSuccessAlertOpen(true);
    handleClose();
  };

  const handleEditClick = () => {
    handleClose();
  };

  const handleErrorDialogClose = () => {
    setErrorDialogOpen(false);
  };

  const handleSuccessAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccessAlertOpen(false);
  };

  const handleResetClick = () => {
    resetFields();
    setJsonData(null); // Clear the JSON data
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ fontWeight: 'lighter', fontFamily: 'sans-serif', fontSize: '300%', marginTop: '20px' }}>
        Address Form
      </div>
      <div style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginBottom: '20px', marginTop: '50px' }}>
        <Autocomplete
          ref={autocompleteRef}
          disablePortal
          id="combo-box-demo"
          options={locations}
          sx={{ width: '80%' }}
          onChange={handleAddressSelect}
          value={selectedAddress}
          renderInput={(params) => <TextField {...params} label="Address" required />}
        />
      </div>
      <div style={{ width: '40%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <TextField label="Street Name" variant="outlined" sx={{ flex: 1, marginRight: '10px' }} value={streetName} required />
          <TextField
            label="Plot no."
            variant="outlined"
            sx={{ flex: 1, marginLeft: '10px' }}
            value={plotNo}
            onChange={handlePlotNoChange}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <TextField label="City" variant="outlined" sx={{ flex: 1, marginRight: '10px' }} value={city} required />
          <TextField label="State" variant="outlined" sx={{ flex: 1, marginLeft: '10px' }} value={state} required />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <TextField label="Country" variant="outlined" sx={{ flex: 1, marginRight: '10px' }} value={country} required />
          <TextField
            label="Zipcode"
            variant="outlined"
            sx={{ flex: 1, marginLeft: '10px' }}
            value={zipcode}
            onChange={handleZipcodeChange}
          />
        </div>
        <Stack spacing={2} direction="row" sx={{ marginTop: '15px' }}>
          <Button variant="contained" onClick={handleSubmit}>
            SUBMIT
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Are you sure this is the address?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Please review and confirm the entered address details. You can edit them if needed.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditClick}>EDIT</Button>
              <Button onClick={handleConfirmClick}>
                CONFIRM
              </Button>
            </DialogActions>
          </Dialog>
          <Button variant="outlined" onClick={handleResetClick}>
            RESET
          </Button>
        </Stack>
      </div>
      <Dialog
        open={errorDialogOpen}
        onClose={handleErrorDialogClose}
        aria-labelledby="error-dialog-title"
        aria-describedby="error-dialog-description"
      >
        <DialogTitle id="error-dialog-title">{"Error"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="error-dialog-description">
            Please fill in all the required fields.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleErrorDialogClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={successAlertOpen} autoHideDuration={6000} onClose={handleSuccessAlertClose}>
        <MuiAlert onClose={handleSuccessAlertClose} severity="success" sx={{ width: '100%' }}>
          Address Validated!
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
