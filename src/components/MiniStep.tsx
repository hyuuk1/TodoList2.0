import { areSameIndex } from "@/lib/areSameIndex";
import { MiniStep, Index } from "@/modules/TodoClasses";
import { Box, Typography, TextField } from "@mui/material";

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
    <Box
      component="li"
      sx={{
        mb: 1,
        px: 1,
        py: 0.5,
        borderRadius: 1,
        backgroundColor: areSameIndex(index, clickedObject) ? "lightblue" : "transparent",
        cursor: "pointer",
      }}
    >
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
          variant="body2"
          onDoubleClick={() => handleDoubleClick(index, miniStep.miniStepTitle)}
          onClick={() => handleClick(index)}
        >
          {`• ${miniStep.miniStepTitle}`}
        </Typography>
      )}
    </Box>
  );
};
