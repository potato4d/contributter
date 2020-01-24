import * as React from 'react'
import { AppGitHubIcon, AppTwitterIcon } from '../../../common/AppIcons'
import { UserData } from '../../../../types/firestore'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import firebaseApp, {
  fetchUser,
  updateUser
} from '../../../../externals/firebaseApp'
import { ToasterEmitter } from '../../../../externals/toasterEmitter'

interface Props {
  user: UserData
  onSubmit: (GitHubID: string) => Promise<void>
}

export class IndexUserContentForm extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
    this.handleClickSignInWithGitHub = this.handleClickSignInWithGitHub.bind(
      this
    )
  }

  async handleClickSignInWithGitHub() {
    try {
      if (location) {
        const result = await firebaseApp
          .auth()
          .currentUser.linkWithPopup(new firebase.auth.GithubAuthProvider())
        if (result.additionalUserInfo.providerId === 'github.com') {
          await updateUser({
            ...this.props.user,
            GitHubID: result.additionalUserInfo.username
          })
        }
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
      <form
        onSubmit={() => {
          this.props.onSubmit(this.props.user.GitHubID)
        }}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <button
              onClick={() => {
                this.handleClickSignInWithGitHub()
              }}
              type="button"
              className="w-48 pl-12 pr-1 h-8 text-xs text-left appearance-none text-gray-200 bg-gray-800 rounded-sm"
            >
              {this.props.user.GitHubID || 'Sign in with GitHub'}
            </button>
            <div
              style={{ left: '0px', top: '0' }}
              className="rounded-l-sm absolute flex items-center justify-center w-8 h-8 bg-gray-700 text-gray-200"
            >
              <div className="w-3 h-3 flex items-center justify-center">
                <AppGitHubIcon />
              </div>
            </div>
          </div>
          <div className="w-4 h-2"></div>
          <div className="relative">
            <input
              defaultValue={`${this.props.user.TwitterID}`}
              type="text"
              readOnly={true}
              placeholder="Your GitHub ID"
              className="outline-none cursor-auto w-48 pl-12 pr-1 h-8 text-xs appearance-none text-gray-200 bg-gray-800 rounded-sm"
            />
            <div
              style={{ left: '0px', top: '0' }}
              className="rounded-l-sm absolute flex items-center justify-center w-8 h-8 bg-gray-700 text-gray-200"
            >
              <div className="w-3 h-3 flex items-center justify-center">
                <AppTwitterIcon />
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }
}
