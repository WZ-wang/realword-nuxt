<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <articleMete :article="article"></articleMete>
      </div>
    </div>
    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>
      <hr />
      <div class="article-actions">
        <articleMete :article="article"></articleMete>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <comments :article="article"></comments>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MarkdownIt from "markdown-it";
import { articleDetail } from "@/api/home.js";
import comments from "./components/article-comments.vue";
import articleMete from "./components/article-mete.vue";
export default {
  name: "ArticlePage",
  async asyncData({ params }) {
    let res = await articleDetail(params.slug);
    let { article } = res.data;
    const md = new MarkdownIt();
    article.body = md.render(article.body);
    return {
      article,
    };
  },
  head() {
    return {
      title: `${this.article.title} - realword`,
      meta: [
        {
          hid: "description",
          content: this.article.description,
          name: "description",
        },
      ],
    };
  },
  components: {
    comments,
    articleMete,
  },
};
</script>