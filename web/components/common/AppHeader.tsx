import * as React from 'react'
import { AppLogo } from './AppLogo'

export const AppHeader: React.FC = () => (
  <div className="text-center">
    <div className="mx-auto pb-4 w-16">
      <AppLogo />
    </div>
    <h1
      style={{
        fontFamily: 'Futura'
      }}
      className="text-bold text-2xl"
    >
      Contributter
    </h1>
  </div>
)
