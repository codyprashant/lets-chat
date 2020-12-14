import React from 'react';
import { Input, InputGroupAddon, InputGroup, Media, Button, UncontrolledTooltip } from "reactstrap";
import {  Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label,  Collapse, CardHeader, CardBody, Alert,  Card } from 'reactstrap';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SimpleBar from "simplebar-react";
import { setconversationNameInOpenChat, activeUser } from "../../../redux/actions"
import { initFirebaseBackend } from "../../../helpers/firebase";

// import OnlineUsers from "./OnlineUsers";

class Chats extends React.Component {
    state = { 
        searchChat : "",
        modal : false,
        isOpenCollapse : false, 
        newChatUserEmail: "",
        newChatUserMessage: "",
        isOpenAlert: false,
        errormessage:"",
        chatexistsId: ""

    }

    componentDidMount() {
        var li = document.getElementById("conversation" + this.props.active_user);
        // var li = document.getElementById("conversation0");
        if(li){
            li.classList.add("active");
        }
    }

    handleChange(e)  {
        console.log(e.target)
        // this.setState({ searchChat : e.target.value });
        // var search = e.target.value;
        // let conversation = this.state.recentChatList;
        // let filteredArray = [];
        
        // //find conversation name from array
        // for (let i = 0; i < conversation.length; i++) {
        //     if(conversation[i].name.toLowerCase().includes(search) || conversation[i].name.toUpperCase().includes(search))
        //         filteredArray.push(conversation[i]);
        // }

        // //set filtered items to state
        // this.setState({ recentChatList : filteredArray })

        // //if input value is blanck then assign whole recent chatlist to array
        // if(search === "") this.setState({ recentChatList : this.props.recentChatList })
    }

    toggle() {
        console.log(this.state)
        this.setState({ modal : !this.state.modal });
    }

    toggleCollapse() {
        this.setState({ isOpenCollapse : !this.state.isOpenCollapse });
    }

    openUserChat(e,chat) {
        e.preventDefault();
        //find index of current chat in array
        var index = this.props.chats.indexOf(chat);
        this.props.activeUser(index);
        var chatList = document.getElementById("chat-list");
        var clickedItem = e.target;
        var currentli = null;

        if(chatList) {
            var li = chatList.getElementsByTagName("li");
            //remove coversation user
            for(var i=0; i<li.length; ++i){
                if(li[i].classList.contains('active')){
                    li[i].classList.remove('active');
                }
            }
            //find clicked conversation user
            for(var k=0; k<li.length; ++k){
                if(li[k].contains(clickedItem)) {
                    currentli = li[k];
                    break;
                } 
            }
        }

        //activation of clicked coversation user
        if(currentli) {
            currentli.classList.add('active');
        }

        var userChat = document.getElementsByClassName("user-chat");
        if(userChat) {
            userChat[0].classList.add("user-chat-show");
        }

        //removes unread badge if user clicks
        var unread = document.getElementById("unRead" + chat.id);
        if(unread) {
            unread.style.display="none";
        }
    }
    async userExists() {
        const userSnapshot = await initFirebaseBackend().firestore().collection("users").get();
        try {
          const exists = userSnapshot.docs.map((docs) => docs.data().email).includes(this.state.newChatUserEmail);
          return exists;
        } catch (e) {
          console.log(e);
          return false;
        }
      };

      async chatExists () {
        const docid = [this.state.newChatUserEmail, this.props.userEmail].sort().join(":");
        const chat = await initFirebaseBackend().firestore().collection("chats").doc(docid).get();
        return chat.exists;
      };

    goToChat = async () => {
        alert("Chat Is Already Exists");
    };

    async createNewChat(){
        const userExists = await this.userExists();
        const { newChatUserEmail, newChatUserMessage } = this.state;
        const { userEmail } = this.props;

        if (newChatUserEmail && newChatUserMessage && newChatUserEmail !== userEmail) {
            if (userExists) {
              const chatExists = await this.chatExists();
              try {
                  if(chatExists){
                    this.goToChat() 
                  } else{
                    this.createChat(userEmail, newChatUserEmail, newChatUserMessage);
                    this.setState({ modal : !this.state.modal });
                  }
              } catch (e) {
                console.log(e);
              }
            } else {
              this.setState({errormessage: "User Is not registered",isOpenAlert : true })
            }
          } else {
            this.setState({errormessage: "Please Enter Valid Data",isOpenAlert : true })
          }
    }

