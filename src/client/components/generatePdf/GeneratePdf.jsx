import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import {bindActionCreators} from 'redux'
import * as productActions from '../../data/actions/productActions'
import Grid from '@material-ui/core/Grid/Grid'
import TextField from '@material-ui/core/TextField/TextField'
import IconButton from '@material-ui/core/IconButton/IconButton'
import Badge from '@material-ui/core/Badge/Badge'
import NotificationsIcon from '@material-ui/icons/Notifications'

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar,
  grow: {
    flexGrow: 1
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  }
})

const HomeButton = withRouter(({ history }) => (
  <Button onClick={() => { history.push('/') }} color='inherit'>
    <Typography variant='title' color='inherit'>
            E - C O M M E R C E
    </Typography>
  </Button>
))

class GeneratePdf extends React.Component {
  constructor (props) {
    super(props)
    this.generatingPdf = this.generatingPdf.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.initalState = {
      minprice: 10,
      maxprice: 100,
      filename: 'Products123.pdf'
    }
    this.state = this.initalState
  }

  generatingPdf () {
    let filter = {
      minprice: this.state.minprice,
      maxprice: this.state.maxprice,
      filename: this.state.filename
    }
    console.log('pricesData : ', filter)
    this.props.actions.generatingPdf(filter)
  }

  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position='fixed' className={classes.appBar}>
          <Toolbar>
            <HomeButton />
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton color='inherit'>
                <Badge badgeContent={4} color='secondary'>
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <TextField
                required
                type='number'
                name='minprice'
                id='minprice'
                label='Minimum Price'
                value={this.state.minprice}
                className={classes.textField}
                margin='normal'
                variant='outlined'
                onChange={this.handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6} />
            <Grid item xs={6}>
              <TextField
                required
                type='number'
                name='maxprice'
                id='maxprice'
                label='Maximum Price'
                value={this.state.maxprice}
                className={classes.textField}
                margin='normal'
                variant='outlined'
                onChange={this.handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6} />
            <Grid item xs={6}>
              <Button fullWidth variant='contained' color='primary' onClick={() => this.generatingPdf()}>
                      Generate Raw PDF
              </Button>
            </Grid>
            <Grid item xs={6} />
          </Grid>
        </main>
      </div>
    )
  }
}

function mapStateToProps (state) {
  console.log('Coming in mapStateToProps of genearte pdf')
  console.log('state 333 : ' + JSON.stringify(state))
  return {}
}

function mapDispatchToProps (dispatch) {
  console.log('Coming in mapDispatchToProps of genearte pdf')
  return { actions: bindActionCreators(productActions, dispatch) }
}

GeneratePdf.propTypes = {
  classes: PropTypes.object.isRequired
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(withRouter(GeneratePdf))
