import React, { Component } from 'react'

class Header extends Component {
  render () {
    return (
      <div className="demo-header">
        <div className="demo-header--title"><a href="/">IPOLARITY QnA Bot Demo</a></div>
        <div className="demo-header--links">
          <a href="https://bit.ly/qnabotdoc">Usage</a>
        </div>
      </div>
    )
  }
}

export default Header
