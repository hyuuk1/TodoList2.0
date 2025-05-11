import { areSameIndex } from "@/app/page";
import { MiniStep, Index } from "@/modules/TodoClasses";

export const MiniStepComponent = ({
  miniStep,
  index,
  editingObject,
  editingText,
  clickedObject,
  handleDoubleClick,
  handleEdit,
  handleBlur,
  handleClick,
}: {
  miniStep: MiniStep;
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
    <h2
      onDoubleClick={() => handleDoubleClick(index, miniStep.miniStepTitle)}
      onClick={() => handleClick(index)}
      className={areSameIndex(index, clickedObject) ? "highlight" : ""}
    >
      {areSameIndex(index, editingObject) ? (
        <input type="text" value={editingText} onChange={handleEdit} onBlur={handleBlur} autoFocus />
      ) : (
        `- ${miniStep.miniStepTitle}`
      )}
    </h2>
  );
};
