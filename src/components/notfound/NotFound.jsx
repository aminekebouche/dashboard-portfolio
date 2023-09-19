import React from "react";
import "./notFound.scss";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-container outlet">
      <div className="not-found-text">
        <h1>404</h1>
        <p>Oops! Page non trouvée.</p>
      </div>
      <Link to="/">
        <button className="back-home">Retour à l'accueil</button>
      </Link>
    </div>
  );
};

export default NotFound;
