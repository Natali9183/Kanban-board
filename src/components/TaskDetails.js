import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const TaskDetails = ({ tasksById, updateDescription }) => {
  const { taskId } = useParams();
  const task = tasksById[taskId];
  const [description, setDescription] = useState(task?.description || "");

  useEffect(() => {
    setDescription(task?.description || "");
  }, [task]);

  if (!task) {
    return (
      <section className="task-details">
        <Link className="task-details__close" to="/" aria-label="Вернуться к доске">×</Link>
        <h2 className="task-details__title">Задача не найдена</h2>
      </section>
    );
  }

  return (
    <section className="task-details">
      <Link className="task-details__close" to="/" aria-label="Закрыть страницу задачи">×</Link>
      <h2 className="task-details__title">{task.title}</h2>
      <label className="task-details__label" htmlFor="task-description">Описание задачи</label>
      <textarea
        id="task-description"
        className="task-details__description"
        value={description}
        placeholder="This task has no description"
        onChange={(event) => setDescription(event.target.value)}
      />
      <button
        className="task-details__save"
        type="button"
        onClick={() => updateDescription(task.id, description)}
      >
        Save description
      </button>
    </section>
  );
};
