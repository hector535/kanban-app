import { CSSProperties } from "react";
import { shallowEqual } from "react-redux";
import ScrollContainer from "react-indiana-drag-scroll";
import { EmptyBoardMessage } from "@/components/app";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { toggleField } from "@/slices/ui-slice";
import { selectTask } from "@/slices/app-slice";
import { Task } from "@/types";

type TaskListProps = {
  tasks: Task[];
  renderItem: (task: Task) => JSX.Element;
};

type TaskListItemProps = {
  task: Task;
  onItemClick: (task: Task) => void;
};

const TaskList = (props: TaskListProps) => {
  const { tasks, renderItem } = props;

  return (
    <ScrollContainer
      component="ul"
      className="grid gap-[1.25rem] p-2 content-start overflow-auto scrollbar-hide"
    >
      {tasks.map(renderItem)}
    </ScrollContainer>
  );
};

const TaskListItem = (props: TaskListItemProps) => {
  const { task, onItemClick } = props;
  const subtasks = useAppSelector((state) =>
    task.subtaskIds.map((subtaskId) => state.app.subtasks[subtaskId])
  );
  const completedSubtasks = subtasks.filter((subTask) => subTask.isCompleted);

  return (
    <li
      tabIndex={0}
      className="bg-white rounded-lg select-none py-6 px-4 shadow-md cursor-pointer ring-offset-white transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:bg-gray-very-dark"
      onClick={() => onItemClick(task)}
    >
      <h1 className="transition-colors duration-200 text-[0.9375rem] font-bold text-black dark:text-white">
        {task.title}
      </h1>
      <p className="transition-colors duration-200 text-[0.75rem] font-bold text-gray">
        {completedSubtasks.length} of {subtasks.length} subtasks
      </p>
    </li>
  );
};

export const MainView = () => {
  const { columns, tasks } = useAppSelector((state) => {
    const board = state.app.boards[state.app.selectedBoardId] || {
      columnIds: [],
    };
    const columns = board.columnIds.map(
      (columnId) => state.app.columns[columnId]
    );
    const tasks = state.app.tasks;

    return { columns, tasks };
  }, shallowEqual);

  const dispatch = useAppDispatch();

  if (columns.length === 0) return <EmptyBoardMessage />;

  const style: CSSProperties = {
    gridTemplateColumns: `repeat(${columns.length + 1}, 280px)`,
  };

  const handleItemClick = (taskId: string) => {
    dispatch(selectTask(taskId));
    dispatch(toggleField({ name: "showTaskDetails" }));
  };

  const handleNewColumnClick = () => {
    dispatch(toggleField({ name: "showEditBoardForm" }));
  };

  return (
    <ScrollContainer
      component="section"
      style={style}
      className={`h-full grid gap-2 p-6 overflow-auto scrollbar-hide`}
    >
      {columns.map((column) => {
        const taskArr = column.taskIds.map((taskId) => tasks[taskId]);

        return (
          <section
            key={column.id}
            className="grid gap-4 grid-rows-[auto_1fr] overflow-auto"
          >
            <h1 className="transition-colors duration-200 text-[0.75rem] ml-2 font-bold text-gray tracking-[2.4px]">
              {column.name} ({taskArr.length})
            </h1>

            <TaskList
              tasks={taskArr}
              renderItem={(task) => (
                <TaskListItem
                  key={task.id}
                  task={task}
                  onItemClick={(task) => handleItemClick(task.id)}
                />
              )}
            />
          </section>
        );
      })}

      <button
        className="h-[calc(100%-44px)] mt-12 p-2 bg-gray-light text-2xl font-bold transition-colors duration-200 hover:text-purple dark:bg-gray-very-dark"
        onClick={handleNewColumnClick}
      >
        + New Column
      </button>
    </ScrollContainer>
  );
};
