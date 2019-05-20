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
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import Fab from '@material-ui/core/Fab'
import SaveRounded from '@material-ui/icons/SaveRounded'
// import AttachFile from '@material-ui/icons/AttachFile'
import {bindActionCreators} from 'redux'
import * as productActions from '../../data/actions/productActions'
import MySnackbarContent from '../common/snackbar/CustomizedSnackbars.jsx'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton/IconButton'
import Badge from '@material-ui/core/Badge/Badge'
import NotificationsIcon from '@material-ui/icons/Notifications'
// import axios from 'axios'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'

var apiHost = require('./../../data/api/ApiConfig')

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
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  menu: {
    width: 200
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  imageUploadContainer: {
    width: '80%',
    height: '50%',
    borderRadius: '5px',
    border: '2px solid',
    borderColor: theme.palette.text.secondary,
    paddingTop: '30%',
    paddingLeft: '40%'
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
  uploadImageCard: {
    maxWidth: '100%'
  },
  uploadImageMedia: {
    height: 200
  },
  uplodButtonContainer: {
    backgroundColor: '#334455',
    textAlign: 'center'
  }
})

const HomeButton = withRouter(({ history }) => (
  <Button onClick={() => { history.push('/') }} color='inherit'>
    <Typography variant='title' color='inherit'>
            E - C O M M E R C E
    </Typography>
  </Button>
))

const categories = [
  {
    value: 'Crockery',
    label: 'Crockery'
  },
  {
    value: 'Electronics',
    label: 'Electronics'
  },
  {
    value: 'Mechanical',
    label: 'Mechanical'
  },
  {
    value: 'Home Decor',
    label: 'Home Decor'
  }

]

class AddNewProduct extends React.Component {
  constructor (props) {
    super(props)
    console.log('Coming in AddNewProduct')
    this.handleSaveProduct = this.handleSaveProduct.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.resetState = this.resetState.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleFileContainerClick = this.handleFileContainerClick.bind(this)
    this.handleFileContainerClick2 = this.handleFileContainerClick2.bind(this)
    this.handleFileContainerClick3 = this.handleFileContainerClick3.bind(this)
    this.handleFileContainerClick4 = this.handleFileContainerClick4.bind(this)

    this.onChangeUploadHandler = this.onChangeUploadHandler.bind(this)
    this.onChangeUploadHandler2 = this.onChangeUploadHandler2.bind(this)
    this.onChangeUploadHandler3 = this.onChangeUploadHandler3.bind(this)
    this.onChangeUploadHandler4 = this.onChangeUploadHandler4.bind(this)

    this.onClickUploadHandler = this.onClickUploadHandler.bind(this)
    this.onClickUploadHandler2 = this.onClickUploadHandler2.bind(this)
    this.onClickUploadHandler3 = this.onClickUploadHandler3.bind(this)
    this.onClickUploadHandler4 = this.onClickUploadHandler4.bind(this)

    this.initalState = {
      'name': 'Glasses',
      'tagline': 'Glass of wine',
      'category': categories[0].value,
      'description': 'It is must to have the wine in a great quality of glass.',
      'details': 'Glass plays the main role while having the wine.',
      'price': 1000,
      'discount': 20,
      'showSuccessAddProductSnackbar2': false,
      'status': 'saved',
      'images': [{'imageId': '1', 'imageUri': ''}, {'imageId': '2', 'imageUri': ''}, {'imageId': '3', 'imageUri': ''}, {'imageId': '4', 'imageUri': ''}, {'imageId': '5', 'imageUri': ''}],
      'image1': 'image1Value',
      'image2': 'image2Value',
      'image3': 'image3Value',
      'image4': 'image4Value'

    }
    this.state = this.initalState
  }

  resetState () {
    this.setState(this.initalState)
  }

  handleSaveProduct () {
    let product = {
      '_id': this.state._id,
      'name': this.state.name,
      'tagline': this.state.tagline,
      'category': this.state.category,
      'description': this.state.description,
      'details': this.state.details,
      'price': this.state.price,
      'discount': this.state.discount,
      'status': 'saved',
      'images': this.state.images
    }
    console.log('product :::: ', product)
    this.props.actions.updateProductDetails(product)
  }

  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentWillMount () {
    this.props.actions.fetchSingleProductDetails(this.props.id)
  }

