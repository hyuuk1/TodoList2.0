import { Index, Step } from "@/modules/TodoClasses";
import { MiniStepComponent } from "./MiniStep"; // MiniStepComponentをインポート
import { areSameIndex } from "@/app/page"; // checkIndexをインポート
import "../app/styles.css";
export const StepComponent = ({
  step,
  index,
  editingObject,
  editingText,
  clickedObject,
  handleDoubleClick,
  handleEdit,
  handleBlur,
  handleClick,
}: {
  step: Step;
  index: Index;
  editingObject: Index | null;
  editingText: string;
  clickedObject: Index | null;
  handleDoubleClick: (index: Index, text: string) => void;
  handleEdit: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: () => void;
  handleClick: (index: Index) => void;
}) => {
  return (
    <div>
      <h2
        onDoubleClick={() => handleDoubleClick(index, step.stepTitle)}
        onClick={() => handleClick(index)}
        className={areSameIndex(index, clickedObject) ? "highlight" : ""}
      >
        {areSameIndex(index, editingObject) ? (
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
            index={new Index(index.todoIndex, index.stepIndex, miniStepIndex)}
            editingObject={editingObject}
            editingText={editingText}
            handleDoubleClick={handleDoubleClick}
            handleEdit={handleEdit}
            handleBlur={handleBlur}
            handleClick={handleClick}
            clickedObject={clickedObject}
          />
        ))}
      </ul>
    </div>
  );
};
