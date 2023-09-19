import React from "react";
import "./ticket.scss";

const Ticket = (props) => {
  const info = props.info;
  return (
    <div className="ticket">
      <div>
        <h2>{info.title}</h2>
        <h1>{info.num}</h1>
      </div>
      <img src={info.img} alt="icon" />
    </div>
  );
};

export default Ticket;
