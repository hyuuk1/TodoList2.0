import { PointedObject, Step } from "@/modules/TodoClasses";
import { MiniStepComponent } from "./MiniStep"; // MiniStepComponentをインポート
export const StepComponent = ({
  step,
  stepIndex,
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
  step: Step;
  stepIndex: number;
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
      <h2
        onMouseEnter={() => setPointedObject(new PointedObject(0, stepIndex, -1))}
        onMouseLeave={() => setPointedObject(null)}
        onDoubleClick={handleDoubleClick}
      >
        {editingObject && editingObject.stepIndex === stepIndex && editingObject.miniStepIndex === -1 ? (
          <input type="text" value={editingText} onChange={handleEdit} onBlur={handleBlur} autoFocus />
        ) : (
          `- ${step.stepTitle}`
        )}
      </h2>
      <ul>
        {step.miniSteps.map((miniStep, miniStepIndex) => (
          <MiniStepComponent
            key={miniStepIndex}
            miniStep={miniStep}
            stepIndex={stepIndex}
            miniStepIndex={miniStepIndex}
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
        ))}
      </ul>
    </div>
  );
};
