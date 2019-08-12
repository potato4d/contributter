import * as React from 'react'
import {
  AppGitHubIcon,
  AppLinkIcon,
  AppTwitterIcon
} from '../../common/AppIcons'
import { IndexUserContentForm } from './UserContent/IndexUserContentForm'
import { UserData } from '../../../types/firestore'

interface Props {
  user?: UserData
  isActive: boolean
}

const LinkStateView: React.FC<Props> = props => (
  <React.Fragment>
    <div className="py-4 mb-0 pb-0 flex text-gray-300 justify-center items-center mx-auto">
      <div className="w-6 h-6">
        <AppGitHubIcon />
      </div>
      <div className="w-3 h-1"></div>
      <div
        onClick={() => {
          alert(1)
        }}
        className={`w-6 h-6 cursor-pointer ${
          props.isActive
            ? 'text-green-400 hover:text-red-600'
            : 'hover:text-green-400'
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
        <b>{props.isActive ? 'active' : 'inactive'}</b>.
      </span>
    </div>
  </React.Fragment>
)

export const IndexUserContent: React.FC<Props> = (props: Props) => (
  <div>
    <div className="w-1/2 mx-auto">
      <LinkStateView user={props.user} isActive={props.isActive} />
      <IndexUserContentForm user={props.user} />
    </div>
  </div>
)
