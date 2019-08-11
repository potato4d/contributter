import * as React from 'react'

export const AppSpinner: React.FC = () => (
  <div className="flex items-center justify-center">
    <div className="lds-ripple">
      <div></div>
      <div></div>
    </div>
  </div>
)
