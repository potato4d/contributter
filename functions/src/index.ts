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

async function clearTweetRequest() {
  const tweetRequestsSnapshot = await firestore.collection('tweetRequest').get()
  const tweetRequest: TweetRequest[] = []
  tweetRequestsSnapshot.forEach(doc => {
    tweetRequest.push({
      id: doc.id,
      ...(doc.data() as TweetRequest)
    })
  })
  await Promise.all(
    tweetRequest.map(async tr => {
      if (tr.keep!) {
        return
      }
      await firestore
        .collection('tweetRequest')
        .doc(tr.id!)
        .delete()
    })
  )
  return
}

async function addTweetRequests() {
  const usersSnapshot = await firestore.collection('users').get()
  const users: UserData[] = []
  usersSnapshot.forEach(doc => {
    users.push(doc.data() as UserData)
  })
  await Promise.all(
    users.map(async u => {
      const tr: TweetRequest = {
        uid: u.uid
      }
      await firestore.collection('tweetRequest').add(tr)
    })
  )
  return
}

export const dailyClearTweetRequest = functions.pubsub
  .schedule('1 12 * * *')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    await clearTweetRequest()
  })

export const dailyTweet = functions.pubsub
  .schedule('1 0 * * *')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    await addTweetRequests()
  })

export const dailyTweetAgain = functions.pubsub
  .schedule('16 0 * * *')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    await addTweetRequests()
  })

export const dailyTweetAgainAgain = functions.pubsub
  .schedule('31 0 * * *')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    await addTweetRequests()
  })

export const tweet = functions.firestore
  .document('tweetRequest/{tweetRequestId}')
  .onCreate(async snapshot => {
    const tweetRequest = snapshot.data() as TweetRequest
    const userData = await firestore
      .collection('users')
      .doc(`${tweetRequest.uid}`)
      .get()
      .then(snapshot => snapshot.data() as UserData)
    if (!(userData.GitHubID && userData.enabled)) {
      return
    }
    const contribution = await crawl(userData.GitHubID)
    const status = `${userData.TwitterID} さんの ${contribution.date} の contribution 数: ${contribution.count}\n #contributter_daily_report`
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
