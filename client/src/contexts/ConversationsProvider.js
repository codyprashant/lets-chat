import React, {useContext, useState} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'

const ConversationsContext = React.createContext()

export function useConversations(){
    return useContext(ConversationsContext)
}





export function ConversationsProvider({children}) {
    const [conversations, setConversations] = useLocalStorage('conversations', [])
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
    const {contacts} = useContacts();

    function createConversations(recipients){
        setConversations(prevConversations => {
            return [...prevConversations, {recipients, messages:[]}]
        })
    }

    const formattedConversations = conversations.map((conversation, index) => {
        const recipients = conversation.recipients.map(recipient =>{
            const contact = contacts.find(contact => {
                return contact.id === recipient
            })
            const name = (contact && contact.name) || recipient
            return {id:recipient, name}
        })
        const selected = index === selectedConversationIndex
        return {...conversation, recipients}
    })

    const value = {
        conversations: formattedConversations,
        selectConversationIndex : setSelectedConversationIndex,
        createConversations
    }

    return (
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    )
}
