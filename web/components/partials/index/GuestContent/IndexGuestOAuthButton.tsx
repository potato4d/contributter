import * as React from 'react'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import firebaseApp from '../../../../externals/firebaseApp'
import { AppButton } from '../../../common/AppButton'

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
        firebaseApp
          .auth()
          .signInWithPopup(new firebase.auth.TwitterAuthProvider())
          .then((result) => {
            console.log(result)
          })
      }
    } catch (e) {
      console.log(e)
      alert(2)
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
