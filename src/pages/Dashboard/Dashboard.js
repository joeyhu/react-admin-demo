import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import intl from 'react-intl-universal'

// import { Budget, TotalUsers, TasksProgress, TotalProfit, LatestSales, UsersByDevice, LatestProducts, LatestOrders } from './components'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}))

const Dashboard = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div>{intl.get('app_name')}x</div>
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <div>1</div>
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <div>1</div>{' '}
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <div>1</div>{' '}
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <div>1</div>{' '}
        </Grid>
        <Grid item lg={8} md={12} xl={9} xs={12}>
          <div>1</div>{' '}
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <div>1</div>{' '}
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <div>1</div>{' '}
        </Grid>
        <Grid item lg={8} md={12} xl={9} xs={12}>
          <div>1</div>{' '}
        </Grid>
      </Grid>
    </div>
  )
}

export default Dashboard
