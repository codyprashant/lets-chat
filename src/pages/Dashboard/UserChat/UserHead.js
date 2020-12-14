import React, { useState } from "react";
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Media,
  Button,
  Input,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { openUserSidebar, setFullUser } from "../../../redux/actions";

function UserHead(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);
  const toggle1 = () => setDropdownOpen1(!dropdownOpen1);

  const openUserSidebar = (e) => {
    e.preventDefault();
    props.openUserSidebar();
  };

  function closeUserChat(e) {
    e.preventDefault();
    var userChat = document.getElementsByClassName("user-chat");
    if (userChat) {
      userChat[0].classList.remove("user-chat-show");
    }
  }

  return (
    <React.Fragment>
      <div className="p-3 p-lg-4 border-bottom">
        <Row className="align-items-center">
          <Col sm={4} xs={8}>
            <Media className="align-items-center">
              <div className="d-block d-lg-none mr-2">
                <Link
                  to="#"
                  onClick={(e) => closeUserChat(e)}
                  className="user-chat-remove text-muted font-size-16 p-2"
                >
                  <i className="ri-arrow-left-s-line"></i>
                </Link>
              </div>
              {/* {props.users[props.active_user].profilePicture !== "Null" ? ( */}
                <div className="mr-3">
                  <img
                    src={props.allUserData.map((list) => {
                        if ( list.email === (props.chats[props.active_user].users[0] !== props.userEmail ? props.chats[props.active_user].users[0] : props.chats[props.active_user].users[1])) {
                            return list.image;
                        } else {  return ""; }
                    }).join("").trim("")}
                    className="rounded-circle avatar-xs"
                    alt="letschat"
                  />
                </div>

              <Media body className="overflow-hidden">
                <h5 className="font-size-16 mb-0 text-truncate">
                  <Link
                    to="#"
                    onClick={(e) => openUserSidebar(e)}
                    className="text-reset user-profile-show"
                  >
                    {props.allUserData.map((list) => {
                        if (list.email === (props.chats[props.active_user].users[0] !== props.userEmail ? props.chats[props.active_user].users[0] : props.chats[props.active_user].users[1])) {
                            return list.name;
                        }
                        else{
                            return ""
                        }
                    })}
                  </Link>
                  {props.allUserData.map((list) => {
                        if (list.email === (props.chats[props.active_user].users[0] !== props.userEmail ? props.chats[props.active_user].users[0] : props.chats[props.active_user].users[1])) {
                            if(list.isOnline){
                                return(<>
                                    <i className="ri-record-circle-fill font-size-10 text-success d-inline-block ml-1"></i>
                                 </>)
                            } else{
                                return(<>
                                    <i className="ri-record-circle-fill font-size-10 text-secondary d-inline-block ml-1"></i>
                                </>)
                            }
                        }
                        else{
                            return(<>
                                <i className="ri-record-circle-fill font-size-10 text-secondary d-inline-block ml-1"></i>
                            </>)
                        }
                    })
                  }
                </h5>
              </Media>
            </Media>
          </Col>
          <Col sm={8} xs={4}>
            <ul className="list-inline user-chat-nav text-right mb-0">
              <li className="list-inline-item d-none d-lg-inline-block">
                <Button
                  type="button"
                  color="none"
                  onClick={(e) => openUserSidebar(e)}
                  className="nav-btn user-profile-show"
                >
                  <i className="ri-user-2-line"></i>
                </Button>
              </li>

              <li className="list-inline-item">
                <Dropdown isOpen={dropdownOpen1} toggle={toggle1}>
                  <DropdownToggle
                    className="btn nav-btn "
                    color="none"
                    type="button"
                  >
                    <i className="ri-more-fill"></i>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem
                      className="d-block d-lg-none user-profile-show"
                      onClick={(e) => openUserSidebar(e)}
                    >
                      View profile{" "}
                      <i className="ri-user-2-line float-right text-muted"></i>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </li>
            </ul>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  const { active_user } = state.Chat;
  return { ...state.Layout, active_user };
};

export default connect(mapStateToProps, { openUserSidebar, setFullUser })(
  UserHead
);
