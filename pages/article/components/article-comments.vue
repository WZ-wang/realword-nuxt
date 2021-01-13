<template>
  <div>
    <form @submit.prevent="sendMsg" class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="comment"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="$store.state.user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>
    <div v-for="item in comments" :key="item.id" class="card">
      <div class="card-block">
        <p class="card-text">{{ item.body }}</p>
      </div>
      <div class="card-footer">
        <nuxtLink
          :to="{ name: 'profile', params: { username: item.author.username } }"
          class="comment-author"
        >
          <img :src="item.author.image" class="comment-author-img" />
        </nuxtLink>
        &nbsp;
        <nuxtLink
          :to="{ name: 'profile', params: { username: item.author.username } }"
          class="comment-author"
          >{{ item.author.username }}</nuxtLink
        >
        <span class="date-posted">{{
          item.createdAt | date("MMM DD, YYYY")
        }}</span>
        <span class="date-posted"
          ><button
            v-if="item.author.username == $store.state.user.username"
            @click="delMsg(item.id)"
          >
            删除
          </button></span
        >
      </div>
    </div>
  </div>
</template>
<script>
import { getComments } from "@/api/home.js";
import { sendComment, delComment } from "@/api/comments.js";
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
      comments: [],
      comment: "",
    };
  },
  async mounted() {
      this.getMsg()
  },
  methods: {
    async getMsg() {
      const { data } = await getComments(this.article.slug);
      this.comments = data.comments;
    },
    async sendMsg() {
      if (this.comment && this.comment.trim()) {
        let { data } = await sendComment(this.article.slug, {
          comment: { body: this.comment },
        });
        if (data) {
          this.comments.unshift(data.comment);
          this.comment = "";
        }
      }
    },
    async delMsg(id) {
      let res = await delComment(this.article.slug, id);
      this.getMsg()
    },
  },
};
</script>