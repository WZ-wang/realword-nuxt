<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
          <p class="text-xs-center">
            <nuxt-link :to="isLogin ? '/register' : '/login'"
              >{{ isLogin ? "Need an account?" : "Have an account?" }}
            </nuxt-link>
          </p>
          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages" :key="index">
                {{ field }} {{ message }}
              </li>
            </template>
          </ul>
          <form @submit.prevent="onSubmit">
            <template v-if="!isLogin">
              <fieldset class="form-group">
                <input
                  v-model="user.username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  required
                />
              </fieldset>
            </template>
            <fieldset class="form-group">
              <input
                v-model="user.email"
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                required
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { login, register } from "@/api/user.js";
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  middleware: 'notAuthenticated',
  name: "LoginPage",
  computed: {
    isLogin() {
      return this.$route.name === "login";
    },
  },
  data() {
    return {
      user: {
        email: "1760004853@qq.com",
        password: "1760004853@qq.com",
        username: "wz_test",
      },
      errors: {},
    };
  },
  asyncData(context) {},
  methods: {
    async onSubmit() {
      try {
        let { data } = this.isLogin
          ? await login({ user: this.user })
          : await register({ user: this.user });
        Cookie.set("userAuth", data.user);
        this.$store.commit("setUser", data.user);
        this.$router.push("/")
      } catch (error) {
        this.errors = error.response.data.errors;
      }
    },
  },
};
</script>