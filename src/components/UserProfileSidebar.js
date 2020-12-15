import React, { useState } from 'react';
import { connect } from "react-redux";
import { Button, Card} from "reactstrap";
import SimpleBar from "simplebar-react";

import CustomCollapse from "./CustomCollapse";
import { closeUserSidebar } from "../redux/actions";


function UserProfileSidebar(props) {
    const [isOpen1, setIsOpen1] = useState(true);

    const toggleCollapse1 = () => {
        setIsOpen1(!isOpen1);
    };

    // closes sidebar
    const closeuserSidebar=()=> {
        props.closeUserSidebar();
    }
    return (
        <React.Fragment>
           <div style={{display: (props.userSidebar === true)  ? "block" : "none"}} className="user-profile-sidebar">
                        <div className="px-3 px-lg-4 pt-3 pt-lg-4">
                            <div className="user-chat-nav text-right">
                                <Button color="none" type="button" onClick={closeuserSidebar} className="nav-btn" id="user-profile-hide">
                                    <i className="ri-close-line"></i>
                                </Button>
                            </div>
                        </div>

                        <div className="text-center p-4 border-bottom">

                            <div className="mb-4 d-flex justify-content-center">
                                {
                                    props.activeUser.image ==="Null" ?
                                        <div className="avatar-lg">
                                            <span className="avatar-title rounded-circle bg-soft-primary text-primary font-size-24">
                                                {props.activeUser.name.charAt(0)}
                                            </span>
                                        </div>
                                    : <img src={props.activeUser.image} className="rounded-circle avatar-lg img-thumbnail" alt="letschat" />
                                }
                                
                            </div>

                            <h5 className="font-size-16 mb-1 text-truncate">{props.activeUser.name}</h5>
                            <p className="text-muted text-truncate mb-1">
                            {
                                props.activeUser ? <> <i className="ri-record-circle-fill font-size-10 text-success mr-1"></i> </>
                                                :  <> <i className="ri-record-circle-fill font-size-10 text-secondary mr-1"></i></>
                            }
                                Active</p>
                        </div>
   
                        <SimpleBar style={{ maxHeight: "100%" }} className="p-4 user-profile-desc">
                            <div className="text-muted">
                                <p className="mb-4">"{('If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual.')}"</p>
                            </div>

                            <div id="profile-user-accordion" className="custom-accordion">
                                <Card className="shadow-none border mb-2">
                                    {/* import collaps */}
                                        <CustomCollapse
                                            title = "About"
                                            iconClass = "ri-user-2-line"
                                            isOpen={isOpen1}
                                            toggleCollapse={toggleCollapse1}
                                        >

                                            <div>
                                                <p className="text-muted mb-1">{('Name')}</p>
                                                <h5 className="font-size-14">{props.activeUser.name}</h5>
                                            </div>

                                            <div className="mt-4">
                                                <p className="text-muted mb-1">{('Email')}</p>
                                                <h5 className="font-size-14">{props.activeUser.email}</h5>
                                            </div>

                                            <div className="mt-4">
                                                <p className="text-muted mb-1">{('Description')}</p>
                                                <h5 className="font-size-14">{props.activeUser.description}</h5>
                                            </div>

                                            <div className="mt-4">
                                                <p className="text-muted mb-1">{('Location')}</p>
                                                <h5 className="font-size-14 mb-0">{props.activeUser.location}</h5>
                                            </div>
                                        </CustomCollapse>
                                </Card>
               
                            </div>
                        </SimpleBar>
                        </div>
                
         
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    const { active_user } = state.Chat;
    const { userSidebar } = state.Layout;
    return { active_user,userSidebar };
};

export default connect(mapStateToProps, { closeUserSidebar })(UserProfileSidebar);