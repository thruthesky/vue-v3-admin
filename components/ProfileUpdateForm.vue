<template>
  <div class="profile-update-form">
    <h2>ID : {{ api.user?.ID }}</h2>
    <h2>Email : {{ api.user?.user_email }}</h2>
    <h2>Session ID : {{ api.user?.session_id }}</h2>
    <br />
    <h1 class="form-title">Update Profile</h1>
    <form @submit.prevent="onSubmit">
      <div>
        <div class="form-label fs-3">Nickname</div>
        <input type="text" name="nickname" v-model="form.nickname" />
      </div>
      <button class="form-submit" type="submit">Update</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Api, ApiUpdateProfile } from "../services/api.service";
@Options({
  emits: ["success", "error"]
})
export default class ProfileUpdateForm extends Vue {
  form: ApiUpdateProfile = {} as ApiUpdateProfile;

  created() {
    // this.form.session_id = Api.user.session_id;
    this.form.nickname = Api.user.nickname;
  }

  async onSubmit() {
    // console.log(this.form);
    try {
      const data = await Api.profileUpdate(this.form);
      this.$emit("success", data);
    } catch (e) {
      this.$emit("error", e);
    }
  }
}
</script>

<style scoped lang="scss"></style>
