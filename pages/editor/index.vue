<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input v-model="article.title" type="text" class="form-control form-control-lg"
                  placeholder="Article Title">
              </fieldset>
              <fieldset class="form-group">
                <input type="text" required v-model="article.description" class="form-control"
                  placeholder="What's this article about?">
              </fieldset>
              <fieldset class="form-group">
                <textarea required class="form-control" v-model="article.body" rows="8"
                  placeholder="Write your article (in markdown)"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input required type="text" v-model="article.tag" class="form-control" placeholder="Enter tags">
                <div class="tag-list"></div>
              </fieldset>
              <button @click="onSubmit" class="btn btn-lg pull-xs-right btn-primary" type="button">
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import {
    addArticle
  } from '@/api/home'
  export default {
    name: "EditorPage",
    middleware: "authenticated",
    data() {
      return {
        article: {
          title: "",
          description: "",
          body: "",
          tag: "",
          taglist: []
        }
      }
    },
    methods: {
      async onSubmit() {
        try {
          if (this.article.tag) {
            this.article.taglist.push(this.article.tag)
          }
          let {
            data
          } = await addArticle({
            article: this.article
          })
          if(data.article){
            this.$router.push({name:'article',params:{slug:data.article.slug}})
          }
        } catch (error) {

        }
      },
    }
  }
</script>