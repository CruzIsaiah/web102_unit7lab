import React, { useState } from "react";
import { supabase } from "../client";

const CreatePost = () => {
  const [post, setPost] = useState({
    title: "",
    author: "",
    description: "",
    characterImage: "",
    intelligence: 0,
    perception: 0,
    agility: 0,
    charisma: 0,
    endurance: 0,
    luck: 0,
    strength: 0,
    fastShot: 0,
    heavyHanded: 0,
  });
  const totalPoints = 10; // Total points available to distribute
  const attributes = [
    "intelligence",
    "perception",
    "agility",
    "charisma",
    "endurance",
    "luck",
    "strength",
    "fastShot",
    "heavyHanded",
  ];

  const characterData = {
    Select: "",
    Mario: "mario.png",
    Luigi: "Lu.jpg",
    Peach: "peach.png",
    Bowser: "bowser.png",
    DK: "dk.png",
    Wario: "wario.jpg",
    WaLuigi: "waluigi.png",
    Fox: "fox.png",
    Ness: "ness.png",
    Lucas: "lucas.png",
    Falcon: "cap.png",
    // Add more character names and their corresponding image URLs here
  };

  const createPost = async (event) => {
    event.preventDefault();

    try {
      await supabase.from("Posts").insert(post).select();

      window.location = "/";
    } catch (error) {
      console.error("Error creating post:", error.message);
      // Handle error, e.g., display error message to the user
    }
  };

  const handleCharacterChange = (event) => {
    const characterName = event.target.value;
    setPost((prev) => ({
      ...prev,
      title: characterName,
      characterImage: characterData[characterName] || "", // Get the corresponding image URL based on the selected character name
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAttributeChange = (attribute, value) => {
    const remainingPoints =
      totalPoints -
      Object.values(post).reduce((acc, val) => acc + val, 0) +
      post[attribute] -
      value;
    if (value <= totalPoints && value >= 0) {
      setPost((prev) => ({
        ...prev,
        [attribute]: value,
      }));
    } else {
      alert(`Please allocate points between 0 and ${totalPoints}.`);
    }
    // eslint-disable-next-line
    console.log("Remaining points:", remainingPoints);
  };

  return (
    <div>
      <form>
        <label htmlFor="title">Character Model</label> <br />
        {post.characterImage && (
          <div>
            <img
              src={post.characterImage}
              alt="Character"
              style={{ width: "100px", height: "100px" }}
            />
          </div>
        )}
        <select id="title" name="title" onChange={handleCharacterChange}>
          <option value="">Select Character</option>
          {Object.keys(characterData).map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
        <br />
        <br />
        <label htmlFor="author">Character Name</label>
        <br />
        <input
          type="text"
          id="author"
          name="author"
          value={post.author}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="description">Character Description</label>
        <br />
        <textarea
          rows="5"
          cols="50"
          id="description"
          name="description"
          value={post.description}
          onChange={handleChange}
        ></textarea>
        <br />
        <br />
        <label>Allocate Points (Total: {totalPoints})</label>
        <br />
        {attributes.map((attr, index) => (
          <div key={index}>
            <label htmlFor={attr}>{attr}</label>
            <input
              type="number"
              id={attr}
              name={attr}
              value={post[attr]}
              min="0"
              max={totalPoints}
              onChange={(e) =>
                handleAttributeChange(attr, parseInt(e.target.value))
              }
            />
          </div>
        ))}
        <br />
        <input type="submit" value="Submit" onClick={createPost} />
      </form>
    </div>
  );
};

export default CreatePost;
