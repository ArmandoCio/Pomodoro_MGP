import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal } from "../features/goals/goalSlice";
import { Button, Typography, Grid, Box, autocompleteClasses } from "@mui/material";
import { TextField } from "@mui/material";

function GoalForm() {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createGoal({ text }));
    setText("");
  };

  return (

    <div className="formContainer">

        
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={3}
      >
        <Grid item>
          <TextField
            id="text"
            name="text"
            label={"Enter a goal"}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

<Button variant="contained" size="large" sx={{p: 2,}} onClick={onSubmit}>
            Add
          </Button>
        </Grid>
   
      </Grid>
    </div>
  );
}

export default GoalForm;
