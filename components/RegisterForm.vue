<template>
  <div class="register-form">
    <form @submit.prevent="onSubmit">
      <div>
        Email
        <input type="email" name="email" v-model="form.email" />
      </div>
      <div>
        Password
        <input type="password" name="password" v-model="form.password" />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script lang="ts">

import { Vue, Options } from "vue-class-component";

@Options({
  emits: ["success", "error"]
})
export default class RegisterForm extends Vue {
  form: any = {};

  async onSubmit() {
    console.log(this.form);
    return;
  }
}
</script>

<style scoped lang="scss"></style>
