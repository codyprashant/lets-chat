import React, { useState } from 'react';
import { Button, Input, Row, Col,
    //  UncontrolledTooltip, ButtonDropdown, DropdownToggle, DropdownMenu, Label, 
     Form } from "reactstrap";
// import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import { initFirebaseBackend } from "../../../helpers/firebase";

function ChatInput(props) {
    const [textMessage, settextMessage] = useState("");
    // const [isOpen, setisOpen] = useState(false);
    const [file, setfile] = useState({
        name : "",
        size : ""
    });
    const [fileImage, setfileImage] = useState("")

    // const toggle = () => setisOpen(!isOpen);

    //function for text input value change
    const handleChange = e => {
        settextMessage(e.target.value)
    }

    //function for add emojis
    // const addEmoji = e => {
    //     let emoji = e.native;
    //     settextMessage(textMessage+emoji)
    // };

    //function for file input change
    // const handleFileChange = e => {
    //     if(e.target.files.length !==0 )
    //     setfile({
    //         name : e.target.files[0].name,
    //         size : e.target.files[0].size
    //     })
    // }

    //function for image input change
    // const handleImageChange = e => {
    //     if(e.target.files.length !==0 )
    //     setfileImage(URL.createObjectURL(e.target.files[0]))
    // }

    //function for send data to onaddMessage function(in userChat/index.js component)
    const onaddMessage = (e, textMessage) => {
        e.preventDefault();
        //if text value is not emptry then call onaddMessage function
        if(textMessage !== "") {
            props.onaddMessage(textMessage, "textMessage");
            settextMessage("");
        }

        //if file input value is not empty then call onaddMessage function
        if(file.name !== "") {
            props.onaddMessage(file, "fileMessage");
            setfile({
                name : "",
                size : ""
            })
        }

        //if image input value is not empty then call onaddMessage function
        if(fileImage !== "") {
            props.onaddMessage(fileImage, "imageMessage");
            setfileImage("")
        }
    }

    const typing = async () => {
        const { docid } = props.chats;
        const { userEmail } = props;
        let finalData = await getCurrentTypingData(docid);
    

          if (!finalData.includes(userEmail)) {
            await finalData.push(userEmail);
          }
        
    console.log(finalData)
        await initFirebaseBackend().firestore().collection("chats").doc(docid).update({
          typing: finalData,
        });
    };

    const getCurrentTypingData = async (docid) => {
         try {
          const dt = await initFirebaseBackend().firestore().collection("chats").doc(docid).get().then((obj) => {
              return obj.data().typing;
            });
          return dt;
        } catch (e) {
          return [];
        }
      };
    
      const focus = async () => {
        await typing();
      }

      const blur = async () => {
        const { docid } = props.chats;
        const { userEmail } = props;
        let finalData = await getCurrentTypingData(docid);
        finalData = finalData.filter((ob) => { if (ob !== userEmail) { return ob; } });
        console.log(finalData)
        await initFirebaseBackend().firestore().collection("chats").doc(docid).update({
          typing: finalData,
        });
    }
    
    return (
        <React.Fragment>
            <div className="p-3 p-lg-4 border-top mb-0">
                            <Form onSubmit={(e) => onaddMessage(e, textMessage)} >
                                <Row noGutters>
                                    <Col>
                                        <div>
                                            <Input type="text" value={textMessage} onChange={handleChange} onFocus={focus} onBlur={blur} className="form-control form-control-lg bg-light border-light" placeholder="Enter Message..." />
                                        </div>
                                    </Col>
                                    <Col xs="auto">
                                        <div className="chat-input-links ml-md-2">
                                            <ul className="list-inline mb-0">
                                                {/* <li className="list-inline-item">
                                                <ButtonDropdown className="emoji-dropdown" direction="up" isOpen={isOpen} toggle={toggle}>
                                                    <DropdownToggle id="emoji" color="link" className="text-decoration-none font-size-16 btn-lg waves-effect">
                                                        <i className="ri-emotion-happy-line"></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu className="dropdown-menu-lg-right">
                                                        <Picker onSelect={addEmoji} />
                                                    </DropdownMenu>
                                                    </ButtonDropdown>
                                                    <UncontrolledTooltip target="emoji" placement="top">
                                                        Emoji
                                                    </UncontrolledTooltip>
                                                </li> */}
                                      
                                                {/* <li className="list-inline-item input-file">
                                                    <Label id="images" className="mr-1 btn btn-link text-decoration-none font-size-16 btn-lg waves-effect">
                                                        <i className="ri-image-fill"></i>
                                                    <Input onChange={(e) => handleImageChange(e)} accept="image/*" type="file" name="fileInput" size="60" />
                                                    </Label>   
                                                    <UncontrolledTooltip target="images" placement="top">
                                                        Images
                                                    </UncontrolledTooltip>
                                                </li> */}
                                                <li className="list-inline-item">
                                                    <Button type="submit" color="primary" className="font-size-16 btn-lg chat-send waves-effect waves-light">
                                                        <i className="ri-send-plane-2-fill"></i>
                                                    </Button>
                                                </li>
                                            </ul>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
        </React.Fragment>
    );
}

export default ChatInput;