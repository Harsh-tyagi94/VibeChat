import { fetchRedis } from "./redis"

export const getFriendByUserId = async (userId: string) => {
    //retrieve all frinds for current user
    const friendsIds = await fetchRedis('smembers', `user:${userId}:friends`) as string[]
    
    //promise.all works to get/fetch all friends at same time simultaneously as they are independant
    const friends = await Promise.all(
        friendsIds.map(async (friendsIds) => {
            const friend = await fetchRedis('get', `user:${friendsIds}`) as string
            const parseFriend = JSON.parse(friend) as User
            return parseFriend
        })
    )

    return friends
}