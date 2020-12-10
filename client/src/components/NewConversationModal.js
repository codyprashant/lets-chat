import React, {useState} from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
import {useConversations} from '../contexts/ConversationsProvider'

export default function NewConversationModal({closeModal}) {
    const [selectedContactIds, setselectedContactIds] = useState([])
    const {contacts} = useContacts()
    const {createConversations} = useConversations()

    function handleCheckboxChange(contactId){
        setselectedContactIds(prevselectedContactIds => {
            if(prevselectedContactIds.includes(contactId)){
                return prevselectedContactIds.filter(prevId => {
                    return contactId !== prevId
                })
            } else{
                return [...prevselectedContactIds, contactId]
            }
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        createConversations(selectedContactIds)
        closeModal()
    }
    return (
        <>
        <Modal.Header closeButton>Craete Conversation</Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                {contacts.map(contact => (
                    <Form.Group controlId={contact.id} key={contact.id}>
                        <Form.Check
                            type="checkbox"
                            value={selectedContactIds.includes(contact.id)}
                            label={contact.name}
                            onChange={() => handleCheckboxChange(contact.id)}
                        />
                    </Form.Group>
                ))}
                <Button type="submit">Create</Button>
            </Form>
        </Modal.Body>
        </>
    )
}