  componentWillReceiveProps (props) {
    console.log('Inside the componentWillReceiveProps')
    console.log('Props.singleProduct ::: ', props.singleProduct)

    if (props.singleProduct) {
      this.setState({
        _id: props.singleProduct._id,
        name: props.singleProduct.name,
        tagline: props.singleProduct.tagline,
        category: props.singleProduct.category,
        description: props.singleProduct.description,
        details: props.singleProduct.details,
        price: props.singleProduct.price,
        discount: props.singleProduct.discount,
        status: props.singleProduct.status,
        images: props.singleProduct.images,
        image1: apiHost.getApiHost() + '/' + props.singleProduct.images[0].imageUri,
        image2: apiHost.getApiHost() + '/' + props.singleProduct.images[1].imageUri,
        image3: apiHost.getApiHost() + '/' + props.singleProduct.images[2].imageUri,
        image4: apiHost.getApiHost() + '/' + props.singleProduct.images[3].imageUri
      })
    }

    if (props.saving === 'done') {
      this.setState({
        showSuccessAddProductSnackbar2: true
      })
      // this.resetState()
      // props.actions.resetSaveProductState()
    }
  }

  /*
  componentDidUpdate () {
    console.log('Inside the componentDidUpdate', this.props)
    if (this.props.saving === 'done') {
      this.setState({
        showSuccessAddProductSnackbar2: true
      })
      this.resetState()
      this.props.actions.resetSaveProductState()
    }
  }
*/

  handleClose () {
    this.setState({
      showSuccessAddProductSnackbar2: false
    })
  }

  handleFileContainerClick () {
    console.log('Clicked on file upload container')
    this.refs.fileUploader.click()
  }

  onChangeUploadHandler (event) {
    console.log('Coming inside the onChangeUploadHandler')
    var files = event.target.files
    this.setState({
      selectedFile: files,
      image1: URL.createObjectURL(files[0]),
      loaded: 0
    })
  }

  onClickUploadHandler () {
    console.log('Coming inside the onClickUploadHandler 1')

    if (this.state.selectedFile) {
      const data = new FormData()
      for (var x = 0; x < this.state.selectedFile.length; x++) {
        data.append('file', this.state.selectedFile[x])
      }
      this.props.actions.uploadImageForAProduct(this.state._id, 1, data)
    }
  }

  handleFileContainerClick2 () {
    console.log('Clicked on file upload container 2')
    this.refs.fileUploader2.click()
  }

  onChangeUploadHandler2 (event) {
    console.log('Coming inside the onChangeUploadHandler 2')
    var files = event.target.files
    this.setState({
      selectedFile2: files,
      image2: URL.createObjectURL(files[0]),
      loaded: 0
    })
  }

  onClickUploadHandler2 () {
    console.log('Coming inside the onClickUploadHandler 2')

    if (this.state.selectedFile2) {
      const data = new FormData()
      for (var x = 0; x < this.state.selectedFile2.length; x++) {
        data.append('file', this.state.selectedFile2[x])
      }
      this.props.actions.uploadImageForAProduct(this.state._id, 2, data)
    }
  }

  handleFileContainerClick3 () {
    console.log('Clicked on file upload container 3')
    this.refs.fileUploader3.click()
  }

  onChangeUploadHandler3 (event) {
    console.log('Coming inside the onChangeUploadHandler 3')
    var files = event.target.files
    this.setState({
      selectedFile3: files,
      image3: URL.createObjectURL(files[0]),
      loaded: 0
    })
  }

  onClickUploadHandler3 () {
    console.log('Coming inside the onClickUploadHandler 3')

    if (this.state.selectedFile3) {
      const data = new FormData()
      for (var x = 0; x < this.state.selectedFile3.length; x++) {
        data.append('file', this.state.selectedFile3[x])
      }
      this.props.actions.uploadImageForAProduct(this.state._id, 3, data)
    }
  }

  handleFileContainerClick4 () {
    console.log('Clicked on file upload container 4')
    this.refs.fileUploader4.click()
  }

  onChangeUploadHandler4 (event) {
    console.log('Coming inside the onChangeUploadHandler 4')
    var files = event.target.files
    this.setState({
      selectedFile4: files,
      image4: URL.createObjectURL(files[0]),
      loaded: 0
    })
  }

  onClickUploadHandler4 () {
    console.log('Coming inside the onClickUploadHandler 4')

    if (this.state.selectedFile4) {
      const data = new FormData()
      for (var x = 0; x < this.state.selectedFile4.length; x++) {
        data.append('file', this.state.selectedFile4[x])
      }
      this.props.actions.uploadImageForAProduct(this.state._id, 4, data)
    }
  }

