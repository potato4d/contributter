import * as React from 'react'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import firebaseApp from '../../../../externals/firebaseApp'
import { AppButton } from '../../../common/AppButton'
import { UserData } from '../../../../types/firestore'

export class IndexGuestOAuthButton extends React.Component {
  constructor(props, state) {
    super(props, state)
    this.handleClickSignInWithTwitter = this.handleClickSignInWithTwitter.bind(
      this
    )
  }

  async handleClickSignInWithTwitter() {
    try {
      if (location) {
        const result = await firebaseApp
          .auth()
          .signInWithPopup(new firebase.auth.TwitterAuthProvider())
        const firestore = firebaseApp.firestore()
        const credential: {
          accessToken: string
          secret: string
        } = result.credential as any

        const userRef = firestore.collection('users').doc(result.user.uid)
        const userData: UserData = {
          uid: result.user.uid,
          accessToken: credential.accessToken,
          accessSecret: credential.secret,
          TwitterID: result.additionalUserInfo.username,
          enabled: false,
          iconURL: (result.additionalUserInfo
            .profile as any).profile_image_url.replace('_normal', '_400x400')
        }

        let firestoreUserData: UserData
        try {
          firestoreUserData = await userRef
            .get()
            .then(doc => doc.data() as UserData)
        } catch (e) {}
        const r = await userRef.set({
          ...(firestoreUserData || {}),
          ...userData,
          ...{
            GitHubID: (firestoreUserData || ({} as any)).GitHubID! || '',
            enabled: (firestoreUserData || ({} as any)).enabled
          }
        })
      }
    } catch (e) {
      console.log(e)
      alert('ログインに失敗しました')
    }
  }

  render() {
    return (
      <AppButton
        onClick={() => {
          this.handleClickSignInWithTwitter()
        }}
      >
        <span>Signin with Twitter</span>
      </AppButton>
    )
  }
}
