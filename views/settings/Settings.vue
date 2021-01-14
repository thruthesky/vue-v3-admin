<template>
  <div class="settings">
    <h1>
      Settings
    </h1>
    <div class="d-flex">
      <router-link
        class="btn btn-secondary"
        to="/admin/settings/app"
        role="button"
        >App Settings</router-link
      >

      <router-link
        class="ms-2 btn btn-secondary"
        to="/admin/settings/forum/forum"
        role="button"
        >Global Forum Settings</router-link
      >
    </div>
    <br />
    <br />
    <table class="table">
      <thead>
        <tr>
          <th scope="col"># ID</th>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Buttons</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category of categories" :key="category.id" class="item">
          <td>
            {{ category.id }}
          </td>
          <td>{{ category.title }}</td>
          <td>{{ category.description }}</td>
          <td>
            <router-link :to="'/admin/settings/forum/' + category.id"
              >Edit Settings</router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
    <p v-show="fetchingCategories">Fetching other category settings ...</p>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class Categories extends Vue {

  categories: any[] = [];
  fetchingCategories = false;

  async fetchCategories() {
    console.log('Settings');
  }

  created() {
    this.fetchCategories();
  }
}
</script>

<style lang="scss" scoped>
.settings {
  text-align: left;
  padding: 0.5em;
}

.item {
  margin-bottom: 1em;
}
</style>
