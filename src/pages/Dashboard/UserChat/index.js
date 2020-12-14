import React, { useState,useEffect, useRef } from 'react';
import { connect } from "react-redux";
import SimpleBar from "simplebar-react";
import { withRouter } from 'react-router-dom';
import UserProfileSidebar from "../../../components/UserProfileSidebar";
import UserHead from "./UserHead";
import ChatInput from "./ChatInput";
import { openUserSidebar,setFullUser } from "../../../redux/actions";
import { initFirebaseBackend } from "../../../helpers/firebase";

function UserChat(props) {
    const ref = useRef();
    // const [ allUsers ] = useState(props.chats);
    const [ chatMessages, setchatMessages ] = useState([]);

    useEffect(() => {
        if(props.chats.length > 0) setchatMessages(props.chats[props.active_user].messages);
        ref.current.recalculate();
        if (ref.current.el) {
            ref.current.getScrollElement().scrollTop = ref.current.getScrollElement().scrollHeight;
        }
    },[props.active_user, props.chats]);

    const addMessage = async (message, type) => {
        const { docid } = props.chats[props.active_user];
        const { userEmail } = props;
        const time = Date.now()
        console.log(time)
        const timestamp = Date.now();
        if(message && message !== '')
        await initFirebaseBackend().firestore().collection("chats").doc(docid).update({
            messages: initFirebaseBackend().f().firestore.FieldValue.arrayUnion({
            sender: userEmail,
            message: message,
            time: time,
            type: "text",
          }),
          time: timestamp,
        });
        scrolltoBottom();
    }

    function scrolltoBottom(){
        if (ref.current.el) {
            ref.current.getScrollElement().scrollTop = ref.current.getScrollElement().scrollHeight;
        }
    }

    function isToday(someDate){
        // const today = new Date()
        // return someDate.getDate() === today.getDate() &&
        //   someDate.getMonth() === today.getMonth() &&
        //   someDate.getFullYear() === today.getFullYear()
        return false;
      }

    return (
        <React.Fragment>
            <div className="user-chat w-100">
                <div className="d-lg-flex">
                    <div className={ props.userSidebar ? "w-70" : "w-100" }>
                        {/* render user head */}
                        <UserHead chats = {props.chats} allUserData={props.allUserData} userEmail = {props.userEmail} /> 

                            <SimpleBar style={{ maxHeight: "100%" }} ref={ref} className="chat-conversation p-3 p-lg-4" id="messages">
                                   <ul className="list-unstyled mb-0">
                                    {(chatMessages.length > 0) ?
                                    chatMessages.map((chat, key) => 
                                        isToday(chat.time.seconds) === true ? <li key={"dayTitle" + key}> 
                                            <div className="chat-day-title">
                                                <span className="title">Today</span>
                                            </div>
                                        </li> : 
                                            <li key={key} className={chat.sender === props.userEmail ? "right" : ""}>
                                                <div className="conversation-list">
                                                        {
                                                            //logic for display user name and profile only once, if current and last messaged sent by same receiver
                                                            chatMessages[key+1] ? chatMessages[key].sender === chatMessages[key+1].sender ? 
                                                            
                                                            <div className="chat-avatar">
                                                                <div className="blank-div"></div>
                                                            </div>
                                                            :  
                                                                <div className="chat-avatar">
                                                                    {chat.sender === props.userEmail ?   <img src={(props.allUserData.find(item => item.email === props.userEmail)).image} alt="letsChat" /> : 
                                                                        (props.allUserData.find(item => item.email === (props.chats[props.active_user].users.find(item => item !== props.userEmail)))).image === "Null" ?
                                                                            <div className="chat-user-img align-self-center mr-3">
                                                                                <div className="avatar-xs">
                                                                                    <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                                                        {(props.allUserData.find(item => item.email === (props.chats[props.active_user].users.find(item => item !== props.userEmail)))).name.charAt(0)}
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        :  <img src={(props.allUserData.find(item => item.email === (props.chats[props.active_user].users.find(item => item !== props.userEmail)))).image} alt="letsChat" />
                                                                    }
                                                                </div>
                                                            :   <div className="chat-avatar">
                                                                     {chat.sender === props.userEmail ?   <img src={(props.allUserData.find(item => item.email === props.userEmail)).image} alt="letsChat" /> : 
                                                                         (props.allUserData.find(item => item.email === (props.chats[props.active_user].users.find(item => item !== props.userEmail)))).image === "Null" ?
                                                                            <div className="chat-user-img align-self-center mr-3">
                                                                                <div className="avatar-xs">
                                                                                    <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                                                        {(props.allUserData.find(item => item.email === (props.chats[props.active_user].users.find(item => item !== props.userEmail)))).name.charAt(0)}
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        :  <img src={(props.allUserData.find(item => item.email === (props.chats[props.active_user].users.find(item => item !== props.userEmail)))).image} alt="letsChat" />
                                                                    }
                                                                </div>
                                                        }
                                                    
                
                                                    <div className="user-chat-content">
                                                        <div className="ctext-wrap">
                                                            <div className="ctext-wrap-content">
                                                                {
                                                                    chat.message &&
                                                                        <p className="mb-0">
                                                                            {chat.message}
                                                                        </p>
                                                                }
                                                                {/* {
                                                                    chat.imageMessage &&
                                                                        <ImageList images={chat.imageMessage} />
                                                                }
                                                                {
                                                                    chat.fileMessage &&
                                                                        <FileList fileName={chat.fileMessage} fileSize={chat.size} />
                                                                } */}
                                                                {
                                                                    ((props.chats[props.active_user].typing).length > 0 && (props.chats[props.active_user].typing).includes(this.props.userEmail)) ? 
                                                                        <p className="mb-0">
                                                                            typing
                                                                            <span className="animate-typing">
                                                                                <span className="dot ml-1"></span>
                                                                                <span className="dot ml-1"></span>
                                                                                <span className="dot ml-1"></span>
                                                                            </span>
                                                                        </p>
                                                                :
                                                                    <p className="chat-time mb-0"> <span className="align-middle">{chat.time.seconds}  <i className="ri-check-double-fill"></i> </span></p>
                                                                }
                                                            </div>
                                                                    
                                                        </div>
                                                        {
                                                            chatMessages[key+1] ? chatMessages[key].sender === chatMessages[key+1].sender ? null :  
                                                            <div className="conversation-name">
                                                                {chat.sender === props.userEmail ? (props.allUserData.find(item => item.email === props.userEmail)).name
                                                                : (props.allUserData.find(item => item.email === (props.chats[props.active_user].users.find(item => item !== props.userEmail)))).name}</div> 
                                                                : <div className="conversation-name">
                                                                    {chat.userType === "sender" ? "Admin" 
                                                                    : (props.allUserData.find(item => item.email === (props.chats[props.active_user].users.find(item => item !== props.userEmail)))).name}
                                                                </div>
                                                        }
                                                   </div>
                                                </div>
                                            </li>
                                    ) : "No Messages"
                                }
                                 </ul>
                                </SimpleBar>   
                        <ChatInput onaddMessage={addMessage} />
                    </div>
                    <UserProfileSidebar activeUser={(props.allUserData.find(item => item.email === (props.chats[props.active_user].users.find(item => item !== props.userEmail))))} />

                </div>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    const { active_user } = state.Chat;
    const { userSidebar } = state.Layout;
    return { active_user,userSidebar };
};

export default withRouter(connect(mapStateToProps, { openUserSidebar,setFullUser })(UserChat));

