import { Index } from "@/modules/TodoClasses";

export const areSameIndex = (checkedObject: Index, trueObect: Index | null) => {
  if (checkedObject.todoIndex === trueObect?.todoIndex) {
    if (checkedObject.stepIndex === trueObect?.stepIndex) {
      if (checkedObject.miniStepIndex === trueObect?.miniStepIndex) {
        return true;
      }
    }
  }
  return false;
};
