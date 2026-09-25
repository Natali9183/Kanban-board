import { Link } from "react-router-dom";

export const TaskCard = ({ task }) => (
  <Link className="task-card" to={`/tasks/${task.id}`}>
    {task.title}
  </Link>
);
