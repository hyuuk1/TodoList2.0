"use client";
import React, { useEffect, useState } from "react";
import { Button, TextField, Box, Modal } from "@mui/material"; // MUIコンポーネントのインポート
import { Add } from "@mui/icons-material"; // アイコンのインポート
import "./styles.css";
import { Todo, Step, MiniStep, PointedObject } from "../modules/TodoClasses"; // Todo, Step, MiniStepのインポート
import { TodoComponent } from "../components/Todo"; // TodoComponentのインポート

const App = () => {
  const [todo, setTodo] = useState<Todo>(new Todo("My Todo"));

  useEffect(() => {
    const step1 = new Step("Step 1");
    const step2 = new Step("Step 2");

    step1.miniSteps.push(new MiniStep("Mini Step 1.1"));
    step1.miniSteps.push(new MiniStep("Mini Step 1.2"));

    step2.miniSteps.push(new MiniStep("Mini Step 2.1"));

    todo.steps.push(step1);
    todo.steps.push(step2);

    setTodo(todo);
  }, []);

  const [pointedObject, setPointedObject] = useState<PointedObject | null>(null);
  const [editingObject, setEditingObject] = useState<PointedObject | null>(null);
  const [editingText, setEditingText] = useState<string>("");
  const [open, setOpen] = useState(false); // モーダルの状態管理
  const [clickedObject, setClickedObject] = useState<PointedObject | null>(null); // 新しいステート

  const handleDoubleClick = () => {
    if (!pointedObject) {
      return;
    }
    setEditingObject(pointedObject);

    if (pointedObject.stepIndex === -1 && pointedObject.miniStepIndex === -1) {
      setEditingText(todo.title);
    } else if (pointedObject.miniStepIndex === -1) {
      setEditingText(todo.steps[pointedObject.stepIndex].stepTitle);
    } else {
      setEditingText(todo.steps[pointedObject.stepIndex].miniSteps[pointedObject.miniStepIndex].miniStepTitle);
    }
  };

  const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingText(e.target.value);
  };

  const handleBlur = () => {
    if (!editingObject) return;

    setTodo((prevTodo) => {
      const updatedTodo = prevTodo;

      if (editingObject.stepIndex === -1 && editingObject.miniStepIndex === -1) {
        updatedTodo.title = editingText;
      } else if (editingObject.miniStepIndex === -1) {
        updatedTodo.steps[editingObject.stepIndex].stepTitle = editingText;
      } else {
        updatedTodo.steps[editingObject.stepIndex].miniSteps[editingObject.miniStepIndex].miniStepTitle = editingText;
      }

      return updatedTodo;
    });

    setEditingObject(null);
  };

  const handleClick = () => {
    setClickedObject(pointedObject); // クリックされたオブジェクトをセット
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAdd = () => {
    setTodo((prevTodo) => {
      const updatedTodo = {
        ...prevTodo, // prevTodoのすべてのプロパティをコピー
      };
      updatedTodo.open = !updatedTodo.open; // 開閉状態を切り替える

      return updatedTodo as Todo; // 型アサーションでTodo型を保証
    });
  };

  return (
    <>
      <TodoComponent
        todo={todo}
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
      {pointedObject && (
        <div className="centered-modal">
          <h2>Todo Index: {pointedObject.todoIndex}</h2>
          {pointedObject.stepIndex >= 0 && <h3>Step Index: {pointedObject.stepIndex}</h3>}
          {pointedObject.miniStepIndex >= 0 && <h4>Mini Step Index: {pointedObject.miniStepIndex}</h4>}
          {editingObject && (
            <div>
              <h4>Editing Object: {JSON.stringify(editingObject)}</h4>
            </div>
          )}
          <div>{"Open: " + todo.open}</div>
          <button onClick={() => setPointedObject(null)}>閉じる</button>
        </div>
      )}
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
        }}
        onClick={handleOpen}
      >
        Add Step
      </Button>
      {/* モーダル */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <h2>Add a New Step</h2>
          <TextField fullWidth label="Step Title" variant="outlined" margin="normal" />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              alert("Step added!");
              handleClose();
              handleAdd();
              setTodo((prevTodo) => {
                alert("Step added!");
                const updatedTodo = prevTodo;
                updatedTodo.open = !updatedTodo.open; // 開閉状態を切り替える
                return updatedTodo;
              });
            }}
          >
            Add
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default App;
