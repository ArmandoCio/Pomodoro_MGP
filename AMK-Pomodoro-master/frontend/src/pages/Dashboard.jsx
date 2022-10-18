import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import Spinner from "../components/Spinner";
import Timer from "../components/PomodoroTimer";
import { getGoals, reset } from "../features/goals/goalSlice";
import {Grid, Typography } from "@mui/material";

import { Box } from "@mui/system";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getGoals());

    if (!isError) {
      dispatch(reset);
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box>
      <Grid>
        <Typography variant="h3" m={5} textAlign="center">
          Welcome {user && user.name} 
          
        </Typography>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Timer />
          </Grid>
          <Grid item m={3}>
            <Grid item>
              <GoalForm />
            </Grid>
            <Grid item>
              {goals.length > 0 ? (
                <Box>
                  {goals.map((goal) => (
                    <GoalItem key={goal._id} goal={goal} />
                  ))}
                  
                </Box>
              ) : (
                <Typography variant="h4">You have not set any goals</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
