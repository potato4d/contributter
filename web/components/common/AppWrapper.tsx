import * as React from 'react'
import Head from 'next/head'
import { AppToaster } from './AppToaster'

export const AppWrapper: React.FC = ({ children }) => (
  <React.Fragment>
    <Head>
      <title>Contributter</title>
      <meta
        name="description"
        content="GitHub contributions meets Twitter."
      />
      <meta
        name="viewport"
        content="width=device-width"
      />
    </Head>
    <div className="bg-gray-900 text-gray-200 w-full h-screen flex items-center justify-center">
      <AppToaster />
      <div className="container p-8 mx-auto">
        <div
          style={{
            minHeight: '330px'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  </React.Fragment>
)
