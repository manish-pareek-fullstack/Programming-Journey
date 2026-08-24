import React from "react";
import "./Goal.css";
const Goal = ({ obj }) => {
  return (
    <section className="goal">
      <div className="goal-container">
        <h1>My Goal</h1>
        {obj.My_Goal.goaldeateil.map((x, index) => (
          <p key={index}>{x}</p>
        ))}
      </div>
    </section>
  );
};

export default Goal;
