import * as React from 'react'
import {
  AppGitHubIcon,
  AppLinkIcon,
  AppTwitterIcon
} from '../../common/AppIcons'
import { IndexUserContentForm } from './UserContent/IndexUserContentForm'
import { UserData } from '../../../types/firestore'
import { updateUser } from '../../../externals/firebaseApp'

interface Props {
  user?: UserData
}

export class IndexUserContent extends React.Component<Props, {}> {
  constructor(props, state) {
    super(props, state)
    this.handleToggleActiveStatus = this.handleToggleActiveStatus.bind(this)
    this.handleSubmitForm = this.handleSubmitForm.bind(this)
  }

  async handleToggleActiveStatus() {
    try {
      await updateUser({
        uid: this.props.user.uid,
        enabled: !this.props.user.enabled
      })
    } catch (e) {
      alert('更新に失敗しました。')
    }
  }

  async handleSubmitForm(GitHubID: string) {
    try {
      await updateUser({
        uid: this.props.user.uid,
        GitHubID,
        enabled: !!GitHubID
      })
    } catch (e) {
      alert('更新に失敗しました。')
    }
  }

  render() {
    return (
      <div>
        <div className="w-1/2 mx-auto">
          <div className="py-4 mb-0 pb-0 flex text-gray-300 justify-center items-center mx-auto">
            <div className="w-6 h-6">
              <AppGitHubIcon />
            </div>
            <div className="w-3 h-1"></div>
            <div
              onClick={() => {
                this.handleToggleActiveStatus()
              }}
              className={`w-6 h-6 cursor-pointer ${
                this.props.user.enabled
                  ? 'text-green-400 hover:text-red-600'
                  : 'text-gray-800 hover:text-green-400'
              }`}
            >
              <AppLinkIcon />
            </div>
            <div className="w-3 h-1"></div>
            <div className="w-6 h-6">
              <AppTwitterIcon />
            </div>
          </div>
          <div className="p-0 flex items-center justify-center m-0 text-center text-shadow text-center text-xs py-4">
            <span className="inline-block ml-1">
              The scheduler is currently{' '}
              <b>{this.props.user.enabled ? 'active' : 'inactive'}</b>.
            </span>
          </div>
          <IndexUserContentForm
            onSubmit={this.handleSubmitForm}
            user={this.props.user}
          />
        </div>
      </div>
    )
  }
}
