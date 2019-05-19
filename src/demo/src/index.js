import React, {Component} from 'react'
import messageHistory from './messageHistory';
import Header from './Header';
import Footer from './Footer';
import monsterImgUrl from "./../assets/WebPage.jpeg";
import './../assets/styles';
import MinimizableWebChat from '../../MinimizableWebChat';


class Demo extends Component {

    constructor() {
        super();
        this.state = {
            messageList: messageHistory,
            newMessagesCount: 0,
            isOpen: false
        };
    }

    _onMessageWasSent(message) {
        this.setState({
            messageList: [...this.state.messageList, message]
        })
    }

    _onFilesSelected(fileList) {
        const objectURL = window.URL.createObjectURL(fileList[0]);
        this.setState({
            messageList: [...this.state.messageList, {
                type: 'file', author: "me",
                data: {
                    url: objectURL,
                    fileName: fileList[0].name
                }
            }]
        })
    }

    _sendMessage(text) {
        if (text.length > 0) {
            const newMessagesCount = this.state.isOpen ? this.state.newMessagesCount : this.state.newMessagesCount + 1
            this.setState({
                newMessagesCount: newMessagesCount,
                messageList: [...this.state.messageList, {
                    author: 'them',
                    type: 'text',
                    data: { text }
                }]
            })
        }
    }

    _handleClick() {
        this.setState({
            isOpen: !this.state.isOpen,
            newMessagesCount: 0
        })
    }

    render() {
        return <div>
            <Header />
            {/*<Launcher*/}
                {/*agentProfile={{*/}
                    {/*teamName: 'Welcome Bot',*/}
                    {/*imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'*/}
                {/*}}*/}
                {/*onMessageWasSent={this._onMessageWasSent.bind(this)}*/}
                {/*onFilesSelected={this._onFilesSelected.bind(this)}*/}
                {/*messageList={this.state.messageList}*/}
                {/*newMessagesCount={this.state.newMessagesCount}*/}
                {/*handleClick={this._handleClick.bind(this)}*/}
                {/*isOpen={this.state.isOpen}*/}
                {/*showEmoji*/}
            {/*/>*/}
            <MinimizableWebChat/>
            <a href="https://j1visa.state.gov" target="_blank">
                <img className="demo-monster-img" src={monsterImgUrl} />
            </a>
            <Footer />
        </div>
    }
}

// render(<Demo/>, document.querySelector('#demo'))
export default Demo;