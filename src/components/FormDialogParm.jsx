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

export default function FormDialogParm(props) {
  const db = getFirestore(app);
  const { openDialog, setOpenDialog } = props.open;
  const columns = props.columns;
  const [inputs, setInputs] = React.useState({
    ...props.collections,
  });

  const handleChange = (event) => {
    setInputs((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  function transform(input) {
    const techno = input.techno.split(" ");
    const links = { demo: input.demo, github: input.github };
    const details = input.details.split(" ");
    const resutl = { ...input, techno, links, details };
    delete resutl.demo;
    delete resutl.github;
    return resutl;
  }

  const saveData = async () => {
    console.log(props.collections);
    console.log(inputs);
    try {
      console.log(transform(inputs));
      if (!inputs.id) {
        console.log("add");

        await addDoc(collection(db, "projets"), transform(inputs));
      } else {
        console.log("edit");

        await setDoc(doc(db, "projets", inputs.id), transform(inputs));
      }
      props.onChange();
      setOpenDialog(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Modifier le service</DialogTitle>
        <DialogContent>
          {columns.map((col, i) => (
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={col.label}
              name={col.id}
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
              value={inputs[col.id]}
              InputLabelProps={{ shrink: true }}
              key={i}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={saveData}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
