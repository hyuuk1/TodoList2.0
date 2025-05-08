import { MiniStep, PointedObject } from "@/modules/TodoClasses";

export const MiniStepComponent = ({
  miniStep,
  stepIndex,
  miniStepIndex,
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
  miniStep: MiniStep;
  stepIndex: number;
  miniStepIndex: number;
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
    <li
      onMouseEnter={() => setPointedObject(new PointedObject(0, stepIndex, miniStepIndex))}
      onMouseLeave={() => setPointedObject(null)}
      onDoubleClick={handleDoubleClick}
    >
      {editingObject && editingObject.stepIndex === stepIndex && editingObject.miniStepIndex === miniStepIndex ? (
        <input type="text" value={editingText} onChange={handleEdit} onBlur={handleBlur} autoFocus />
      ) : (
        `-- ${miniStep.miniStepTitle}`
      )}
    </li>
  );
};
