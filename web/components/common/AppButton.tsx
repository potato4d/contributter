import * as React from 'react'

interface Props {
  onClick: () => void
}

export const AppButton: React.FC<Props> = ({ onClick, children }) => (
  <div className="flex flex-col items-center">
    <div
      onClick={() => onClick()}
      className="px-3 py-2 cursor-pointer text-center inline-flex items-center justify-center hover:decoration-underline text-white text-sm rounded-sm font-bold bg-blue-800 hover:bg-blue-600"
    >
      {children}
    </div>
  </div>
)
