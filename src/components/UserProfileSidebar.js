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

    // const toggleCollapse2 = () => {
    //     setIsOpen2(!isOpen2);
    //     setIsOpen1(false);
    //     setIsOpen3(false);
    // };

    // const toggleCollapse3 = () => {
    //     setIsOpen3(!isOpen3);
    //     setIsOpen1(false);
    //     setIsOpen2(false);
    // };

    // closes sidebar
    const closeuserSidebar=()=> {
        props.closeUserSidebar();
    }
    // style={{display: props.userSidebar  ? "block" : "none"}}
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
                                {/* End About card */}

                                {/* <Card className="mb-1 shadow-none border">
                                        <CustomCollapse
                                            title = "Attached Files"
                                            iconClass = "ri-attachment-line"
                                            isOpen={isOpen2}
                                            toggleCollapse={toggleCollapse2}
                                        >
                                            <AttachedFiles files={files} />
                                        </CustomCollapse>
                                </Card> */}

                                {/* {
                                    props.activeUser.isGroup === true &&
                                    <Card className="mb-1 shadow-none border">
                                        <CustomCollapse
                                                title = "Members"
                                                iconClass = "ri-group-line"
                                                isOpen={isOpen3}
                                                toggleCollapse={toggleCollapse3}
                                            >
                                                        <Card className="p-2 mb-2">
                                                            <Media className="align-items-center">
                                                                            <div className="chat-user-img align-self-center mr-3">
                                                                                        <div className="avatar-xs">
                                                                                            <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                                                                S
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                <Media body>
                                                                    <div className="text-left">
                                                                        <h5 className="font-size-14 mb-1">{t('Sara Muller')}
                                                                        <Badge color="danger" className="badge-soft-danger float-right">{t('Admin')}</Badge>
                                                                        </h5>
                                                                    </div>
                                                                </Media>
                                                            </Media>
                                                        </Card>

                                                        <Card className="p-2 mb-2">
                                                            <Media className="align-items-center">
                                                                            <div className="chat-user-img align-self-center mr-3">
                                                                                        <div className="avatar-xs">
                                                                                            <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                                                                O
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                <Media body>
                                                                    <div className="text-left">
                                                                        <h5 className="font-size-14 mb-1">{t('Ossie Wilson')}</h5>
                                                                    </div>
                                                                </Media>
                                                            </Media>
                                                        </Card>

                                                        <Card className="p-2 mb-2">
                                                            <Media className="align-items-center">
                                                                <div className="chat-avatar">
                                                                    
                                                                    <img src={avatar7} className="rounded-circle chat-user-img avatar-xs mr-3" alt="letschat" />
                                                                </div>
                                                                <Media body>
                                                                    <div className="text-left">
                                                                        <h5 className="font-size-14 mb-1">{t('Paul Haynes')}</h5>
                                                                    </div>
                                                                </Media>
                                                            </Media>
                                                        </Card>
                                            </CustomCollapse>
                                    </Card>
                                } */}
                            </div>
                        </SimpleBar>
                        {/* end user-profile-desc */}
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