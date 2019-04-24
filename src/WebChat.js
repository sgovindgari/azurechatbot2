import memoize from 'memoize-one';
import React from 'react';
import ReactWebChat, { createDirectLine, createStyleSet } from 'botframework-webchat';

import './WebChat.css';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.createDirectLine = memoize(token => createDirectLine({ token: 'yBAq-XoF_kE.9YRJe2wxjboovSX74EBD5RtbRv5wdmvmw-UhkGVBwFI' }));

    this.state = {
      styleSet: createStyleSet({
        backgroundColor: 'white',
        bubbleBackground: 'rgba(0, 0, 255, .1)',
        bubbleFromUserBackground: 'rgba(0, 255, 0, .1)',
        botAvatarImage: 'https://www.councilofnonprofits.org/favicon.ico',
        botAvatarInitials: 'NP',
      })
    };
  }

  componentDidMount() {
    !this.props.token && this.props.onFetchToken();
  }

  render() {
    const {
      props: { className, store, token },
      state: { styleSet }
    } = this;

    return (
      token ?
        <ReactWebChat
          className={ `${ className || '' } web-chat` }
          directLine={ this.createDirectLine(token) }
          store={ store }
          styleSet={ styleSet }
        />
      :
        <div className={ `${ className || '' } connect-spinner` }>
          <div className="content">
            <div className="icon">
              <span className="ms-Icon ms-Icon--Robot" />
            </div>
            <p>Please wait while we are connecting.</p>
          </div>
        </div>
    );
  }
}