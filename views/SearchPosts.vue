<template>
  <section class="search-posts pt-5">
    <h1>Search Posts</h1>
    <form @submit.prevent="onSubmit">
      <div>
        <input v-model="keyword" />
      </div>
      <button class="form-submit" type="submit">submit</button>
    </form>

    <div v-for="post of posts" :key="post.objectID">
      {{ post.objectID }}
      {{ post.title }}
      {{ post.content }}
      {{ post.stamp }}
    </div>
  </section>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";

export default class SearchPosts extends Vue {
  keyword = "";

  client: any;
  index: any;

  posts: any = [];

  created() {
    console.log('search posts')
    // this.client = algoliasearch(
    //   Settings.get("ALGOLIA_APP_ID"),
    //   Settings.get("ALGOLIA_SEARCH_ONLY_API_KEY")
    // );
    // this.index = this.client.initIndex(Settings.get("ALGOLIA_INDEX_NAME"));
  }
  onSubmit() {
    // console.log("keword: ", this.keyword);

    // const requestOptions = {
    //   headers: { "X-Algolia-UserToken": "user123" }
    // };

    // this.index.search(this.keyword, requestOptions).then((re: any) => {
    //   this.posts = re.hits;

    //   console.log(this.posts);
    // });
  }
}
</script>
