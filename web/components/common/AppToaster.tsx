import * as React from 'react'
import { AppAlertIcon } from './AppIcons'
import { ToastData, ToasterEmitter } from '../../externals/toasterEmitter'

interface AppToasterState {
  toasts: ToastData[]
}

const AppToast: React.FC<ToastData> = props => {
  const baseClass =
    'mb-4 toast shadow rounded-sm p-4 text-white text-sm flex items-center justify-start font-bold'
  return (
    <div
      data-toast-id={props.id}
      className={`${baseClass}${props.type === 'info' ? ' bg-blue-500' : ''}${
        props.type === 'error' ? ' bg-red-500' : ''
      }`}
    >
      <div className="w-4 h-4 mr-2">
        <AppAlertIcon />
      </div>
      {props.body}
    </div>
  )
}

export class AppToaster extends React.Component<{}, AppToasterState> {
  constructor(props, state) {
    super(props, state)
    this.state = {
      toasts: []
    }

    this.cleanUpToasts = this.cleanUpToasts.bind(this)
    this.handleAddToastData = this.handleAddToastData.bind(this)

    ToasterEmitter.on(payload => {
      this.handleAddToastData(payload)
    })
  }

  cleanUpToasts() {
    this.setState({
      toasts: this.state.toasts.filter(toast => {
        return toast.life! > ~~(new Date().getTime() * 0.001)
      })
    })
  }

  handleAddToastData(payload: ToastData) {
    this.setState({
      toasts: [...this.state.toasts, payload]
    })
    setTimeout(() => {
      this.cleanUpToasts()
    }, 4000)
  }

  render() {
    return (
      <div className="z-50 fixed w-full left-0 top-0">
        <div className="container p-8 mx-auto">
          <div className="w-64 mx-auto">
            {this.state.toasts.map(toast => (
              <AppToast
                key={toast.id}
                id={toast.id}
                type={toast.type}
                body={toast.body}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}
