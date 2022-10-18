import { Button, Grid, IconButton, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";
import "../index.css";

function GoalItem({ goal }) {
  const dispatch = useDispatch();

  return (
    <div className="goalContainer">

    <Grid item>
      {new Date(goal.createdAt).toLocaleString("en-UK")}
      <Grid item>
        <Paper
          sx={{
            mx: "auto",
            m: 1,
            p: 4,
          }}
          elevation={12}
        >
          <Grid container justifyContent="space-between">
            
            
            {goal.text}
            <IconButton aria-label="delete" size="large" onClick={() => dispatch(deleteGoal(goal._id))}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
    </div>
    
  );
}

export default GoalItem;
