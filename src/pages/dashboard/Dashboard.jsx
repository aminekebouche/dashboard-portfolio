import "./dashboard.scss";
import Ticket from "../../components/ticket/Ticket";
import {
  getFirestore,
  collection,
  getCountFromServer,
} from "firebase/firestore";
import app from "../../firebase-config";
import { useCallback, useEffect, useState } from "react";

const Dashboard = () => {
  var db = getFirestore(app);

  const [data, setData] = useState({
    services: 0,
    projets: 0,
    blogs: 0,
  });

  const getData = useCallback(async () => {
    try {
      const serviceColl = collection(db, "service");
      const projetColl = collection(db, "projets");
      const blogColl = collection(db, "blogs");

      const serviceSnap = await getCountFromServer(serviceColl);
      const projetSnap = await getCountFromServer(projetColl);
      const blogSnap = await getCountFromServer(blogColl);

      const getedData = {
        services: serviceSnap.data().count,
        projets: projetSnap.data().count,
        blogs: blogSnap.data().count,
      };
      console.log(getedData);

      setData(getedData);
    } catch (error) {
      console.log(error.message);
    }
  }, [db]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="dashboard outlet">
      <div className="tickets">
        <Ticket
          info={{
            title: "Services proposés",
            num: data.services,
            img: "/images/service.png",
          }}
        />

        <Ticket
          info={{
            title: "Projets réalisés",
            num: data.projets,
            img: "/images/service.png",
          }}
        />
        <Ticket
          info={{
            title: "Blogs publiés",
            num: data.blogs,
            img: "/images/service.png",
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
