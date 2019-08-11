import * as React from 'react'

export const AppWrapper: React.FC = ({ children }) => (
  <div className="bg-gray-900 text-gray-200 w-full h-screen flex items-center justify-center">
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
)
