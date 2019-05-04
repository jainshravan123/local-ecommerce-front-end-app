import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router-dom'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar
})

class Header extends React.Component {
  render () {
    const { classes } = this.props
    const HomeButton = withRouter(({ history }) => (
      <Button color='inherit'>
        <Typography variant='title' color='inherit'>
                E - C O M M E R C E
        </Typography>
      </Button>
    ))

    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <HomeButton />
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Header)
