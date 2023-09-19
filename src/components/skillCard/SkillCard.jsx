import React, { useState, useCallback, useEffect } from "react";
import "./skillCard.scss";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FormDialog from "../../components/FormDialog";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import {
  getFirestore,
  deleteDoc,
  doc,
  collection,
  getDocs,
} from "firebase/firestore";
import app from "../../firebase-config";

const styleIcon = { color: "gray", cursor: "pointer" };

function Item(props) {
  const { id, icone, titre, description } = props.skill;
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const db = getFirestore(app);

  async function Delete() {
    try {
      await deleteDoc(doc(db, props.col, id));
      props.onChange();
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="elem">
      <img src={icone} alt="icone" />
      <div className="info">
        <h2>{titre}</h2>
        <p>{description}</p>
      </div>
      <MoreHorizIcon className="MoreHorizIcon" onClick={() => setOpen(!open)} />
      {open && (
        <div className="elem-modal">
          <div
            onClick={() => {
              setOpenDialog(!openDialog);
              setOpen(!open);
            }}
          >
            <EditIcon />
            <p>Modifer</p>
          </div>
          <div onClick={() => Delete()}>
            <ClearIcon />
            <p>Supprimer</p>
          </div>
        </div>
      )}

      <FormDialog
        open={{ openDialog, setOpenDialog }}
        collectio={{ collectio: props.col }}
        collections={props.skill}
        onServiceChange={props.onChange}
      />
    </div>
  );
}

const SkillCard = (props) => {
  var db = getFirestore(app);

  const { title } = props.title;
  const [openDialog, setOpenDialog] = useState(false);
  const [coll, setColl] = useState([]);
  const { setCounts } = props.count;

  function createData(id, data) {
    return {
      id,
      icone: data.icone,
      titre: data.titre,
      description: data.description,
    };
  }

  const getData = useCallback(async () => {
    try {
      const querySnapDomain = await getDocs(collection(db, title));

      setColl([]);
      let counter = 0;
      querySnapDomain.forEach((doc) => {
        setColl((prev) => [...prev, createData(doc.id, doc.data())]);
        counter++;
      });
      setCounts((prev) => {
        return { ...prev, [title]: counter };
      });

      console.log("de" + counter);
    } catch (error) {
      console.log(error.message);
    }
  }, [db, title, setCounts]);

  const handleServiceChange = () => {
    getData();
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="item">
      <div className="head">
        <h1>{title}</h1>
        <AddIcon style={styleIcon} onClick={() => setOpenDialog(!openDialog)} />
      </div>
      <div className="elems">
        {coll.map((skill, key) => (
          <Item
            skill={skill}
            key={key}
            col={title}
            onChange={handleServiceChange}
          />
        ))}
      </div>
      <FormDialog
        open={{ openDialog, setOpenDialog }}
        collectio={{ collectio: title }}
        onServiceChange={handleServiceChange}
        collections={{}}
      />
    </div>
  );
};

export default SkillCard;
