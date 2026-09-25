import { COLUMNS } from "../board-data";
import { Column } from "./Column";

export const Board = ({ board, addTask, moveTask }) => (
  <section className="board" aria-label="Канбан-доска">
    {COLUMNS.map((column) => (
      <Column
        key={column.id}
        column={column}
        tasks={board[column.id]}
        availableTasks={column.previousColumn ? board[column.previousColumn] : []}
        addTask={addTask}
        moveTask={moveTask}
      />
    ))}
  </section>
);
