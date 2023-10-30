import React, { useEffect, useState } from "react";

function Home() {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [priority, setPriority] = useState("");
  let [id, setId] = useState("");
  let [todos, setTodos] = useState([]);

  useEffect(() => {
    FetchTodos();
  }, []);

  const FetchTodos = () => {
    fetch("http://localhost:3000/todo/")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data.data.reverse());
        setId("");
        setTitle("");
        setDescription("");
        setPriority("");
      });
  };

  const EditHandler = (todoid) => {
    fetch(`http://localhost:3000/todo/${todoid}`)
      .then((response) => response.json())
      .then((data) => {
        setId(data.data._id);
        setTitle(data.data.title);
        setDescription(data.data.description);
        setPriority(data.data.priority);
      });
  };

  const DeleteHandler = (todoid) => {
    fetch(`http://localhost:3000/todo/${todoid}`, {
      method: "DELETE",
    })
      .then((res) => {
        FetchTodos();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!id) {
      fetch("http://localhost:3000/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          description: description,
          priority: priority,
        }),
      })
        .then((res) => {
          FetchTodos();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetch(`http://localhost:3000/todo/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          description: description,
          priority: priority,
        }),
      })
        .then((res) => {
          FetchTodos();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <h2>Todos Form</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Priority:</label>
          <input
            type="number"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          />
        </div>
        <button type="submit">{id === "" ? "Submit" : "Save"}</button>
      </form>
      <div>
        {todos.map((t) => (
          <div key={t._id}>
            <h1>{t.title}</h1>
            <p>
              {t.description} | Priority: {t.priority} |
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  EditHandler(t._id);
                }}
              >
                Edit
              </a>
              |
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  DeleteHandler(t._id);
                }}
              >
                Delete
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
