import { useState } from "react";
import { TaskCard } from "./TaskCard";

export const Column = ({ column, tasks, availableTasks, addTask, moveTask }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const isBacklog = column.id === "backlog";
  const isDisabled = !isBacklog && availableTasks.length === 0;

  const submitNewTask = () => {
    if (addTask(newTaskTitle)) {
      setNewTaskTitle("");
      setIsAdding(false);
    }
  };

  const selectTask = (event) => {
    const taskId = event.target.value;

    if (!taskId) {
      return;
    }

    moveTask(taskId, column.previousColumn, column.id);
    setIsAdding(false);
  };

  return (
    <section className="column">
      <h2 className="column__title">{column.title}</h2>
      <div className="column__tasks">
        {tasks.map((task) => <TaskCard key={task.id} task={task} />)}
      </div>

      {isAdding && isBacklog && (
        <input
          className="column__input"
          type="text"
          value={newTaskTitle}
          placeholder="New task title..."
          aria-label="Название новой задачи"
          onChange={(event) => setNewTaskTitle(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              submitNewTask();
            }
          }}
          autoFocus
        />
      )}

      {isAdding && !isBacklog && (
        <select
          className="column__select"
          defaultValue=""
          aria-label={`Перенести задачу в ${column.title}`}
          onChange={selectTask}
          autoFocus
        >
          <option value="" disabled>Выберите задачу</option>
          {availableTasks.map((task) => (
            <option key={task.id} value={task.id}>{task.title}</option>
          ))}
        </select>
      )}

      <button
        className={`column__button ${isDisabled ? "column__button--disabled" : ""}`}
        type="button"
        disabled={isDisabled}
        onClick={() => (isAdding && isBacklog ? submitNewTask() : setIsAdding(true))}
      >
        {isAdding && isBacklog ? "Submit" : "+ Add card"}
      </button>
    </section>
  );
};
