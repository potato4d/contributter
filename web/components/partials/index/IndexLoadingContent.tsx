import * as React from 'react'
import { AppSpinner } from '../../common/AppSpinner'

export const IndexLoadingContentLoader: React.FC = () => (
  <div className="p-4">
    <AppSpinner />
  </div>
)
