import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

var apiHost = require('./../../data/api/ApiConfig')

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  discountcontainer: {
    color: '#ff905a'
  }
}

function SingleProduct (props) {
  const { classes } = props
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.product.images ? `${apiHost.getApiHost()}/${props.product.images[0].imageUri}` : 'imagePreview'}
          title='Contemplative Reptile'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {props.product.name}
          </Typography>
          <Typography component='p'>
            {props.product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Typography gutterBottom variant='h6' component='h5'>
          {'Rs. ' + props.product.price}
        </Typography>
        <Typography gutterBottom variant='h6' component='h5' className={classes.discountcontainer}>
          {'(' + props.product.discount + '% OFF)'}
        </Typography>
      </CardActions>
    </Card>
  )
}

SingleProduct.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SingleProduct)
