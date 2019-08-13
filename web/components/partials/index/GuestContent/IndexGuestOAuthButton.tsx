import * as React from 'react'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import firebaseApp, {
  fetchUser,
  updateUser
} from '../../../../externals/firebaseApp'
import { AppButton } from '../../../common/AppButton'
import { UserData } from '../../../../types/firestore'
import { ToasterEmitter } from '../../../../externals/toasterEmitter'

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
        const credential: {
          accessToken: string
          secret: string
        } = result.credential as any
        const userData: UserData = {
          uid: result.user.uid,
          accessToken: credential.accessToken,
          accessSecret: credential.secret,
          TwitterID: result.additionalUserInfo.username,
          enabled: false,
          iconURL: (result.additionalUserInfo
            .profile as any).profile_image_url.replace('_normal', '_400x400')
        }
        const firestoreUserData: UserData = await fetchUser(userData.uid)
        const payload: UserData = {
          ...(firestoreUserData || {
            uid: userData.uid
          }),
          ...userData,
          ...{
            GitHubID: (firestoreUserData || ({} as any)).GitHubID! || '',
            enabled: !!(firestoreUserData || ({} as any)).enabled
          }
        }
        await updateUser(payload)
        location.reload()
      }
    } catch (e) {
      ToasterEmitter.dispatch({
        type: 'error',
        body: 'ログインに失敗しました'
      })
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
