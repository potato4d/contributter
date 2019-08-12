import * as React from 'react'
import { AppAlertIcon } from './AppIcons'
import { ToastData, ToasterEmitter } from '../../externals/toastEmitter'

interface AppToasterState {
  toasts: ToastData[]
}

const AppToast: React.FC<ToastData> = props => (
  <div
    data-toast-id={props.id}
    className="mb-4 toast shadow bg-blue-500 rounded-sm p-4 text-white text-sm flex items-center justify-start font-bold"
  >
    <div className="w-4 h-4 mr-2">
      <AppAlertIcon />
    </div>
    {props.body}
  </div>
)

export class AppToaster extends React.Component<{}, AppToasterState> {
  constructor(props, state) {
    super(props, state)
    this.state = {
      toasts: []
    }
    this.handleAddToastData = this.handleAddToastData.bind(this)
    ToasterEmitter.on(payload => {
      this.handleAddToastData(payload)
    })
  }

  handleAddToastData(payload: ToastData) {
    this.setState({
      toasts: [...this.state.toasts, payload]
    })
  }

  render() {
    return (
      <div className="z-50 fixed w-full left-0 top-0">
        <div className="container p-8 mx-auto">
          <div className="w-64 mx-auto">
            {this.state.toasts.map(toast => (
              <AppToast id={toast.id} type={toast.type} body={toast.body} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}
