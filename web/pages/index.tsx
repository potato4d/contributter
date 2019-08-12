import * as React from 'react'
import '../styles/bundle.css'
import { AppWrapper } from '../components/common/AppWrapper'
import { AppHeader } from '../components/common/AppHeader'
import firebaseApp, { fetchUser } from '../externals/firebaseApp'
import app from '../externals/firebaseApp'
import { IndexLoadingContentLoader } from '../components/partials/index/IndexLoadingContent'
import { IndexUserContent } from '../components/partials/index/IndexUserContent'
import { IndexGuestContent } from '../components/partials/index/IndexGuestContent'
import { UserData } from '../types/firestore'

interface Props {}

interface State {
  user?: UserData
  isLoaded: boolean
  isSubscribedUser: boolean
}

class IndexPage extends React.Component<Props, State> {
  constructor(props, state) {
    super(props, state)
    this.state = {
      user: null,
      isLoaded: false,
      isSubscribedUser: false
    }

    this.setUserData = this.setUserData.bind(this)
  }

  componentDidMount() {
    setTimeout(() => {
      const user = app.auth().currentUser
      if (user) {
        this.setUserData(user)
      }
    }, 0)
    setTimeout(() => {
      const user = app.auth().currentUser
      this.setUserData(user)
    }, 3000)
    app.auth().onAuthStateChanged(u => {
      this.setUserData(u)
    })
  }

  subscribeUser() {
    const firestore = firebaseApp.firestore()
    const userRef = firestore.collection('users').doc(this.state.user!.uid)
    userRef.onSnapshot(snapshot => {
      const user: UserData = snapshot.data() as UserData
      console.log(user.enabled)
      this.setState({
        user
      })
    })
  }

  async setUserData(firebaseUser: firebase.User | null) {
    if (!firebaseUser) {
      this.setState({
        user: null,
        isLoaded: true
      })
      this.subscribeUser()
      return
    }
    const user = await fetchUser(firebaseUser.uid)

    if (user) {
      this.setState({
        user,
        isLoaded: true
      })
    } else {
      this.setState({
        user: null,
        isLoaded: true
      })
    }
    this.subscribeUser()
  }

  render() {
    return (
      <AppWrapper>
        <AppHeader />
        {!this.state.isLoaded ? (
          <IndexLoadingContentLoader />
        ) : this.state.user ? (
          <IndexUserContent user={this.state.user} />
        ) : (
          <IndexGuestContent />
        )}
      </AppWrapper>
    )
  }
}

export default IndexPage
