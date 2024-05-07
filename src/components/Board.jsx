import { useEffect, useState } from "react";
import TaksList from "./TaksList";
import logo from "../assets/Logo.svg";
import pencil from "../assets/Edit_duotone.svg";
import TaskDetail from "./TaskDetail";
import addIcon from "../assets/Add_round_duotone.svg";
import { useParams } from "react-router-dom";

const Board = () => {
  const { board_id } = useParams();

  const defaultTasks = [
    {
      title: "Task in Progress",
      description: "",
      icon: "⏰",
      status: "p",
      id: 1,
    },
    {
      title: "Task Compleated",
      description: "",
      icon: "💪",
      status: "c",
      id: 2,
    },
    {
      title: "Task Won't Do",
      description: "",
      icon: "☕",
      status: "w",
      id: 3,
    },
    {
      title: "Task To Do",
      description: "Work on a Challenge on devChallenges.io, learn TypeScript.",
      icon: "📚",
      status: "t",
      id: 4,
    },
  ];

  const [tasks, setTasks] = useState(() => {
    const savedTask = localStorage.getItem(`tasks-${board_id}`);
    return savedTask ? JSON.parse(savedTask) : defaultTasks;
  });

  const [title, setTitles] = useState(() => {
    const savedTitle = localStorage.getItem(`title-${board_id}`);
    return savedTitle ? savedTitle : "My Task Board";
  });

  const [subtitle, setSubtitle] = useState(() => {
    const savedSubtitle = localStorage.getItem(`subtitle-${board_id}`);
    return savedSubtitle ? savedSubtitle : "Task to keep organised";
  });

  const [showDetail, setShowDetail] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [showTitlesForm, setShowTitlesForm] = useState(false);
  const [showSubTitlesForm, setShowSubTitlesForm] = useState(false);

  const [form, setForm] = useState({
    title: "To do",
    description: "",
    icon: "💻",
    status: "t",
  });

  const handleChange = (e) => {
    const { name, value, type, id } = e.target;

    if (type === "radio") {
      setForm((prev) => ({ ...prev, [name]: id }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addNewTask = () => {
    if (editingTaskId !== null) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingTaskId ? { ...task, ...form } : task
      );
      setTasks(updatedTasks);
      setEditingTaskId(null);
    } else {
      const newTask = {
        title: form.title,
        description: form.description,
        icon: form.icon,
        status: form.status,
        id: new Date().getTime() + "task" + tasks.length,
      };
      setTasks([...tasks, newTask]);
    }
    setForm({ title: "To do", description: "", icon: "💻", status: "t" });
    setShowDetail(false);
  };

  const editTask = (id) => {
    setEditingTaskId(id);
    const toEdit = tasks.find((t) => t.id === id);
    setForm(toEdit);
    setShowDetail(true);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id != id));
    setShowDetail(false);
  };

  const handleChangeT = (e) => {
    const { value } = e.target;

    if (showTitlesForm) {
      setTitles(value);
    } else if (showSubTitlesForm) {
      setSubtitle(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (showTitlesForm) {
      setTitles(title);
      setShowTitlesForm(false);
    } else if (showSubTitlesForm) {
      setSubtitle(subtitle);
      setShowSubTitlesForm(false);
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem("id", board_id);

      if (board_id && localStorage.getItem(`tasks-${board_id}`)) {
        const savedTasks = localStorage.getItem(`tasks-${board_id}`);
        const savedTitle = localStorage.getItem(`title-${board_id}`);
        const savedSubtitle = localStorage.getItem(`subtitle-${board_id}`);

        setTasks(savedTasks ? JSON.parse(savedTasks) : defaultTasks);
        setTitles(savedTitle ? savedTitle : "My Task Board");
        setSubtitle(savedSubtitle ? savedSubtitle : "Task to keep organised");
      } else {
        setTasks(defaultTasks);
        setTitles("My Task Board");
        setSubtitle("Task to keep organised");
      }
    } catch (error) {
      console.error("Error al recuperar la informacion:", error);
    }
  }, [board_id]);

  return (
    <>
      <div className={`container ${showDetail ? "modal-open" : ""}`}>
        <header className="header-app">
          <img src={logo} alt="Logo" className="logo" />
          <div className="header-text">
            <div>
              {showTitlesForm ? (
                <form onSubmit={handleSubmit}>
                  <input
                    className="title-form"
                    type="text"
                    onChange={handleChangeT}
                    value={title}
                  />
                </form>
              ) : (
                <h1 onClick={() => setShowTitlesForm(true)}>{title}</h1>
              )}
              <img src={pencil} alt="P" />
            </div>
            {showSubTitlesForm ? (
              <form onSubmit={handleSubmit}>
                <input
                  className="subtitle-form"
                  type="text"
                  onChange={handleChangeT}
                  value={subtitle}
                />
              </form>
            ) : (
              <p onClick={() => setShowSubTitlesForm(true)}>{subtitle}</p>
            )}
          </div>
        </header>
        <TaksList tasks={tasks} edit={editTask} />
        <button
          className="btn-open"
          onClick={() => {
            setShowDetail(true);
            setForm({
              title: "To do",
              description: "",
              icon: "💻",
              status: "t",
            });
          }}
        >
          {" "}
          <img src={addIcon} alt="Add" />
          Add new task
        </button>
      </div>
      {showDetail && (
        <TaskDetail
          form={form}
          change={handleChange}
          close={() => setShowDetail(false)}
          add={addNewTask}
          del={deleteTask}
        />
      )}
    </>
  );
};

export default Board;
