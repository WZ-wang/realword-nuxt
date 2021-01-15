<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">wz-realword-nuxt</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{ active: tabName == 'your_feed' }"
                  :to="{ name: 'home', query: { tab: 'your_feed' } }"
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{ active: tabName == 'global_feed' }"
                  :to="{ name: 'home', query: { tab: 'global_feed' } }"
                  >Global Feed</nuxt-link
                >
              </li>
              <li v-if="tag" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{ active: tabName == 'tag' }"
                  :to="{ name: 'home', query: { tab: 'tag', tag: tag } }"
                  >#{{ tag }}</nuxt-link
                >
              </li>
            </ul>
          </div>
          <div
            v-for="item in articles"
            :key="item.createdAt"
            class="article-preview"
          >
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: { username: item.author.username },
                }"
                ><img :src="item.author.image"
              /></nuxt-link>
              <div class="info">
                <nuxt-link
                  :to="{
                    name: 'profile',
                    params: { username: item.author.username },
                  }"
                  class="author"
                  >{{ item.author.username }}</nuxt-link
                >
                <span class="date">{{
                  item.createdAt | date("MMM DD, YYYY")
                }}</span>
              </div>
              <button
                :disabled="item.favoriteDisabled"
                @click="onfavorite(item)"
                :class="{ active: item.favorited }"
                class="btn btn-outline-primary btn-sm pull-xs-right"
              >
                <i class="ion-heart"></i> {{ item.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              :to="{
                name: 'article',
                params: {
                  slug: item.slug,
                },
              }"
              class="preview-link"
            >
              <h1>{{ item.title }}</h1>
              <p>{{ item.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <!-- 分页 -->
          <nav>
            <ul class="pagination">
              <li
                v-for="numb in totalPages"
                :key="numb"
                class="page-item"
                :class="{
                  active: numb === page,
                }"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: {
                      page: numb,
                      tag: $route.query.tag,
                      tab: tabName,
                    },
                  }"
                >
                  {{ numb }}
                </nuxt-link>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <nuxt-link
                v-for="item in tagsData"
                :key="item"
                :to="{ name: 'home', query: { tab: 'tag', tag: item } }"
                class="tag-pill tag-default"
                >{{ item }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { login } from "@/api/user.js";
import { mapState } from "vuex";
import { requestAll } from "@/plugins/request.js";
import {
  getTags,
  getArticles,
  getYourFeedArticles,
  favorite,
  nofavorite,
} from "@/api/home.js";
export default {
  name: "HomePage",
  watchQuery: ["page", "tag", "tab"],
  async asyncData({ query }) {
    const tabName = query.tab || "global_feed";
    const page = Number.parseInt(query.page) || 1;
    const limit = 10;
    const getArticlesData =
      tabName === "your_feed" ? getYourFeedArticles : getArticles;
    let [articlesData, alltagsData] = await requestAll([
      getArticlesData({
        limit: limit,
        offset: (page - 1) * limit,
        tag: query.tag,
      }),
      getTags(),
    ]);
    let tagsData = Array.isArray(alltagsData.data.tags)
      ? alltagsData.data.tags.filter(item => item)
      : [];
    let { articles, articlesCount } = articlesData.data;
    // let tagsData = await getTags();
    // 防止重复点击
    articles.forEach((article) => {
      article.favoriteDisabled = false;
    });
    return {
      tabName,
      articles,
      articlesCount,
      tagsData,
      tag: query.tag,
      page,
      limit,
    };
  },
  computed: {
    ...mapState(["user"]),
    totalPages() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
  methods: {
    async onfavorite(article) {
      article.favoriteDisabled = true;
      if (article.favorited) {
        await nofavorite(article.slug);
        article.favorited = false;
        article.favoritesCount += -1;
      } else {
        await favorite(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }
      article.favoriteDisabled = false;
    },
  },
};
</script>