import { v4 as uuid } from 'uuid'

export interface ToastData {
  id: string
  life?: number
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
        life: ~~(new Date().getTime() * 0.001) + 4,
        ...payload
      })
    })
  }
}
export const ToasterEmitter = new Emitter()
