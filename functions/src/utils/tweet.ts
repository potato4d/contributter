import Twitter, { AccessTokenOptions } from 'twitter'

export function execTweet(option: AccessTokenOptions, status: string) {
  const twitterClient = new Twitter(option)
  twitterClient.post('statuses/update', {
    status
  })
}
