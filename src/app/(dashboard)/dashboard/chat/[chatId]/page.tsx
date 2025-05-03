import { fetchRedis } from '@/helpers/redis'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { messageArrayValidator } from '@/lib/validates/message'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { FC } from 'react'

interface PageProps {
  params: {
    chatId: string
  }
}

const getChatMessages = async (chatId: string) => {
    try {
        const results: string[] = (await fetchRedis(
            'zrange',
            `chat:${chatId}:messages`,
            0,
            -1
        ))

        const dbMessages = results.map((message) => JSON.parse(message) as Message)

        //display message in reversedDB order
        const reversedDBMessages = dbMessages.reverse()

        const messages = messageArrayValidator.parse(reversedDBMessages)

        return messages
    } catch (error) {
        notFound()
    }
}

const page = async ({params}: PageProps) => {
    const { chatId } = params

    const session = await getServerSession(authOptions)

    if (!session) notFound()

    const { user } = session
    const [userId1, userId2] = chatId.split('--')

    if(user.id !== userId1 && user.id !== userId2) {
        notFound()
    }

    const chatPartnerId = user.id === userId1 ? userId2 : userId1

    const chatPartnerRaw = (await fetchRedis(
        'get',
        `user:${chatPartnerId}`
    )) as string
    const chatPartner = JSON.parse(chatPartnerRaw) as User
    const initialMessages = await getChatMessages(chatId)

  return <div>{params.chatId}</div>
}

export default page