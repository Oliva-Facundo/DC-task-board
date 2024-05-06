import { useEffect, useState } from "react";
import TaksList from "./components/TaksList";
import logo from "./assets/Logo.svg";
import pencil from "./assets/Edit_duotone.svg";
import TaskDetail from "./components/TaskDetail";
import addIcon from "./assets/Add_round_duotone.svg";

function App() {
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
    const savedTask = localStorage.getItem("tasks")
    return savedTask ? JSON.parse(savedTask) : defaultTasks
  });

  const [showDetail, setShowDetail] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

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

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  return (
    <>
      <div className={`container ${showDetail ? "modal-open" : ""}`}>
        <header className="header-app">
          <img src={logo} alt="Logo" className="logo" />
          <div className="header-text">
            <h1>
              My Task Board <img src={pencil} alt="P" />
            </h1>
            <p>Taks to keep organised</p>
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
}

export default App;
