<template>
  <div class="login-form">
    <small class="form-hint">Please login</small>
    <h1 class="form-title">Login</h1>
    <form @submit.prevent="onSubmit">
      <div>
        <div class="form-label">Email</div>
        <input type="email" name="email" v-model="form.user_email" />
      </div>
      <div>
        <div class="form-label">Password</div>
        <input type="password" name="password" v-model="form.user_pass" />
      </div>
      <button class="form-submit" type="submit">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { ApiLogin } from "../services/api.interfaces";
import { Api } from "../services/api.service";
@Options({
  emits: ["success", "error"]
})
export default class LoginForm extends Vue {
  form: ApiLogin = {} as ApiLogin;

  async onSubmit() {
    try {
      const data = await Api.login(this.form);
      this.$emit("success", data);
    } catch (e) {
      this.$emit("error", e);
    }
  }
}
</script>

<style scoped lang="scss"></style>
