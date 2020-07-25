import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "0 20%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  button: {
    margin: "20!important",
  },
}));

export default function HomeScreen() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={10} sm={6} style={{ color: "#3f51b5" }}>
          <br />
          <br />
          <Typography variant="h4" style={{ marginLeft: 7 }}>
            Decentralized{" "}
          </Typography>
          <Typography variant="h1" style={{ fontWeight: 800 }}>
            Renting{" "}
          </Typography>
          <Typography variant="h1" style={{ fontWeight: 700 }}>
            Dapp
          </Typography>
        </Grid>
        <Grid item xs={5} sm={6}>
          <Link to="rentout">
            <Button
              variant="contained"
              color="primary"
              style={{ margin: 20 }}
              size="large"
              endIcon={<ArrowForwardIcon />}
            >
              Add / Update Property
            </Button>
          </Link>
          <br />
          <Link to="rentin">
            <Button
              variant="contained"
              color="primary"
              style={{ margin: 20 }}
              size="large"
              endIcon={<ArrowForwardIcon />}
            >
              Accept Agreement
            </Button>
          </Link>
          <br />
          <Link to="payrent">
            <Button
              variant="contained"
              color="primary"
              style={{ margin: 20 }}
              size="large"
              endIcon={<ArrowForwardIcon />}
            >
              Pay Rent
            </Button>
          </Link>
          <br />
          <Link to="endcontract">
            <Button
              variant="contained"
              color="secondary"
              style={{ margin: 20 }}
              size="large"
              endIcon={<ArrowForwardIcon />}
            >
              End Contract
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}
