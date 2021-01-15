<template>
  <div class="register-form">
    {{ api.loggedIn }}
    <form @submit.prevent="onSubmit">
      <div>
        Email
        <input type="email" name="email" v-model="form.user_email" />
      </div>
      <div>
        Password
        <input type="password" name="password" v-model="form.user_pass" />
      </div>

      <div>
        Nickname
        <input type="text" name="email" v-model="form.nickname" />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Api, ApiRegister } from "../services/api.service";

@Options({
  emits: ["success", "error"]
})
export default class RegisterForm extends Vue {
  form: ApiRegister = {} as ApiRegister;

  async onSubmit() {
    // console.log(this.form);
    try {
      const data = await Api.register(this.form);
      this.$emit("success", data);
    } catch (e) {
      this.$emit("error", e);
    }
  }
}
</script>

<style scoped lang="scss"></style>
