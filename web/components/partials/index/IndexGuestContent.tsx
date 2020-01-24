import * as React from 'react'
import { IndexGuestOAuthButton } from './GuestContent/IndexGuestOAuthButton'

export const IndexGuestContent: React.FC = () => (
  <div>
    <div className="w-1/2 mx-auto">
      <p className="text-shadow text-center text-sm py-4 leading-loose">
        Contributter はあなたの毎日の GitHub 活動をちょっと楽しくする Web
        サービスです。
        <br />
        毎日 0
        時に貢献数が呟かれることにより、やる気アップや競争のきっかけとして活用できます。
        Twitter OAuth で連携し、GitHub ID を入力するだけで、計測を開始できます。
      </p>
    </div>
    <IndexGuestOAuthButton />
  </div>
)
