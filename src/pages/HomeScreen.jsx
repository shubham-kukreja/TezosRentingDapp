import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function HomeScreen() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Typography variant="h2" component="h2">
            I Want to Rent Out
          </Typography>
          <br />
          <br />
          <Link to="rentout">
            <Button variant="contained" color="primary">
              List My Property
            </Button>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h2" component="h2">
            I Want to Rent In
          </Typography>
          <br />
          <br />
          <Link to="rentin">
            <Button variant="contained" color="primary">
              Find A Place to Live
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}
