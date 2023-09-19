import "./skill.scss";
import Ticket from "../../components/ticket/Ticket";
import SkillCard from "../../components/skillCard/SkillCard";
import { useState } from "react";

const Skill = () => {
  const [counts, setCounts] = useState({
    domains: 0,
    dev: 0,
    devops: 0,
  });
  return (
    <div className="skill outlet">
      <div className="tickets">
        <Ticket
          info={{
            title: "Domaine",
            num: counts.domains,
            img: "/images/service.png",
          }}
        />

        <Ticket
          info={{
            title: "Developpement",
            num: counts.dev,
            img: "/images/service.png",
          }}
        />
        <Ticket
          info={{
            title: "Devops",
            num: counts.devops,
            img: "/images/service.png",
          }}
        />
      </div>
      <div className="container">
        <SkillCard title={{ title: "domains" }} count={{ setCounts }} />
        <SkillCard title={{ title: "dev" }} count={{ setCounts }} />
        <SkillCard title={{ title: "devops" }} count={{ setCounts }} />
      </div>
    </div>
  );
};

export default Skill;
