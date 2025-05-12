"use client";
import React, { useEffect, useState } from "react";
import { Button, ToggleButtonGroup, ToggleButton } from "@mui/material"; // MUIコンポーネントのインポート
import { Add } from "@mui/icons-material"; // アイコンのインポート
import "./styles.css";
import { Todo, Step, MiniStep, Index, Mode } from "../modules/TodoClasses"; // Todo, Step, MiniStepのインポート
import { TodoComponent } from "../components/Todo"; // TodoComponentのインポート
import cloneDeep from "lodash/cloneDeep"; // cloneDeepのインポート
import { set } from "lodash";
import SaveButton from "@/components/SaveButton";
import TopBanner from "@/components/Banner";

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
const LOCAL_STORAGE_KEY = "todos";

export const saveTodosToLocalStorage = (todos: Todo[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
};

export const loadTodosFromLocalStorage = (): Todo[] => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // Todoの配列を管理するステート

  useEffect(() => {
    const loaded = loadTodosFromLocalStorage();
    setTodos(loaded);
    setHasLoaded(true); // 読み込み完了フラグ
  }, []);

  const [editingObject, setEditingObject] = useState<Index | null>(null);
  const [editingText, setEditingText] = useState<string>("");
  const [open, setOpen] = useState(false); // モーダルの状態管理
  const [clickedObject, setClickedObject] = useState<Index | null>(null); // 新しいステート
  const [mode, setMode] = useState<Mode>(Mode.AddStep); // モードの状態管理
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const loaded = loadTodosFromLocalStorage();
    setTodos(loaded);
    setHasLoaded(true); // 読み込み完了フラグ
  }, []);

  const handleDoubleClick = (index: Index, text: string) => {
    setEditingObject(index);
    setEditingText(text);
  };

  const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingText(e.target.value);
  };

  const handleBlur = () => {
    console.log("handleBlur called");
    if (!editingObject) return;

    setTodos((prevTodo) => {
      const updatedTodo = cloneDeep(prevTodo); // 深いコピーを作成

      if (editingObject.stepIndex === -1 && editingObject.miniStepIndex === -1) {
        updatedTodo[editingObject.todoIndex].title = editingText;
      } else if (editingObject.miniStepIndex === -1) {
        updatedTodo[editingObject.todoIndex].steps[editingObject.stepIndex].stepTitle = editingText;
      } else {
        updatedTodo[editingObject.todoIndex].steps[editingObject.stepIndex].miniSteps[
          editingObject.miniStepIndex
        ].miniStepTitle = editingText;
      }

      return updatedTodo;
    });

    setEditingObject(null);
  };

  const handleClick = (index: Index) => {
    switch (mode) {
      case Mode.AddTodo:
        setClickedObject(null);
        break;
      case Mode.AddStep:
        const notMiniStepIndex = index;
        notMiniStepIndex.miniStepIndex = -1; // MiniStepIndexを-1に設定
        setClickedObject(notMiniStepIndex);
        break;
      case Mode.AddMiniStep:
        const notTodoIndex = index;
        if (notTodoIndex.stepIndex === -1) {
          notTodoIndex.stepIndex = 0; // StepIndexを0に設定
        }
        setClickedObject(notTodoIndex);
        break;
      case Mode.Delete:
        setClickedObject(index);
        break;
      default:
        console.error("unknown mode");
    }
  };

  const handleAdd = () => {
    switch (mode) {
      case Mode.AddTodo:
        const todoAddedTodos = cloneDeep(todos);
        todoAddedTodos.push(new Todo("New Todo"));
        setTodos(todoAddedTodos);
        break;
      case Mode.AddStep:
        if (!clickedObject) return;
        const stepAddedTodos = cloneDeep(todos);
        stepAddedTodos[clickedObject.todoIndex].steps.splice(clickedObject.stepIndex + 1, 0, new Step("New Step"));
        setTodos(stepAddedTodos);
        break;
      case Mode.AddMiniStep:
        if (!clickedObject) return;
        const miniStepAddedTodos = cloneDeep(todos);
        miniStepAddedTodos[clickedObject.todoIndex].steps[clickedObject.stepIndex].miniSteps.splice(
          clickedObject.miniStepIndex + 1,
          0,
          new MiniStep("New Mini Step")
        );
        setTodos(miniStepAddedTodos);
        break;
      case Mode.Delete:
        if (!clickedObject) return;
        const deleteTodos = cloneDeep(todos);
        if (clickedObject.stepIndex === -1) {
          deleteTodos.splice(clickedObject.todoIndex, 1);
        } else if (clickedObject.miniStepIndex === -1) {
          deleteTodos[clickedObject.todoIndex].steps.splice(clickedObject.stepIndex, 1);
        } else {
          deleteTodos[clickedObject.todoIndex].steps[clickedObject.stepIndex].miniSteps.splice(
            clickedObject.miniStepIndex,
            1
          );
        }
        setTodos(deleteTodos);
        break;
      default:
        console.error("unknown mode");
    }
  };

  const handleModeChange = (event: React.MouseEvent<HTMLElement>, newMode: Mode | null) => {
    setClickedObject(null);
    if (newMode !== null) {
      setMode(newMode);
    }
  };

  return (
    <>
      <TopBanner onSave={() => saveTodosToLocalStorage(todos)} />
      {!hasLoaded ? (
        "Loading..."
      ) : todos ? (
        todos.map((todo, index) => (
          <TodoComponent
            key={index}
            todo={todo}
            index={new Index(index)}
            editingObject={editingObject}
            editingText={editingText}
            clickedObject={clickedObject}
            setEditingObject={setEditingObject}
            setEditingText={setEditingText}
            setClickedObject={setClickedObject}
            handleDoubleClick={handleDoubleClick}
            handleEdit={handleEdit}
            handleBlur={handleBlur}
            handleClick={handleClick}
          />
        ))
      ) : (
        <p>No todos available.</p>
      )}
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={handleModeChange}
        style={{
          position: "fixed",
          bottom: "80px",
          right: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
        }}
      >
        <ToggleButton value={Mode.AddTodo}>Todo</ToggleButton>
        <ToggleButton value={Mode.AddStep}>Step</ToggleButton>
        <ToggleButton value={Mode.AddMiniStep}>Mini</ToggleButton>
        <ToggleButton value={Mode.Delete}>Delete</ToggleButton>
      </ToggleButtonGroup>

      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
        }}
        onClick={handleAdd}
      >
        {mode === Mode.AddTodo
          ? "Add Todo"
          : mode === Mode.AddStep
          ? "Add Step"
          : mode === Mode.AddMiniStep
          ? "Add MiniStep"
          : "Delete"}
      </Button>
    </>
  );
};

export default App;
