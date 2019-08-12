import { execTweet } from './tweet'
import { AccessTokenOptions } from 'twitter'

describe('src/utils/tweet.spec.ts', () => {
  describe('execTweet', () => {
    test('正常系', async () => {
      const option: AccessTokenOptions = {
        consumer_key: process.env.TWITTER_CK!,
        consumer_secret: process.env.TWITTER_CS!,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN!,
        access_token_secret: process.env.TWITTER_ACCESS_SECRET!
      }
      await execTweet(option, 'test')
    })
  })
})
