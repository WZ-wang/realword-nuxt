<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                v-model="user.image"
                class="form-control"
                type="text"
                placeholder="URL of profile picture"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <textarea
                v-model="user.bio"
                class="form-control form-control-lg"
                rows="8"
                placeholder="Short bio about you"
              ></textarea>
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.email"
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="newPassword"
                class="form-control form-control-lg"
                type="password"
                :placeholder="user ? 'new Password' : 'Password'"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Update Settings
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getUser, editUser } from "@/api/home";
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  name: "SettingsPage",
  middleware: "authenticated",
  async asyncData(context) {
    let newPassword = "";
    let res = await getUser();
    let { user } = res.data;
    return {
      newPassword,
      user,
    };
  },
  methods: {
    async onSubmit() {
      try {
        if (this.newPassword && this.newPassword != this.user.password) {
          this.user.password = this.newPassword;
        }
        let res = await editUser({ user: this.user });
        let { user } = res.data;
        Cookie.set("userAuth", user);
        this.$store.commit("setUser", user);
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>