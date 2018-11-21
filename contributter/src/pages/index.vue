<template>
  <div class="home">
    <h1 class="text-xl2 text-center">Contributter</h1>
    <p class="leading-loose w-3/4 mx-auto my-4 text-center text-shadow">
      Contributterは、毎日0時にあなたの前日のGitHub上 Contribution
      countを呟くWebサービスです。<br />
      Twitter OAuthで連携し、GitHub IDを入力するだけで、計測を開始できます。
    </p>
    <div class="text-center pb-4">
      <button
        type="button"
        class="border-white border-solid border px-4 py-3 rounded text-white hover:bg-green-light"
        style="transition: all 0.2s ease-out;"
      >
        計測をはじめる
      </button>
    </div>
    <div class="flex flex-wrap items-stretch justify-between">
      <TweetCard
        class="w-1/3"
        v-for="number in 30"
        :key="Math.random() + number"
        v-bind="user"
      />
    </div>
    <div class="text-center font-bold text-sm mt-1 underline">
      <a href="https://twitter.com/potato4d" class="text-white no-underline">
        &copy; 2018 potato4d
      </a>
    </div>
  </div>
</template>

<script>
// ~ is an alias to /src
import TheLogo from '~/components/TheLogo.vue'
import TweetCard from '~/components/TweetCard.vue'

export default {
  name: 'home',
  components: {
    TweetCard,
    TheLogo
  },
  computed: {
    user() {
      return {
        userName: 'potato4d',
        photoURL: 'https://potato4d.me/icon.png',
        tweetURL: 'https://twitter.com/potato4d/status/1065100800924381185',
        tweetDate: '2018/11/20',
        contributionCount: 10
      }
    }
  }
}
</script>
