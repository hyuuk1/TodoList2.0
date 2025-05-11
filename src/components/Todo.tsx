import { Index, Todo } from "@/modules/TodoClasses";
import { StepComponent } from "./Step"; // StepComponentをインポート
import { areSameIndex } from "@/app/page";
import "../app/styles.css";
export const TodoComponent = ({
  todo,
  index,
  editingObject,
  editingText,
  clickedObject,
  handleDoubleClick,
  handleEdit,
  handleBlur,
  handleClick,
}: {
  todo: Todo;
  index: Index;
  editingObject: Index | null;
  editingText: string;
  clickedObject: Index | null;
  setEditingObject: React.Dispatch<React.SetStateAction<Index | null>>;
  setEditingText: React.Dispatch<React.SetStateAction<string>>;
  setClickedObject: React.Dispatch<React.SetStateAction<Index | null>>;
  handleDoubleClick: (index: Index, text: string) => void;
  handleEdit: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: () => void;
  handleClick: (index: Index) => void;
}) => {
  return (
    <div>
      <h1
        onDoubleClick={() => handleDoubleClick(index, todo.title)}
        onClick={() => handleClick(index)}
        className={areSameIndex(index, clickedObject) ? "highlight" : ""}
      >
        {areSameIndex(index, editingObject) ? (
          <input type="text" value={editingText} onChange={handleEdit} onBlur={handleBlur} autoFocus />
        ) : (
          todo.title
        )}
      </h1>
      {todo.open
        ? todo.steps.map((step, stepIndex) => (
            <StepComponent
              key={stepIndex}
              step={step}
              index={new Index(index.todoIndex, stepIndex)}
              editingObject={editingObject}
              editingText={editingText}
              clickedObject={clickedObject}
              handleDoubleClick={handleDoubleClick}
              handleEdit={handleEdit}
              handleBlur={handleBlur}
              handleClick={handleClick}
            />
          ))
        : null}
    </div>
  );
};
