import { Index, Todo } from "@/modules/TodoClasses";
import { StepComponent } from "./Step"; // StepComponentをインポート
import { areSameIndex } from "@/lib/areSameIndex";
import "../app/styles.css";
import { Box, TextField, Typography } from "@mui/material";
export const TodoComponent = ({
  todo,
  index,
  editingObject,
  editingText,
  clickedObject,
  handleDoubleClick,
  handleEdit,
  handleBlur,
  handleClick,
}: {
  todo: Todo;
  index: Index;
  editingObject: Index | null;
  editingText: string;
  clickedObject: Index | null;
  setEditingObject: React.Dispatch<React.SetStateAction<Index | null>>;
  setEditingText: React.Dispatch<React.SetStateAction<string>>;
  setClickedObject: React.Dispatch<React.SetStateAction<Index | null>>;
  handleDoubleClick: (index: Index, text: string) => void;
  handleEdit: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: () => void;
  handleClick: (index: Index) => void;
}) => {
  return (
    <Box sx={{ mb: 3, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
      {areSameIndex(index, editingObject) ? (
        <TextField
          value={editingText}
          onChange={handleEdit}
          onBlur={handleBlur}
          autoFocus
          variant="standard"
          size="small"
          fullWidth
        />
      ) : (
        <Typography
          variant="h5"
          onDoubleClick={() => handleDoubleClick(index, todo.title)}
          onClick={() => handleClick(index)}
          sx={{
            cursor: "pointer",
            backgroundColor: areSameIndex(index, clickedObject) ? "lightblue" : "transparent",
            px: 1,
            py: 0.5,
            borderRadius: 1,
          }}
        >
          {todo.title}
        </Typography>
      )}
      {todo.open &&
        todo.steps.map((step, stepIndex) => (
          <StepComponent
            key={stepIndex}
            step={step}
            index={new Index(index.todoIndex, stepIndex)}
            editingObject={editingObject}
            editingText={editingText}
            clickedObject={clickedObject}
            handleDoubleClick={handleDoubleClick}
            handleEdit={handleEdit}
            handleBlur={handleBlur}
            handleClick={handleClick}
          />
        ))}
    </Box>
  );
};
