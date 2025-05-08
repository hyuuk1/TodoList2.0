export class Todo {
  title: string;
  steps: Step[];
  open: boolean; // 開閉状態を管理

  constructor(title: string) {
    this.title = title;
    this.steps = [];
    this.open = true; // 初期状態は閉じている
  }

  toggleOpen() {
    this.open = !this.open; // 開閉状態を切り替える
  }
}

export class Step {
  stepTitle: string;
  miniSteps: MiniStep[];
  open: boolean; // 開閉状態を管理

  constructor(stepTitle: string) {
    this.stepTitle = stepTitle;
    this.miniSteps = [];
    this.open = true; // 初期状態は閉じている
  }

  toggleOpen() {
    this.open = !this.open; // 開閉状態を切り替える
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
