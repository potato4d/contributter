<template>
  <div class="home">
    <h1 class="text-xl2 text-center">Contributter</h1>
    <div class="text-center mt-4">
      <img
        :src="user.photoURL"
        :alt="user.userName"
        class="
          w-24 h-24
          rounded-full
          border-2 border-solid border-white
          mx-auto
        "
      /><br />
      <strong class="block text-center font-bold text-xl mt-2">{{
        user.userName
      }}</strong>
    </div>
    <template v-if="isSelf">
      <div class="w-2/3 mx-auto px-3 mt-4">
        <form class="px-3 bg-green-dark py-4 rounded">
          <h2 class="text-xl mb-4">
            User settings<span class="text-sm"> (only visible you)</span>
          </h2>
          <p>
            <label class="font-bold text-sm mb-2 block"
              >Twitter ID (Can't change)</label
            >
            <input
              :value="`@${user.userName}`"
              :readonly="true"
              type="text"
              class="border-white border-solid bg-transparent w-full outline-none border px-3 py-3 rounded text-white"
            />
          </p>
          <p class="mt-4">
            <label class="font-bold text-sm mb-2 block">GitHub ID</label>
            <input
              :placeholder="user.gitHubId"
              type="text"
              class="border-white border-solid bg-transparent w-full outline-none border px-3 py-3 rounded text-white focus:bg-green"
              :style="{
                transition: 'all 0.15s ease-out'
              }"
            />
          </p>
          <p class="mt-4 text-right">
            <button
              type="button"
              class="border-white border-solid border px-3 py-3 rounded text-white text-xs hover:bg-green"
              style="transition: all 0.2s ease-out;"
            >
              設定を反映する
            </button>
          </p>
        </form>
      </div>
    </template>

    <div class="w-2/3 mx-auto"><h2 class="text-xl mt-4 ml-3">History</h2></div>
    <div class="w-2/3 mx-auto">
      <TweetCard
        v-for="number in 30"
        :key="Math.random() + number"
        v-bind="user"
        :isBr="false"
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
import TweetCard from '~/components/TweetCard.vue'

const NG_NAMES = ['about', 'policy', 'tos', 'settings']

export default {
  name: 'home',
  components: {
    TweetCard
  },
  beforeRouteEnter(to, from, next) {
    if (!to.path.startsWith('/@')) {
      next('/')
    }
    const path = to.path.replace('/@', '')
    if (NG_NAMES.includes(path)) {
      next('/')
    }
    next()
  },
  computed: {
    isSelf() {
      return true
    },
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
