import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import app from "../firebase-config";
import {
  getFirestore,
  addDoc,
  collection,
  setDoc,
  doc,
} from "firebase/firestore";

export default function FormDialog(props) {
  const db = getFirestore(app);
  const [inputs, setInputs] = React.useState({
    ...props.collections,
  });
  const { collectio } = props.collectio;
  const { openDialog, setOpenDialog } = props.open;

  const handleChange = (event) => {
    setInputs((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const saveData = async () => {
    try {
      if (!inputs.id) {
        await addDoc(collection(db, collectio), inputs);
      } else {
        await setDoc(doc(db, collectio, inputs.id), inputs);
      }
      if (props.onServiceChange) {
        props.onServiceChange();
      }
      handleClose();
    } catch (error) {
      console.log(error.message);
    }
  };

  React.useEffect(() => {
    setInputs({ ...props.collections });
  }, [props.collections]);

  return (
    <div>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Modifier le service</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Icone"
            name="icone"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={inputs.icone}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            id="name"
            label="titre"
            name="titre"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={inputs.titre}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            id="name"
            label="Description"
            name="description"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={inputs.description}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveData}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
