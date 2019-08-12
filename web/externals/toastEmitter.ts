import { v4 as uuid } from 'uuid'

export interface ToastData {
  id: string
  type: 'info' | 'error'
  body: string
}

class Emitter {
  private subscribers: any[] = []

  on(subscribeFunction: (payload: ToastData) => any) {
    this.subscribers.push(subscribeFunction)
  }

  dispatch(payload: { type: string; body: string }) {
    this.subscribers.forEach(event => {
      event({
        id: uuid(),
        ...payload
      })
    })
  }
}
export const ToasterEmitter = new Emitter()
