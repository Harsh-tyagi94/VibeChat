import { getFriendByUserId } from '@/helpers/get-friends-by-user-id'
import { fetchRedis } from '@/helpers/redis'
import { authOptions } from '@/lib/auth'
import { chatHrefConstructor } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const page = async ({}) => {
  const session = await getServerSession(authOptions)
  if (!session) notFound()

  const friends = await getFriendByUserId(session.user.id)

  const friendsWithLastMessage = await Promise.all(
    friends.map(async (friend) => {
      const [lastMessageRaw] = (await fetchRedis(
        'zrange',
        `chat:${chatHrefConstructor(session.user.id, friend.id)}:messages`,
        -1,
        -1
      )) as string[]

      const lastMessage = JSON.parse(lastMessageRaw) as Message

      return {
        ...friend,
        lastMessage,
      }
    })
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-sky-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-sky-900 mb-10 border-b pb-4 border-sky-400">
          💬 Recent Chats
        </h1>

        {friendsWithLastMessage.length === 0 ? (
          <p className="text-base text-gray-600 italic">
            {`You haven't started any chats yet.`}
          </p>
        ) : (
          <div className="space-y-4">
            {friendsWithLastMessage.map((friend) => (
              <Link
                key={friend.id}
                href={`/dashboard/chat/${chatHrefConstructor(
                  session.user.id,
                  friend.id
                )}`}
                className="group relative flex items-center gap-4 bg-white hover:bg-sky-100 border border-sky-200 p-4 rounded-2xl shadow hover:shadow-lg transition duration-200"
              >
                <div className="relative h-12 w-12">
                  <Image
                    referrerPolicy="no-referrer"
                    className="rounded-full object-cover ring-2 ring-sky-500"
                    alt={`${friend.name} profile picture`}
                    src={friend.image}
                    fill
                  />
                </div>

                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-sky-900">
                    {friend.name}
                  </h4>
                  <p className="mt-1 text-sm text-gray-700 truncate">
                    <span className="text-sky-500">
                      {friend.lastMessage.senderId === session.user.id ? 'You: ' : ''}
                    </span>
                    {friend.lastMessage.text}
                  </p>
                </div>

                <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-sky-600 transition" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default page
