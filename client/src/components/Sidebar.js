import React, { useState } from "react";
import { Tab, Tabs, Button, Modal} from "react-bootstrap";
import Contacts from "./Contacts";
import Conversations from "./Conversations";
import NewContactsModal from "./NewContactsModal";
import NewConversationModal from "./NewConversationModal";

const CONVERSATIONS_KEY = "conversations";
const CONTACTS_KEY = "contacts";

export default function Sidebar({ id }) {
  const [activekey, setActivekey] = useState(CONVERSATIONS_KEY);
  const [modalOpen, setModalOpen] = useState(false);
//   const [activekey, setActivekey] = useState(CONVERSATIONS_KEY);
  const conversationOpen = activekey === CONVERSATIONS_KEY;

  function closeModal(){
      setModalOpen(false)
  }

  return (
    <div style={{width: '250px'}} className="d-flex flex-column border-right ">
        <Tabs defaultActiveKey={activekey} transition={false} id="noanim-tab-example" onSelect={setActivekey}>
          <Tab eventKey={CONVERSATIONS_KEY} title="Conversations"  className="overflow-auto flex-grow-1">
            <Conversations />
          </Tab>
          <Tab eventKey={CONTACTS_KEY} title="Contacts" className="overflow-auto flex-grow-1">
            <Contacts />
          </Tab>

        </Tabs>
        <div className="p-2 border-top border-right small fixed-bottom" style={{width: '250px'}}>
            Your Id: <span className="text-muted">{id}</span>
            <Button onClick={() => setModalOpen(true)} className="mt-2 rounded-0" style={{width:'100%'}}>
            New {conversationOpen ? 'Conversation' : 'Contact'}
        </Button>
        </div>
        <Modal show={modalOpen} onHide={closeModal}>
            {conversationOpen ?
            <NewConversationModal closeModal={closeModal}/> :
            <NewContactsModal  closeModal={closeModal}/>    
        }
        </Modal>

    </div>
  );
}
