import * as React from 'react'
import '../styles/bundle.css'
import { AppWrapper } from '../components/common/AppWrapper'
import { AppHeader } from '../components/common/AppHeader'
import app from '../externals/firebaseApp'
import { IndexLoadingContentLoader } from '../components/partials/index/IndexLoadingContent'
import { IndexUserContent } from '../components/partials/index/IndexUserContent'
import { IndexGuestContent } from '../components/partials/index/IndexGuestContent'

interface Props {}

interface State {
  user?: object
  isLoaded: boolean
}

class IndexPage extends React.Component<Props, State> {
  constructor(props, state) {
    super(props, state)
    this.state = {
      user: null,
      isLoaded: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      const user = app.auth().currentUser
      if (user) {
        this.setState({
          user: user ? user.toJSON() : null,
          isLoaded: true
        })
      }
    }, 0)
    setTimeout(() => {
      const user = app.auth().currentUser
      this.setState({
        user: user ? user.toJSON() : null,
        isLoaded: true
      })
    }, 3000)
    app.auth().onAuthStateChanged(u => {
      this.setState({
        user: u.toJSON(),
        isLoaded: true
      })
    })
  }

  render() {
    return (
      <AppWrapper>
        <AppHeader />
        {!this.state.isLoaded ? (
          <IndexLoadingContentLoader />
        ) : this.state.user ? (
          <IndexUserContent isActive={true} />
        ) : (
          <IndexGuestContent />
        )}
      </AppWrapper>
    )
  }
}

export default IndexPage
