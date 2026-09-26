export const Footer = ({ activeTasks, finishedTasks }) => (
  <footer className="footer">
    <div className="footer__counts">
      <span>Active tasks: {activeTasks}</span>
      <span>Finished tasks: {finishedTasks}</span>
    </div>
    <span>Kanban board by Nataly, 2026</span>
  </footer>
);
