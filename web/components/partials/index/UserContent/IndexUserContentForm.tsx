import * as React from 'react'
import { AppGitHubIcon, AppTwitterIcon } from '../../../common/AppIcons'
import { AppButton } from '../../../common/AppButton'
import { UserData } from '../../../../types/firestore'

interface Props {
  user: UserData
  onSubmit: (GitHubID: string) => Promise<void>
}

export const IndexUserContentForm: React.FC<Props> = props => {
  const [GitHubID, setGitHubID] = React.useState(props.user.GitHubID)
  return (
    <form
      onSubmit={() => {
        props.onSubmit(GitHubID)
      }}
    >
      <div className="flex justify-center">
        <div className="relative">
          <input
            defaultValue={GitHubID}
            onInput={event => {
              setGitHubID(event.currentTarget.value)
            }}
            type="text"
            placeholder="Your GitHub ID"
            className="w-32 pl-8 pr-1 h-6 text-xs appearance-none bg-transparent border text-gray-200 focus:bg-gray-800 rounded-sm border-gray-400"
          />
          <div
            style={{ left: '0px', top: '1px' }}
            className="rounded-l-sm border border-gray-400 absolute flex items-center justify-center w-6 h-6 bg-gray-700 text-gray-200"
          >
            <div className="w-3 h-3 flex items-center justify-center">
              <AppGitHubIcon />
            </div>
          </div>
        </div>
        <div className="w-4 h-1"></div>
        <div className="relative">
          <input
            readOnly
            defaultValue={`${props.user.TwitterID}`}
            type="text"
            className="w-32 pl-8 pr-1 h-6 text-xs appearance-none bg-gray-100 border text-gray-700 rounded-sm border-gray-400"
          />
          <div
            style={{ left: '0px', top: '1px' }}
            className="rounded-l-sm border border-gray-400 absolute flex items-center justify-center w-6 h-6 bg-gray-700 text-gray-200"
          >
            <div className="w-3 h-3 flex items-center justify-center">
              <AppTwitterIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="pt-4 flex justify-center">
        <AppButton
          onClick={() => {
            props.onSubmit(GitHubID)
          }}
        >
          <span>Update Configuration</span>
        </AppButton>
      </div>
    </form>
  )
}
