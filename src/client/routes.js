import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { browserHistory } from 'react-router'
import Products from './components/products/Products.jsx'
import AddNewProduct from './components/addNewProduct/AddNewProduct.jsx'
import GeneratePdf from './components/generatePdf/GeneratePdf.jsx'

class Routes extends Component {
  render () {
    return (
      <Router history={browserHistory}>
        <Switch>
          <Route path='/products' component={() => (<Products />)} />
          <Route path='/product/:id' component={(props) => (<AddNewProduct id={props.match.params.id} />)} />
          <Route path='/generatepdf' component={() => (<GeneratePdf />)} />
          <Redirect to={{pathname: '/products'}} />
        </Switch>
      </Router>
    )
  }
}

export default Routes
