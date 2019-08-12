import * as React from 'react'

interface Props {
  onClick: () => void
  disabled?: boolean
}

export const AppButton: React.FC<Props> = ({
  onClick,
  children,
  disabled = false
}) => (
  <div className="flex flex-col items-center">
    <button
      type="button"
      onClick={() => {
        if (!disabled) {
          onClick()
        }
      }}
      disabled={disabled}
      className={(() => {
        let classes =
          'appearance-none px-3 py-2 text-center inline-flex items-center justify-center hover:decoration-underline text-white text-sm rounded-sm font-bold'
        if (disabled) {
          classes += ' cursor-auto bg-gray-800'
        } else {
          classes += ' cursor-pointer bg-blue-800 hover:bg-blue-600'
        }
        return classes
      })()}
    >
      {children}
    </button>
  </div>
)
