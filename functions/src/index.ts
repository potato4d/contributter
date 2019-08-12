import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { execTweet } from './utils/tweet'
import { Environments, TweetRequest, UserData } from './types'
import { crawl } from './utils/crawler'

;(admin as any).initializeApp({
  //   apiKey: process.env.FIREBASE_APIKEY,
  //   authDomain: process.env.FIREBASE_AUTHDOMAIN,
  //   databaseURL: process.env.FIREBASE_DATABASEURL,
  //   projectId: process.env.FIREBASE_PROJECTID,
  //   storageBucket: process.env.FIREBASE_STORAGEBUCKET
})

const environments = functions.config() as Environments
const firestore = admin.firestore()

export const tweet = functions.firestore
  .document('tweetRequest/{tweetRequestId}')
  .onCreate(async snapshot => {
    const tweetRequest = snapshot.data() as TweetRequest
    const userData = await firestore
      .collection('users')
      .doc(tweetRequest.uid)
      .get()
      .then(snapshot => snapshot.data() as UserData)
    if (!(userData.GitHubID && userData.enabled)) {
      return
    }
    const contribution = await crawl(userData.GitHubID)
    const status = `[Contributter] ${userData.TwitterID} さんの ${contribution.date} の contribution 数は ${contribution.count} でした。\n#contributter`
    await execTweet(
      {
        consumer_key: environments.twitter.ck || process.env.TWITTER_CK!,
        consumer_secret: environments.twitter.cs || process.env.TWITTER_CS!,
        access_token_key: userData.accessToken,
        access_token_secret: userData.accessSecret
      },
      status
    )
  })
