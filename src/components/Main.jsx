import React, { useEffect, useState } from "react";
import "./Main.css";
import axios from "axios";

function Main() {
  const [addNote, setAddNote] = useState("");
  let [contents, setContents] = useState([]);
  const loadData = async () => {
    await axios
      .get("http://localhost:3000/api/v1/blogs")
      .then((res) => {
        setContents(res.data.blogs);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData();
  }, []);
  const handleAdd = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/blogs", {
        content: addNote,
      });
      const newNote = response.data;
      setContents([...contents, newNote]);
      setAddNote("");
      loadData();
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/blogs/${id}`);
      loadData();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="main-section">
      <div className="container">
        <h1>Title</h1>
        <textarea
          name=""
          id=""
          cols="46"
          rows="5"
          onChange={(e) => setAddNote(e.target.value)}
        ></textarea>
        <button onClick={handleAdd}>
          <i className="fa-sharp fa-solid fa-plus"></i>
        </button>
      </div>
      <div className="note-element">
        {contents?.map((item) => (
          <div className="element" key={item.blogId}>
            <h1>{item.content}</h1>
            <button onClick={() => handleDelete(item.blogId)}>
              <i className="fa-sharp fa-solid fa-trash"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
