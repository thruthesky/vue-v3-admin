<template>
  <div class="p-3">
    <h2>
      Category:
      <select v-model="search.category" @change="onSearch()">
        <option value="">All</option>
        <option v-for="category of categories" :key="category">
          {{ category }}
        </option>
      </select>
    </h2>
    <br />

    <!-- post create -->
    <post-create-component
      :category="search.category"
      :categories="categories"
      @on-created="onPostCreated($event)"
    ></post-create-component>
    <hr />
    <!-- delete selected button / search bar -->
    <div class="d-flex mt-5">
      <button
        style="margin-right: 1.5em"
        type="button"
        @click="onDeleteAll()"
        :disabled="!selectedPostIDs.length"
      >
        DELETE SELECTED
      </button>
      <input
        style="margin-right: 0.5em"
        type="text"
        placeholder="Search User ID"
        v-model="search.uid"
      />
      <button type="button" @click="onSearch()">Search</button>
    </div>

    <!-- posts table -->
    <table class="mt-5 table table-striped table-sm mw-100">
      <thead>
        <tr>
          <th scope="col">
            <label for="select-all">
              <input
                type="checkbox"
                name="select-all"
                id="select-all"
                @change="onSelectAll($event.target.checked)"
                :checked="selectedPostIDs.length == posts.length"
              />
              All</label
            >
          </th>
          <th scope="col">Post ID / User ID / Category</th>
          <th scope="col">Title / Content</th>
          <th scope="col">Files</th>
          <th scope="col">ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="post in posts"
          :key="post.id"
          style="border-bottom: 1px solid black"
        >
          <td>
            <input type="checkbox" :value="post.id" v-model="selectedPostIDs" />
          </td>
          <post-component :post="post" @on-deleted="onDeleted($event)" />
        </tr>
      </tbody>
    </table>
    <br />
    <p v-if="fetching">loading posts ...</p>
    <p v-if="noMorePosts">No more posts ...</p>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

import PostCreateComponent from "../components/Post-create-component.vue";
import PostComponent from "../components/Post-component.vue";

@Options({
  components: {
    PostComponent,
    PostCreateComponent
  }
})
export default class Posts extends Vue {

  uploadProgress = 0;
  limit = 30;

  search = {
    uid: "",
    category: ""
  };

  selectedPostIDs: string[] = [];
  categories: string[] = [];
  posts: any[] = [];

  fetchingCategories = false;
  fetching = false;
  noMorePosts = false;

  async created() {
    this.fetchPosts();
    this.fetchCategories();
    window.addEventListener("scroll", this.handleScroll);
  }

  async fetchCategories() {
    console.log('fetch categories');
  }

  onSearch() {
    this.posts = [];
    this.noMorePosts = false;
    this.fetchPosts();
  }

  async fetchPosts() {
    console.log('Posts');
  }

  handleScroll(e: any) {
    const bottomOfWindow =
      document.documentElement.scrollTop + window.innerHeight >
      document.documentElement.offsetHeight - 200;

    if (bottomOfWindow) {
      this.fetchPosts();
    }
  }

  onSelectAll(checked: boolean) {
    this.selectedPostIDs = [];
    if (checked) {
      this.posts.forEach((post) => this.selectedPostIDs.push(post.id));
    }
  }

  onPostCreated(post: any) {
    this.posts.unshift(post);
  }

  onDeleted(id: string) {
    const idx = this.posts.findIndex((post) => post.id == id);
    this.posts.splice(idx, 1);
  }

  onDeleteAll() {
    const conf = confirm("Delete selected posts?");

    if (!conf) return;

    this.selectedPostIDs = [];
    return;
  }
}
</script>

<style lang="scss" scoped>
.posts-table {
  width: 100%;
  tr {
    padding: 0.25em !important;
  }

  tr > th {
    border: 1px solid black;
  }
}
</style>
