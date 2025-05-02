"use client";
import React, { useEffect, useState } from "react";
import { Button, TextField, Box, Modal } from "@mui/material"; // MUIコンポーネントのインポート
import { Add } from "@mui/icons-material"; // アイコンのインポート
import "./styles.css";
import { Todo, Step, MiniStep, PointedObject } from "../modules/TodoClasses"; // Todo, Step, MiniStepのインポート

const App = () => {
  // インスタンス作成
  const [todo, setTodo] = useState(new Todo("My Todo"));
  const step1 = new Step("Step 1");
  const step2 = new Step("Step 2");

  useEffect(() => {
    step1.addMiniStep(new MiniStep("Mini Step 1.1"));
    step1.addMiniStep(new MiniStep("Mini Step 1.2"));

    step2.addMiniStep(new MiniStep("Mini Step 2.1"));

    todo.addStep(step1);
    todo.addStep(step2);
  }, []);

  const [pointedObject, setPointedObject] = useState<PointedObject | null>(null);

  const [editingObject, setEditingObject] = useState<PointedObject | null>(null);

  const [editingText, setEditingText] = useState<string>("");

  const [isComposing, setIsComposing] = useState(false);

  const handleDoubleClick = () => {
    if (editingObject) {
      return;
    }
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

  const [open, setOpen] = useState(false); // モーダルの状態管理

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <h1
        onMouseEnter={() => setPointedObject(new PointedObject(0, -1, -1))}
        onMouseLeave={() => setPointedObject(null)}
        onDoubleClick={() => handleDoubleClick()}
        className="pointer"
      >
        {editingObject && editingObject.todoIndex === 0 && editingObject.stepIndex === -1 ? (
          <input
            type="text"
            value={editingText}
            onChange={handleEdit}
            onBlur={handleBlur}
            onKeyDown={(e) => {
              if (!isComposing && e.key === "Enter") {
                handleBlur();
              }
            }}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            autoFocus
          />
        ) : (
          todo.title
        )}
      </h1>
      {todo.steps.map((step, stepIndex) => (
        <div key={stepIndex}>
          <h2
            onMouseEnter={() => setPointedObject(new PointedObject(0, stepIndex, -1))}
            onMouseLeave={() => setPointedObject(null)}
            onDoubleClick={() => handleDoubleClick()}
            className="pointer"
          >
            {editingObject && editingObject.stepIndex === stepIndex && editingObject.miniStepIndex === -1 ? (
              <input
                type="text"
                value={editingText}
                onChange={handleEdit}
                onBlur={handleBlur}
                onKeyDown={(e) => {
                  if (!isComposing && e.key === "Enter") {
                    handleBlur();
                  }
                }}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
                autoFocus
              />
            ) : (
              `- ${step.stepTitle}`
            )}
          </h2>
          <ul>
            {step.miniSteps.map((miniStep, miniStepIndex) => (
              <li
                key={miniStepIndex}
                onMouseEnter={() => setPointedObject(new PointedObject(0, stepIndex, miniStepIndex))}
                onMouseLeave={() => setPointedObject(null)}
                onDoubleClick={() => handleDoubleClick()}
                className="pointer"
              >
                {editingObject &&
                editingObject.stepIndex === stepIndex &&
                editingObject.miniStepIndex === miniStepIndex ? (
                  <input
                    type="text"
                    value={editingText}
                    onChange={handleEdit}
                    onBlur={handleBlur}
                    onKeyDown={(e) => {
                      if (!isComposing && e.key === "Enter") {
                        handleBlur();
                      }
                    }}
                    onCompositionStart={() => setIsComposing(true)}
                    onCompositionEnd={() => setIsComposing(false)}
                    autoFocus
                  />
                ) : (
                  `-- ${miniStep.miniStepTitle}`
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}

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
          <button onClick={() => setPointedObject(null)}>閉じる</button>
        </div>
      )}

      {/* フローティングボタン */}
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
            }}
          >
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default App;
