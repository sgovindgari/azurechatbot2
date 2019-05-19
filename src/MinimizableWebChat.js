import React from 'react';
import { createStore, createStyleSet } from 'botframework-webchat';

import WebChat from './WebChat';
import launcherIcon from './chat/assets/logo-no-bg.svg';
import launcherIconActive from './chat/assets/close-icon.png';


import './fabric-icons-inline.css';
import './MinimizableWebChat.css';
import './chat/styles/launcher.css';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.handleFetchToken = this.handleFetchToken.bind(this);

        const store = createStore({}, ({ dispatch }) => next => action => {
            if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
                setTimeout(() => {
                    dispatch({
                        type: 'WEB_CHAT/SEND_EVENT',
                        payload: {
                            name: 'webchat/join',
                            value: {
                                language: window.navigator.language
                            }
                        }
                    });
                }, 1000);
            } else if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
                if (action.payload.activity.from.role === 'bot') {
                    this.setState(() => ({ newMessage: true }));
                }
            }

            return next(action);
        });

        this.state = {
            minimized: true,
            newMessage: false,
            side: 'right',
            store,
            styleSet: createStyleSet({
                backgroundColor: 'Transparent'
            }),
            token: null,
            launcherIcon,
            isOpen: false
        };
    }

    async handleFetchToken() {
        if (!this.state.token) {
            //const res = await fetch('https://webchat-mockbot.azurewebsites.net/directline/token', { method: 'POST' });
            const token = 'yBAq-XoF_kE.9YRJe2wxjboovSX74EBD5RtbRv5wdmvmw-UhkGVBwFI';

            this.setState(() => ({ token }));
        }
    }

    handleClick() {
        if (this.props.handleClick !== undefined) {
            this.props.handleClick();
        } else {
            this.setState({
                isOpen: !this.state.isOpen,
            });
        }
    }

    render() {
        const { state: {
            minimized,
            newMessage,
            side,
            store,
            styleSet,
            token
        } } = this;

        const isOpen = this.props.hasOwnProperty('isOpen') ? this.props.isOpen : this.state.isOpen;
        const classList = [
            'sc-launcher',
            (isOpen ? 'opened' : ''),
        ];

        return (

            <div className="sc-launcher">
                <div className={classList.join(' ')} onClick={this.handleClick.bind(this)}>
                    <img className={"sc-open-icon"} src={launcherIconActive} />
                    <img className={"sc-closed-icon"} src={launcherIcon} />
                </div>

                <WebChat
                    isOpen={isOpen}
                    className="react-web-chat"
                    onFetchToken={ this.handleFetchToken }
                    store={ store }
                    styleSet={ styleSet }
                    token={ token }
                />
            </div>

        );
    }
}
