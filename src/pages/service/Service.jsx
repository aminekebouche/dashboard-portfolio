import "./service.scss";
import Tableau from "../../components/tableau/Tableau";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import app from "../../firebase-config";
import { useCallback, useEffect, useState } from "react";
import FormDialog from "../../components/FormDialog";
import AddIcon from "@mui/icons-material/Add";

const columns = [
  { id: "icone", label: "Icone", minWidth: 170, align: "center" },
  { id: "titre", label: "Titre", minWidth: 100 },
  {
    id: "description",
    label: "Description",
    minWidth: 170,
  },
  {
    id: "edit",
    label: "Edit - Suppr",
    minWidth: 170,
    align: "right",
  },
];

function createData(id, data) {
  return {
    id,
    icone: data.icone,
    titre: data.titre,
    description: data.description,
  };
}

const Service = () => {
  var db = getFirestore(app);
  const [rows, setRows] = useState([]);
  const [edeting, setEdeting] = useState(null);
  const getData = useCallback(async () => {
    try {
      const serviceColl = collection(db, "service");
      const querySnapshot = await getDocs(serviceColl);
      setRows([]);
      querySnapshot.forEach((doc) => {
        setRows((prev) => [...prev, createData(doc.id, doc.data())]);
        console.log(createData(doc.id, doc.data()));
      });
    } catch (error) {}
  }, [db]);

  function Edit(row) {
    setEdeting(row);
    setOpenDialog(true);
  }

  async function Delete(row) {
    try {
      await deleteDoc(doc(db, "service", row.id));
      handleServiceChange();
    } catch (error) {
      console.log(error.message);
    }
  }

  function RenderButton(props) {
    return (
      <>
        <EditIcon
          style={{ marginRight: "2rem" }}
          onClick={() => Edit(props.row)}
          className="btn"
        />
        <ClearIcon
          style={{ fontSize: "1.5rem" }}
          className="btn"
          onClick={() => Delete(props.row)}
        />
      </>
    );
  }

  const handleServiceChange = () => {
    setEdeting(null);
    getData();
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="service outlet">
      <div className="tab-container">
        <Tableau
          columns={columns}
          rows={rows}
          fun={RenderButton}
          height={{ h: 540 }}
        />
      </div>
      <div className="add-service">
        <AddIcon onClick={handleClickOpen} />
      </div>
      <FormDialog
        collections={edeting}
        onServiceChange={handleServiceChange}
        open={{ openDialog, setOpenDialog }}
        collectio={{ collectio: "service" }}
      />
    </div>
  );
};

export default Service;
