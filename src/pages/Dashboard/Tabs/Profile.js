import React, { useState } from 'react';
import { Card } from "reactstrap";
import CustomCollapse from "../../../components/CustomCollapse";

function Profile(props) {
    const [isOpen1, setIsOpen1] = useState(true);
    const toggleCollapse1 = () => {
        setIsOpen1(!isOpen1);
    };
    console.log(props)
    return (
        <React.Fragment>
            <div>
                            <div className="px-4 pt-4">
                                <h4 className="mb-0">{('My Profile')}</h4>
                            </div>

                            <div className="text-center p-4 border-bottom">
                                <div className="mb-4">
                                    <img src={props.userDetails.image} className="rounded-circle avatar-lg img-thumbnail" alt="letschat" />
                                </div>

                                <h5 className="font-size-16 mb-1 text-truncate">{props.userDetails.name}</h5>
                                <p className="text-muted text-truncate mb-1"><i className="ri-record-circle-fill font-size-10 text-success mr-1 d-inline-block"></i> {props.userDetails.isOnline ? ('Active') : ('Away')}</p>
                            </div>
                            <div className="p-4 user-profile-desc">
                                <div className="text-muted text-center">
                                    <p className="mb-4">{props.userDetails.status !== "" ? props.userDetails.status : "Status not available"}</p>
                                </div>
                                <div id="profile-user-accordion-1" className="custom-accordion">
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
                                                    <h5 className="font-size-14">{props.userDetails.name !== "" ? props.userDetails.name : "No Name"}</h5>
                                                </div>

                                                <div className="mt-4">
                                                    <p className="text-muted mb-1">{('Email')}</p>
                                                    <h5 className="font-size-14">{props.userDetails.email !== "" ? props.userDetails.email : "No Email"}</h5>
                                                </div>

                                                <div className="mt-4">
                                                    <p className="text-muted mb-1">{('Location')}</p>
                                                    <h5 className="font-size-14">{props.userDetails.location !== "" ? props.userDetails.location : "Location Not Available"}</h5>
                                                </div>

                                                <div className="mt-4">
                                                    <p className="text-muted mb-1">{('Description')}</p>
                                                    <h5 className="font-size-14 mb-0">{props.userDetails.description !== "" ? props.userDetails.description : "Description Not Available"}</h5>
                                                </div>
                                        </CustomCollapse>
                                    </Card>
                                   </div>
                              </div>
                        </div>
        </React.Fragment>
    );
}

export default Profile;