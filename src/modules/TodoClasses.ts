export class Todo {
  title: string;
  steps: Step[];

  constructor(title: string) {
    this.title = title;
    this.steps = [];
  }

  addStep(step: Step) {
    this.steps.push(step);
  }
}

export class Step {
  stepTitle: string;
  miniSteps: MiniStep[];

  constructor(stepTitle: string) {
    this.stepTitle = stepTitle;
    this.miniSteps = [];
  }

  addMiniStep(miniStep: MiniStep) {
    this.miniSteps.push(miniStep);
  }
}

export class MiniStep {
  miniStepTitle: string;

  constructor(miniStepTitle: string) {
    this.miniStepTitle = miniStepTitle;
  }
}

export class PointedObject {
  todoIndex: number;
  stepIndex: number;
  miniStepIndex: number;

  constructor(todoIndex: number, stepIndex: number, miniStepIndex: number) {
    this.todoIndex = todoIndex;
    this.stepIndex = stepIndex;
    this.miniStepIndex = miniStepIndex;
  }
}
