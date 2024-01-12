import { CSSProperties } from "react";
import { shallowEqual } from "react-redux";
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from "@hello-pangea/dnd";
import { EmptyBoardMessage } from "@/components/app";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { toggleField } from "@/slices/ui-slice";
import { dragTask, selectTask } from "@/slices/app-slice";
import { Task } from "@/types";

type TaskListProps = {
  columnId: string;
  tasks: Task[];
  renderItem: (task: Task, index: number) => JSX.Element;
};

type TaskListItemProps = {
  index: number;
  task: Task;
  onItemClick: (task: Task) => void;
};

const TaskList = (props: TaskListProps) => {
  const { columnId, tasks, renderItem } = props;

  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <ul
          ref={provided.innerRef}
          className="content-start p-2 overflow-auto scrollbar-hide"
          {...provided.droppableProps}
        >
          {tasks.map(renderItem)}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

const TaskListItem = (props: TaskListItemProps) => {
  const { index, task, onItemClick } = props;
  const subtasks = useAppSelector((state) =>
    task.subtaskIds.map((subtaskId) => state.app.subtasks[subtaskId])
  );
  const completedSubtasks = subtasks.filter((subTask) => subTask.isCompleted);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          tabIndex={0}
          className="bg-white mt-5 rounded-lg select-none py-6 px-4 shadow-md cursor-pointer ring-offset-white transition-[color,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:bg-gray-very-dark"
          onClick={() => onItemClick(task)}
        >
          <h1 className="transition-colors duration-200 text-[0.9375rem] font-bold text-black dark:text-white">
            {task.title}
          </h1>
          <p className="transition-colors duration-200 text-[0.75rem] font-bold text-gray">
            {completedSubtasks.length} of {subtasks.length} subtasks
          </p>
        </li>
      )}
    </Draggable>
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
    gridTemplateColumns: `repeat(${columns.length + 1}, 280px) 24px`,
  };

  const handleItemClick = (taskId: string) => {
    dispatch(selectTask(taskId));
    dispatch(toggleField({ name: "showTaskDetails" }));
  };

  const handleNewColumnClick = () => {
    dispatch(toggleField({ name: "showEditBoardForm" }));
  };

  const handleDragEnd: OnDragEndResponder = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    dispatch(
      dragTask({
        source: { columnId: source.droppableId, index: source.index },
        destination: {
          columnId: destination.droppableId,
          index: destination.index,
        },
      })
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <section style={style} className={`h-full grid gap-2 p-6`}>
        {columns.map((column) => {
          const taskArr = column.taskIds.map((taskId) => tasks[taskId]);

          return (
            <section
              key={column.id}
              className="grid grid-rows-[auto_1fr] overflow-auto"
            >
              <h1 className="transition-colors duration-200 text-[0.75rem] ml-2 font-bold text-gray tracking-[2.4px]">
                {column.name} ({taskArr.length})
              </h1>

              <TaskList
                columnId={column.id}
                tasks={taskArr}
                renderItem={(task, index) => (
                  <TaskListItem
                    key={task.id}
                    index={index}
                    task={task}
                    onItemClick={(task) => handleItemClick(task.id)}
                  />
                )}
              />
            </section>
          );
        })}

        <button
          className="h-[calc(100%-44px)] mt-12 bg-gray-light text-2xl font-bold transition-colors duration-200 hover:text-purple dark:bg-gray-very-dark"
          onClick={handleNewColumnClick}
        >
          + New Column
        </button>

        <div></div>
      </section>
    </DragDropContext>
  );
};
