import progress from "../assets/Time_atack_duotone.svg";
import completed from "../assets/Done_round_duotone.svg";
import wontDo from "../assets/close_ring_duotone.svg";

const TaksList = ({ tasks, edit }) => {
  const showStatus = (str) => {
    if (str === "p") {
      return progress;
    } else if (str === "c") {
      return completed;
    } else if (str === "w") {
      return wontDo;
    }
  };

  return (
    <div className="tasks-container">
      {tasks.map((t) => (
        <div
          key={t.id}
          className={`task ${t.status}`}
          onClick={() => edit(t.id)}
        >
          <p>{t.icon}</p>
          <div className="text-task">
            <h3>{t.title}</h3>
            <p>{t.description}</p>
          </div>
          {t.status !== "t" && (
            <div className="img-status-task">
              <img src={showStatus(t.status)} alt="status" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaksList;
