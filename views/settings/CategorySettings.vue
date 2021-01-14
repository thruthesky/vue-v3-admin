<template>
  <div class="form">
    <h1>Forum Setting for: {{ category.id }}</h1>
    <div>
      Like:
      <span>
        <input type="checkbox" id="like" v-model="category.like" />
        <label for="like">{{ category.like ? "Enabled" : "Disabled" }}</label>
      </span>
    </div>
    <br />
    <div>
      Dislike:
      <span>
        <input type="checkbox" id="dislike" v-model="category.dislike" />
        <label for="dislike">{{
          category.dislike ? "Enabled" : "Disabled"
        }}</label>
      </span>
    </div>
    <br />
    <div>
      No of posts per each fetch: <br />
      <input
        type="number"
        id="postPerFetch"
        v-model.number="category['no-of-posts-per-fetch']"
      />
    </div>
    <br />
    <button type="button" @click="onSave">Submit</button>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class CategorySettings extends Vue {
  category: any = {
    "no-of-posts-per-fetch": 20,
  };
  fetchingCategories = false;

  created() {
    this.fetchCategory();
  }
  
  async fetchCategory() {
    console.log("Category settings");
  }

  async onSave() {
    return;
  }
}
</script>

<style lang="scss" scoped>
.form {
  text-align: left;
}
</style>
