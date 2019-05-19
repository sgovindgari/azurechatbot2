import React, { Component } from 'react'

class Footer extends Component {
  render () {
    return (
      <div className="demo-footer">
        <div>
          <div>Copyright {new Date().getFullYear()}. IPolarity LLC</div>
          <div>All rights reserved</div>
        </div>
        <div>
          <div>Made with React JS and Azure Bot Services</div>
        </div>
      </div>
    )
  }
}

export default Footer
