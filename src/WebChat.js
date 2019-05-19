import memoize from 'memoize-one';
import React from 'react';
import ReactWebChat, { createDirectLine, createStyleSet } from 'botframework-webchat';
import Header from './chat/components/Header'

// import './WebChat.css';
import './chat/styles/index';


export default class extends React.Component {
    constructor(props) {
        super(props);

        this.createDirectLine = memoize(token => createDirectLine({ token: 'yBAq-XoF_kE.9YRJe2wxjboovSX74EBD5RtbRv5wdmvmw-UhkGVBwFI' }));

        this.state = {
            styleSet: createStyleSet({
                backgroundColor: 'Transparent',
                bubbleBackground: 'rgba(77, 140, 254, .1)',
                botAvatarInitials: 'WB',
            })
        };
    }

    componentDidMount() {
        !this.props.token && this.props.onFetchToken();
    }

    render() {
        const {
            props: { className, store, token, isOpen, onClose },
            state: { styleSet }
        } = this;

        let classList = [
            "sc-chat-window",
            (isOpen ? "opened" : "closed")
        ];

        return (
            <div>
                {token ?
                    <div className={`${ classList.join(' ') || '' } web-chat`}>
                        <Header
                            teamName='Welcome Bot'
                            imageUrl='https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                        ></Header>
                        <ReactWebChat
                            directLine={this.createDirectLine(token)}
                            store={store}
                            styleSet={styleSet}
                        />
                    </div>
                    :
                    <div className={`${ classList.join(' ') || '' } connect-spinner`}>
                        <div className="content">
                            <div className="icon">
                                <span className="ms-Icon ms-Icon--Robot"/>
                            </div>
                            <p>Please wait while we are connecting.</p>
                        </div>
                    </div>
                }
            </div>
        );
    }
}
