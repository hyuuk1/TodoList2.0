import { Index, Step } from "@/modules/TodoClasses";
import { MiniStepComponent } from "./MiniStep"; // MiniStepComponentをインポート
import { areSameIndex } from "@/lib/areSameIndex";
import "../app/styles.css";
import { Box, Typography, TextField } from "@mui/material";
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
    <Box sx={{ ml: 3, mb: 2 }}>
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
          variant="h6"
          onDoubleClick={() => handleDoubleClick(index, step.stepTitle)}
          onClick={() => handleClick(index)}
          sx={{
            cursor: "pointer",
            backgroundColor: areSameIndex(index, clickedObject) ? "lightblue" : "transparent",
            px: 1,
            py: 0.5,
            borderRadius: 1,
          }}
        >
          {`- ${step.stepTitle}`}
        </Typography>
      )}

      <Box component="ul" sx={{ listStyle: "none", pl: 4 }}>
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
      </Box>
    </Box>
  );
};
