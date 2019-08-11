import * as React from 'react'

interface Props {
  circleWidth?: string
  circleHeight?: string
  className?: string
}

export const AppCircle: React.FC<Props> = ({
  circleWidth = '12px',
  circleHeight = '12px',
  className = ''
}: Props) => (
  <div
    style={{
      margin: '2px',
      width: circleWidth,
      height: circleHeight,
      borderRadius: '50%',
      display: 'inline-block'
    }}
    className={className}
  ></div>
)
