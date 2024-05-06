import closeIcon from "../assets/close_ring_duotone-1.svg";
import trash from "../assets/Trash.svg";
import done from "../assets/Done_round.svg";
import progress from "../assets/Time_atack_duotone.svg";
import completed from "../assets/Done_round_duotone.svg";
import wontDo from "../assets/close_ring_duotone.svg";
import rountDone from "../assets/Done_round.svg";

const TaskDetail = ({ form, change, add, del, close }) => {
  // Form
  const { title, description, icon, status } = form;

  // Constantes
  const icons = ["💻", "💬", "☕", "💪", "📚", "⏰"];

  const states = [
    {
      img: progress,
      text: "In Progress",
      value: "p",
      color: "#E9A23B",
    },
    {
      img: completed,
      text: "Completed",
      value: "c",
      color: "#32D657",
    },
    {
      img: wontDo,
      text: "Won't do",
      value: "w",
      color: "#DD524C",
    },
  ];

  return (
    <aside className="modal-detail">
      <header className="header-detail">
        <h2>Task details</h2>
        <button className="btn-close-detail" onClick={close}>
          <img src={closeIcon} alt="X" />
        </button>
      </header>
      <form className="form-detail">
        <div className="form">
          <div className="group-input">
            <label htmlFor="title">Task name</label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={change}
              value={title}
              placeholder="Enter a title"
            />
          </div>
          <div className="group-input">
            <label htmlFor="desc">Description</label>
            <textarea
              name="description"
              id="desc"
              placeholder="Enter a short description"
              value={description}
              onChange={change}
            ></textarea>
          </div>
          <div className="group-radios">
            <p>Icons</p>
            <div className="radios-icons">
              {icons.map((item, i) => (
                <div key={i} className="radio-wrapper">
                  <input
                    type="radio"
                    name="icon"
                    id={item}
                    onChange={change}
                    value={icon}
                    checked={icon === item}
                  />
                  <label htmlFor={item} className="label-icons">
                    {item}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="group-radios">
            <p>Status</p>
            <div className="radios-status">
              {states.map((s, i) => (
                <div key={i} className="radio-status-d">
                  <input
                    type="radio"
                    name="status"
                    id={s.value}
                    onChange={change}
                    value={status}
                    checked={s.value === status}
                  />
                  <label htmlFor={s.value} className="status-radio">
                    <div>
                      <div
                        className="img-status"
                        style={{ backgroundColor: s.color }}
                      >
                        <img src={s.img} alt={s.value} />
                      </div>
                      {s.text}
                    </div>
                    <img src={rountDone} alt="idk" className="done-status" />
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="btns-detail">
          <button
            type="button"
            className="btn-delete"
            onClick={() => del(form.id)}
          >
            <p>Delete</p> <img src={trash} alt="T" />
          </button>
          <button type="button" className="btn-save" onClick={add}>
            <p>Save</p> <img src={done} alt="S" />
          </button>
        </div>
      </form>
    </aside>
  );
};

export default TaskDetail;
