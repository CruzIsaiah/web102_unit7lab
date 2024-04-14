import React, { useState } from "react";
import "./Card.css";
import more from "./more.png";
import { Link } from "react-router-dom";
import { supabase } from "../client"; // Import the Supabase client

const Card = (props) => {
  const [count, setCount] = useState(0);

  const updateCount = async () => {
    try {
      // Update bet count in the database
      await supabase
        .from("Posts")
        .update({ betCount: count + 1 })
        .eq("id", props.id);

      // Update the bet count in the UI
      setCount((count) => count + 1);
    } catch (error) {
      console.error("Error updating bet count:", error.message);
      // Handle error, e.g., display error message to the user
    }
  };

  return (
    <div className="Card">
      <Link to={"edit/" + props.id}>
        <img className="moreButton" alt="edit button" src={more} />
      </Link>
      <h2 className="title">{props.title}</h2>
      <h3 className="author">{"by " + props.author}</h3>
      <img
        className="characterImage"
        src={props.characterImage}
        alt="Character"
      />
      <p className="description">{props.description}</p>
      <button className="betButton" onClick={updateCount}>
        👍 Bet Count: {count}
      </button>
    </div>
  );
};

export default Card;
