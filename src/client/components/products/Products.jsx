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
import { bindActionCreators } from 'redux'
import * as productActions from '../../data/actions/productActions'
import Grid from '@material-ui/core/Grid/Grid'
import SingleProduct from './SingleProduct.jsx'
import CircularProgress from '@material-ui/core/CircularProgress'
import Add from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab/Fab'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import { fade } from '@material-ui/core/styles/colorManipulator'
import IconButton from '@material-ui/core/IconButton'
import NotificationsIcon from '@material-ui/icons/Notifications'
import SortIcon from '@material-ui/icons/Sort'
import Badge from '@material-ui/core/Badge'

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
  progress: {
    marginLeft: theme.spacing.unit * 82,
    marginTop: theme.spacing.unit * 35
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },
  grow: {
    flexGrow: 1
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  noProductMessageContainer: {
    textAlign: 'center',
    marginTop: '20%'
  }
})

const HomeButton = withRouter(({ history }) => (
  <Button color='inherit'>
    <Typography variant='title' color='inherit'>
            E - C O M M E R C E
    </Typography>
  </Button>
))

class Products extends React.Component {
  constructor (props) {
    super(props)
    this.handleClickOnAddProduct = this.handleClickOnAddProduct.bind(this)
    this.handleClickOnGeneratePdf = this.handleClickOnGeneratePdf.bind(this)
    this.generateDraft = this.generateDraft.bind(this)
    this.handleSingleProductClick = this.handleSingleProductClick.bind(this)
  }

  componentWillMount () {
    console.log('Coming in componentWillMount of Products')
    this.props.actions.loadAllProducts()
  }

  generateDraft () {
    let draftedProduct = {
      'name': 'Glasses',
      'tagline': 'Glass of wine',
      'category': 'Crockery',
      'description': 'It is must to have the wine in a great quality of glass.',
      'details': 'Glass plays the main role while having the wine.',
      'price': 1000,
      'discount': 10,
      'status': 'draft',
      'images': [{'imageId': '1', 'imageUri': ''}, {'imageId': '2', 'imageUri': ''}, {'imageId': '3', 'imageUri': ''}, {'imageId': '4', 'imageUri': ''}, {'imageId': '5', 'imageUri': ''}]
    }
    this.props.actions.saveDraft(draftedProduct, this.props.history)
  }

  handleClickOnAddProduct () {
    this.generateDraft()
  }

  handleClickOnGeneratePdf () {
    this.props.history.push('/generatepdf')
  }

  handleSingleProductClick (productId) {
    this.props.history.push(`/product/${productId}`)
  }

  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position='fixed' className={classes.appBar}>
          <Toolbar>
            <HomeButton />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder='Search…'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton color='inherit'>
                <Badge badgeContent={4} color='secondary'>
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton color='inherit' onClick={() => this.handleClickOnGeneratePdf()}>
                <SortIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.loading ? <CircularProgress className={classes.progress} /> : ''}
          {
            !this.props.loading && this.props.products && this.props.products.length > 0
              ? <Grid container spacing={24}>
                {
                  this.props.products &&
                          this.props.products.map(product => (
                            product.status !== 'draft'
                              ? <Grid item xs={3} key={product._id} onClick={() => this.handleSingleProductClick(product._id)}>
                                <SingleProduct key={product._id} product={product} />
                              </Grid>
                              : ''
                          ))
                }
              </Grid>
              : <div className={classes.noProductMessageContainer}>
                <Typography variant='h4' gutterBottom>
                        You do not have any product. Please add the products.
                </Typography>
              </div>
          }
        </main>
        <Fab color='primary' variant='extended' aria-label='Add' className={classes.fab} onClick={() => this.handleClickOnAddProduct()}>
          <Add className={classes.extendedIcon} />
          Add Product
        </Fab>
      </div>
    )
  }
}

Products.propTypes = {
  classes: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  console.log('Coming in mapStateToProps')
  console.log('state 111 : ' + JSON.stringify(state))
  return {
    products: state.productReducer.productList,
    loading: state.productReducer.loading
  }
}

function mapDispatchToProps (dispatch) {
  console.log('Coming in mapDispatchToProps')
  return { actions: bindActionCreators(productActions, dispatch) }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(withRouter(Products))
