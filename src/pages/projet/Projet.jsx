import React, { useCallback, useState, useEffect } from "react";
import "./projet.scss";
import Tableau from "../../components/tableau/Tableau";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import app from "../../firebase-config";
import AddIcon from "@mui/icons-material/Add";
import FormDialogParm from "../../components/FormDialogParm";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";

function createData(id, data) {
  return { ...data, id };
}

function Ticket(props) {
  const { titre, num } = props.info;
  return (
    <div className="projet-ticket">
      <h1>{num}</h1>
      <p>{titre}</p>
    </div>
  );
}

const data = [
  { titre: "projets", num: "6" },
  { titre: "Java", num: "60%" },
  { titre: "Node Js", num: "40%" },
  { titre: "React Js", num: "36%" },
];

const Projet = () => {
  var db = getFirestore(app);

  async function Delete(row) {
    console.log(row);
    try {
      await deleteDoc(doc(db, "projets", row.id));
      getData();
    } catch (error) {
      console.log(error.message);
    }
  }

  function RenderButton(props) {
    const [open, setOpen] = useState();
    return (
      <>
        <MoreHorizIcon onClick={() => setOpen(!open)} />
        {open && (
          <div className="projet-modal">
            <div
              onClick={() => {
                setEdeting(props.row);
                setOpenDialog(true);
              }}
            >
              <EditIcon />
              <p>Modifer</p>
            </div>
            <div onClick={() => Delete(props.row)}>
              <ClearIcon />
              <p>Supprimer</p>
            </div>
          </div>
        )}
      </>
    );
  }

  const columns = [
    { id: "icone", label: "Icone", minWidth: 100, align: "center" },
    { id: "titre", label: "Titre", minWidth: 100 },
    {
      id: "description",
      label: "Description",
      minWidth: 100,
    },
    {
      id: "annee",
      label: "Année",
      minWidth: 100,
    },
    {
      id: "categorie",
      label: "Catégorie",
      minWidth: 100,
    },
    {
      id: "techno",
      label: "Technologie",
      minWidth: 100,
    },
    {
      id: "links",
      label: "Lien",
      minWidth: 100,
    },
    {
      id: "edit",
      label: Test(),
      minWidth: 100,
      align: "center",
    },
  ];

  const columnsSuite = [
    { id: "icone", label: "Icone" },
    { id: "titre", label: "Titre" },
    {
      id: "description",
      label: "Description",
    },
    {
      id: "annee",
      label: "Année",
    },
    {
      id: "categorie",
      label: "Catégorie",
    },
    {
      id: "demo",
      label: "Démo",
    },
    {
      id: "details",
      label: "Détails",
    },
    {
      id: "techno",
      label: "Technos",
    },

    {
      id: "github",
      label: "GitHub",
    },
  ];

  const [openDialog, setOpenDialog] = useState(false);
  const [rowss, setRowss] = useState([]);
  const [edeting, setEdeting] = useState();

  const getData = useCallback(async () => {
    try {
      const serviceColl = collection(db, "projets");
      const querySnapshot = await getDocs(serviceColl);
      setRowss([]);
      querySnapshot.forEach((doc) => {
        setRowss((prev) => [...prev, createData(doc.id, doc.data())]);
        console.log(doc.data());
      });
    } catch (error) {}
  }, [db]);

  function Test() {
    return (
      <AddIcon
        className="btn"
        style={{ color: "gray", fontSize: "30px" }}
        onClick={() => {
          setOpenDialog(!openDialog);
        }}
      />
    );
  }

  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <div className="projet outlet">
      <div className="tickets container">
        {data.map((item, index) => (
          <Ticket key={index} info={item} />
        ))}
      </div>
      <div className="tab-container">
        <Tableau
          columns={columns}
          rows={rowss}
          fun={RenderButton}
          height={{ h: 500 }}
        />
      </div>
      <FormDialogParm
        open={{ openDialog, setOpenDialog }}
        columns={columnsSuite}
        onChange={() => getData()}
        collections={edeting}
      />
    </div>
  );
};

export default Projet;
