<template>
  <div>
    <div class="article-meta">
      <nuxtLink
        :to="{ name: 'profile', params: { username: article.author.username } }"
        ><img :src="article.author.image"
      /></nuxtLink>
      <div class="info">
        <nuxtLink
          :to="{
            name: 'profile',
            params: { username: article.author.username },
          }"
          class="author"
          >{{ article.author.username }}</nuxtLink
        >
        <span class="date">{{ article.createdAt | date("MMM DD, YYYY") }}</span>
      </div>
      <button class="btn btn-sm btn-outline-secondary">
        <i class="ion-plus-round"></i>
        &nbsp; Follow {{ article.author.username }}
        <span class="counter">({{ article.favoritesCount }})</span>
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{ active: article.favorited }"
      >
        <i class="ion-heart"></i>
        &nbsp; Favorite Post
        <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </div>
  </div>
</template>
<script>
import { getComments } from "@/api/home.js";
export default {
  name: "ArticleComments",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
    };
  },
  async mounted() {
  },
};
</script>