    async createChat(userEmail, email, msg)  {
        const docId = [this.state.newChatUserEmail, this.props.userEmail].sort().join(":");
        const timeStamp = Date.now();
        const time = Date.now();

        console.log({
            docid: docId,
            time: timeStamp,
            users: [userEmail, email],
            typing: [],
            messages: [
              {
                message: msg,
                sender: userEmail,
                time: time,
                type: "text",
              },
            ],
          })
        await initFirebaseBackend().firestore().collection("chats").doc(docId).set({
            docid: docId,
            time: timeStamp,
            users: [userEmail, email],
            typing: [],
            messages: [
              {
                message: msg,
                sender: userEmail,
                time: time,
                type: "text",
              },
            ],
          });
      };

    render() {
        return (
            <React.Fragment>
                        <div>
                            <div className="px-4 pt-4">
                            <div className="user-chat-nav float-right">
                                    <div  id="create-group">
                                        {/* Button trigger modal */}
                                        <Button onClick={() => this.setState({ modal : !this.state.modal })} type="button" color="link" className="text-decoration-none text-muted font-size-18 py-0">
                                            <i className="ri-group-line mr-1"></i>
                                        </Button>
                                    </div>
                                    <UncontrolledTooltip target="create-group" placement="bottom">
                                        New Chat
                                    </UncontrolledTooltip>
                                </div>

                                <Modal isOpen={this.state.modal} centered toggle={() => this.setState({ modal : !this.state.modal })}>
                                    <ModalHeader tag="h5" className="modal-title font-size-16" toggle={() => this.setState({ modal : !this.state.modal })}>{('Start New Chat')}</ModalHeader>
                                    <ModalBody className="p-4">
                                        <Form>
                                            <FormGroup className="mb-4">
                                                 <Alert isOpen={this.state.isOpenAlert} color="danger">
                                                    {this.state.errormessage}
                                                </Alert>
                                                <Label htmlFor="newchatemail-input">{('User Email Id')}</Label>
                                                <Input type="text" className="form-control" id="newchatemail-input" value={this.state.newChatUserEmail} onChange={(e) => this.setState({newChatUserEmail:e.target.value})} placeholder="Enter User Email ID" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label htmlFor="newChatmessage-input">{('Message')}</Label>
                                                <Input type="text" className="form-control" id="newChatmessage-input" value={this.state.newChatUserMessage} onChange={(e) => this.setState({newChatUserMessage:e.target.value})} placeholder="Enter Message" />
                                            </FormGroup>
                                        </Form>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button type="button" color="link" onClick={() => this.setState({ modal : !this.state.modal })}>{('Close')}</Button>
                                        <Button type="button" color="primary" onClick={this.createNewChat.bind(this)}>{('Start Chatting')}</Button>
                                    </ModalFooter>
                                </Modal>






                                <h4 className="mb-4">Chats</h4>
                                <div className="search-box chat-search-box">
                                    <InputGroup size="lg" className="mb-3 bg-light rounded-lg">
                                        <InputGroupAddon addonType="prepend">
                                            <Button color="link" className="text-muted pr-1 text-decoration-none" type="button">
                                                <i className="ri-search-line search-icon font-size-18"></i>
                                            </Button>
                                        </InputGroupAddon>
                                        <Input type="text" value={this.state.searchChat} onChange={(e) => this.handleChange(e)} className="form-control bg-light" placeholder="Search messages or users" />
                                    </InputGroup> 
                                </div>
                                {/* Search Box */}
                            </div> 

                            {/* Start chat-message-list  */}
                            <div className="px-2">
                                <h5 className="mb-3 px-3 font-size-16">Recent</h5>
                                <SimpleBar style={{ maxHeight: "100%" }} className="chat-message-list">
                                    <ul className="list-unstyled chat-list chat-user-list" id="chat-list">
                                        {this.props.chats.length > 0 ?
                                            this.props.chats.map((chat, key) =>
                                                <li key={key} id={"conversation" + key} 
                                                className={
                                                    // chat.unRead ? "unread" : chat.isTyping ?  "typing" : 
                                                     key === this.props.active_user ? "active" : ""}
                                                >
                                                    <Link to="#" onClick={(e) => this.openUserChat(e, chat)}>
                                                        <Media>
                                                            {
                                                                // chat.profilePicture === "Null" ?
                                                                //     <div className={"chat-user-img " + chat.status +" align-self-center mr-3"}>
                                                                //         <div className="avatar-xs">
                                                                //             <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                                //                 {chat.name.charAt(0)}
                                                                //             </span>
                                                                //         </div>
                                                                //         {
                                                                //             chat.status &&  <span className="user-status"></span>
                                                                //         }
                                                                //     </div>
                                                                // :
                                                                    <div className={"chat-user-img " + chat.status +" align-self-center mr-3"}>
                                                                        <img src={this.props.allUserData.map((list) => {
                                                                                    if ( list.email ===(chat.users[0] !== this.props.userEmail ? chat.users[0] : chat.users[1])) {
                                                                                        return list.image;
                                                                                    } else {  return ""; }
                                                                                }).join("").trim("")} className="rounded-circle avatar-xs" alt="letschat" />
                                                                        {
                                                                            chat.status &&  <span className="user-status"></span>
                                                                        }
                                                                    </div>
                                                            }
                                                            
                                                            <Media body className="overflow-hidden">
                                                                <h5 className="text-truncate font-size-15 mb-1">
                                                                    {this.props.allUserData.map((list) => {
                                                                        if (list.email === (chat.users[0] !== this.props.userEmail ? chat.users[0] : chat.users[1])) {
                                                                            return list.name;
                                                                        }
                                                                        else{
                                                                            return ""
                                                                        }
                                                                    })}
                                                                </h5>
                                                                <p className="chat-user-message text-truncate mb-0">
                                                                    {
                                                                        ((chat.typing).length > 0 && (chat.typing).includes(this.props.userEmail)) ?
                                                                        <>
                                                                            typing<span className="animate-typing">
                                                                            <span className="dot ml-1"></span>
                                                                            <span className="dot ml-1"></span>
                                                                            <span className="dot ml-1"></span>
                                                                        </span>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            {/* {
                                                                                chat.messages && (chat.messages.length > 0 && chat.messages[(chat.messages).length - 1].isImageMessage === true) ? <i className="ri-image-fill align-middle mr-1"></i> : null
                                                                            }
                                                                            {
                                                                                chat.messages && (chat.messages.length > 0  && chat.messages[(chat.messages).length - 1].isFileMessage === true) ? <i className="ri-file-text-fill align-middle mr-1"></i> : null
                                                                            } */}
                                                                            {chat.messages && chat.messages.length > 0 ?  chat.messages[(chat.messages).length - 1].message : null}
                                                                       </>
                                                                    }

                                                    
                                                                    
                                                                </p>
                                                            </Media>
                                                            {/* {console.log(chat.messages[(chat.messages).length - 1].time.seconds)} */}
                                                            <div className="font-size-11">{chat.messages && chat.messages.length > 0 ?  (chat.messages[(chat.messages).length - 1].time.seconds) : null}</div>
                                                            {/* {chat.unRead === 0 ? null :
                                                                <div className="unread-message" id={"unRead" + chat.id}>
                                                                    <span className="badge badge-soft-danger badge-pill">{chat.messages && chat.messages.length > 0 ? chat.unRead >= 20 ? chat.unRead + "+" : chat.unRead  : ""}</span>
                                                                </div>
                                                            }  */}
                                                        </Media>
                                                    </Link>
                                                </li>
                                            ) : "No Chats Available"
                                        }
                                    </ul>
                                    </SimpleBar>
                                    
                            </div>
                        </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { active_user } = state.Chat;
    return { active_user };
};

export default connect(mapStateToProps, { setconversationNameInOpenChat, activeUser })(Chats);
// export default Chats;