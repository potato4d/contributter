import * as React from 'react'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import firebaseApp from '../../../externals/firebaseApp'

export class OAuthButton extends React.Component {

  constructor (props, state) {
    super(props, state)
    this.handleClickSignInWithTwitter = this.handleClickSignInWithTwitter.bind(this)
  }

  async handleClickSignInWithTwitter() {
    try {
      if (location) {
        firebaseApp.auth().signInWithPopup(
          new firebase.auth.TwitterAuthProvider
        )
      }
    } catch(e) {
      console.log(e)
      alert(2)
    }
  }

  render() {
    return (
      <div className="flex flex-col items-center">
        <div onClick={() => this.handleClickSignInWithTwitter()} className="px-3 py-2 cursor-pointer text-center inline-flex items-center justify-center hover:decoration-underline text-white text-sm rounded-sm font-bold bg-blue-800 hover:bg-blue-600">
          Signin with Twitter
        </div>
      </div>
    )
  }
}
