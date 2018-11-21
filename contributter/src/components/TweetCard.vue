<template>
  <div class="no-decoration p-3">
    <a
      :href="tweetURL"
      target="_blank"
      rel="noopener"
      class="p-3 bg-white rounded shadow hover:bg-grey-lightest block"
    >
      <div class="flex">
        <div class="w-12" style="min-width: 3rem;">
          <img class="w-12 h-12 rounded" :src="photoURL" :alt="userName" />
        </div>
        <div class="text-grey-darker ml-2">
          <span class="font-bold">{{ userName }}</span
          ><br />
          <span class="text-sm mt-2 inline-block leading-normal"
            >{{ tweetDate }} の<br />Contribution 数は
            {{ contributionCount }} でした。</span
          >
        </div>
      </div>
    </a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    userName: String,
    photoURL: String,
    tweetURL: String,
    tweetDate: String,
    contributionCount: String
  }
})
</script>
