import * as React from 'react'
import '../styles/bundle.css'
import { AppWrapper } from '../components/partials/AppWrapper';
import { AppHeader } from '../components/partials/AppHeader';
import { OAuthButton } from '../components/partials/index/OAuthButton';

const Index: React.FC = () => (
  <AppWrapper>
    <AppHeader />
    <div>
      <div className="w-1/2 mx-auto">
        <p className="text-shadow text-center text-sm py-4">
          Contributter は毎日 0 時にあなたが前日 GitHub 上で行った貢献の数を呟いてくれる Web App です。<br />
          Twitter OAuth で連携し、GitHub ID を入力するだけで、計測を開始できます。
            </p>
      </div>
    </div>
    <OAuthButton />
  </AppWrapper>
)

export default Index
