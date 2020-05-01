import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

import styles from "./Pagination.module.css"

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function BasicPagination(props) {
  const { currentPage, numberOfPages, changePage } = props
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Pagination
        count={numberOfPages} color="primary"
        page={currentPage}
        onChange={(event, page) => changePage(page)}
      />
    </div>
  );
}