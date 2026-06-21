import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import Proyectos from './Proyectos'
import Footer from '../components/Footer'
import Proyecto from '../components/Proyecto'

export default class Home extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Proyectos />
        <Proyecto />
        <Footer />
      </>
    )
  }
}


