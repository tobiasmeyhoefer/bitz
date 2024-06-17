"use client"

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const ExperimentalChatButton = () => {

    const router = useRouter()

    const createChat = async () => {
        const res = await fetch("/api/chats/create")
        const chatId: string = await res.text()
        router.push(`/chat/${chatId}`)
    }

    const joinChat = async () => {
        
    }

    return ( 
        <Button onClick={createChat}>Chat</Button>
     );
}
 
export default ExperimentalChatButton;