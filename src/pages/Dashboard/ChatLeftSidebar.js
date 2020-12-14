import React from 'react';
import { connect } from "react-redux";

import { TabContent, TabPane } from "reactstrap";

// import Profile from "./Tabs/Profile";
// import Groups from "./Tabs/Groups";
// import Contacts from "./Tabs/Contacts";
// import Settings from "./Tabs/Settings";
import Chats from "./Tabs/Chats";

function ChatLeftSidebar(props) {

    const activeTab = props.activeTab;
    return (
        <React.Fragment>
            <div className="chat-leftsidebar mr-lg-1">

                <TabContent activeTab={activeTab}>
                    {/* <TabPane tabId="profile" id="pills-user">
                        <Profile />
                    </TabPane> */}

                    <TabPane tabId="chat" id="pills-chat">
                        <Chats      
                            history={props.history}
                            chats={props.chats}
                            userEmail={props.userEmail}
                            allUserData={props.allUserData}
                        />
                    </TabPane>

                    {/* <TabPane tabId="group" id="pills-groups">
                        <Groups />
                    </TabPane>

                    <TabPane tabId="contacts" id="pills-contacts">
                        <Contacts />
                    </TabPane>

                    <TabPane tabId="settings" id="pills-setting">
                        <Settings />
                    </TabPane> */}
                </TabContent>

                </div>
        </React.Fragment>
    );
}

const mapStatetoProps = state => {
    return {
      ...state.Layout
    };
};

export default connect(mapStatetoProps, null)(ChatLeftSidebar);