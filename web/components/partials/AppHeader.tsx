import * as React from 'react'

export const AppHeader: React.FC = () => (
  <div className="text-center">
    <img
      src="/static/assets/logo.svg"
      alt=""
      className="mx-auto pb-4"
      width="64"
    />
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