  render () {
    const { classes } = this.props

    return (
      <div className={classes.root}>

        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={this.state.showSuccessAddProductSnackbar2}
          autoHideDuration={1000}
          onClose={this.handleClose}
        >
          <MySnackbarContent
            variant='success'
            message='Product has been added successfully!'
          />
        </Snackbar>

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
              <form className={classes.container} noValidate autoComplete='off'>
                <TextField
                  required
                  name='name'
                  id='product-name'
                  label='Product Name'
                  value={this.state.name}
                  className={classes.textField}
                  margin='normal'
                  variant='outlined'
                  onChange={this.handleChange}
                  fullWidth
                />

                <TextField
                  required
                  name='tagline'
                  id='product-tag-line'
                  label='Tag Line'
                  value={this.state.tagline}
                  className={classes.textField}
                  margin='normal'
                  variant='outlined'
                  fullWidth
                  onChange={this.handleChange}
                />

                <TextField
                  id='product-category'
                  name='category'
                  select
                  label='Select Category'
                  className={classes.textField}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  value={this.state.category}
                  margin='normal'
                  variant='outlined'
                  fullWidth
                  onChange={this.handleChange}
                >
                  {categories.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  id='product-description'
                  name='description'
                  label='Description'
                  multiline
                  rows='4'
                  value={this.state.description}
                  className={classes.textField}
                  margin='normal'
                  variant='outlined'
                  fullWidth
                  onChange={this.handleChange}
                />

                <TextField
                  id='product-details'
                  name='details'
                  label='Details'
                  multiline
                  rows='4'
                  value={this.state.details}
                  className={classes.textField}
                  margin='normal'
                  variant='outlined'
                  fullWidth
                  onChange={this.handleChange}
                />

                <TextField
                  required
                  id='outlined-required'
                  name='price'
                  label='Price'
                  value={this.state.price}
                  className={classes.textField}
                  margin='normal'
                  variant='outlined'
                  fullWidth
                  onChange={this.handleChange}
                />

                <TextField
                  required
                  id='outlined-required'
                  name='discount'
                  label='Discount(%)'
                  value={this.state.discount}
                  className={classes.textField}
                  margin='normal'
                  variant='outlined'
                  fullWidth
                  onChange={this.handleChange}
                />

              </form>
            </Grid>
            <Grid item xs={6}>

              <Grid container spacing={24}>

                <Grid item xs={6}>
                  <Card className={classes.uploadImageCard}>
                    <CardActionArea onClick={() => this.handleFileContainerClick()}>
                      <input type='file' id='file' ref='fileUploader' onChange={this.onChangeUploadHandler} style={{display: 'none'}} />
                      <CardMedia
                        className={classes.uploadImageMedia}
                        image={this.state.image1}
                        title='Contemplative Reptile'
                      />
                    </CardActionArea>
                    <CardActions className={classes.uplodButtonContainer}>
                      <Button size='small' color='inherit' onClick={this.onClickUploadHandler}>
                                Upload
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>

                <Grid item xs={6}>
                  <Card className={classes.uploadImageCard}>
                    <CardActionArea onClick={() => this.handleFileContainerClick2()}>
                      <input type='file' id='file2' ref='fileUploader2' onChange={this.onChangeUploadHandler2} style={{display: 'none'}} />
                      <CardMedia
                        className={classes.uploadImageMedia}
                        image={this.state.image2}
                        title='Contemplative Reptile'
                      />
                    </CardActionArea>
                    <CardActions className={classes.uplodButtonContainer}>
                      <Button size='small' color='inherit' onClick={this.onClickUploadHandler2}>
                                Upload
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>

                <Grid item xs={6}>
                  <Card className={classes.uploadImageCard}>
                    <CardActionArea onClick={() => this.handleFileContainerClick3()}>
                      <input type='file' id='file3' ref='fileUploader3' onChange={this.onChangeUploadHandler3} style={{display: 'none'}} />
                      <CardMedia
                        className={classes.uploadImageMedia}
                        image={this.state.image3}
                        title='Contemplative Reptile'
                      />
                    </CardActionArea>
                    <CardActions className={classes.uplodButtonContainer}>
                      <Button size='small' color='inherit' onClick={this.onClickUploadHandler3}>
                                Upload
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>

                <Grid item xs={6}>
                  <Card className={classes.uploadImageCard}>
                    <CardActionArea onClick={() => this.handleFileContainerClick4()}>
                      <input type='file' id='file4' ref='fileUploader4' onChange={this.onChangeUploadHandler4} style={{display: 'none'}} />
                      <CardMedia
                        className={classes.uploadImageMedia}
                        image={this.state.image4}
                        title='Contemplative Reptile'
                      />
                    </CardActionArea>
                    <CardActions className={classes.uplodButtonContainer}>
                      <Button size='small' color='inherit' onClick={this.onClickUploadHandler4}>
                                Upload
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>

              </Grid>
            </Grid>
          </Grid>
        </main>
        <Fab color='primary' aria-label='Add' className={classes.fab} onClick={() => this.handleSaveProduct()}>
          <SaveRounded />
        </Fab>
      </div>
    )
  }
}

AddNewProduct.propTypes = {
  classes: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    saving: state.productReducer.saving,
    adding: state.productReducer.adding,
    singleProduct: state.productReducer.singleProduct
  }
}

function mapDispatchToProps (dispatch) {
  return { actions: bindActionCreators(productActions, dispatch) }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(withRouter(AddNewProduct))
