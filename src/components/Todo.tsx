import { PointedObject, Todo } from "@/modules/TodoClasses";
import { StepComponent } from "./Step"; // StepComponentをインポート
export const TodoComponent = ({
  todo,
  pointedObject,
  editingObject,
  editingText,
  setPointedObject,
  setEditingObject,
  setEditingText,
  handleDoubleClick,
  handleEdit,
  handleBlur,
}: {
  todo: Todo;
  pointedObject: PointedObject | null;
  editingObject: PointedObject | null;
  editingText: string;
  setPointedObject: React.Dispatch<React.SetStateAction<PointedObject | null>>;
  setEditingObject: React.Dispatch<React.SetStateAction<PointedObject | null>>;
  setEditingText: React.Dispatch<React.SetStateAction<string>>;
  handleDoubleClick: () => void;
  handleEdit: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: () => void;
}) => {
  return (
    <div>
      <h1
        onMouseEnter={() => setPointedObject(new PointedObject(0, -1, -1))}
        onMouseLeave={() => setPointedObject(null)}
        onDoubleClick={handleDoubleClick}
      >
        {editingObject && editingObject.stepIndex === -1 && editingObject.miniStepIndex === -1 ? (
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
              stepIndex={stepIndex}
              pointedObject={pointedObject}
              editingObject={editingObject}
              editingText={editingText}
              setPointedObject={setPointedObject}
              setEditingObject={setEditingObject}
              setEditingText={setEditingText}
              handleDoubleClick={handleDoubleClick}
              handleEdit={handleEdit}
              handleBlur={handleBlur}
            />
          ))
        : null}
    </div>
  );
};
