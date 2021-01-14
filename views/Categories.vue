<template>
  <div class="list">
    <h2>Categories page</h2>

    <h5 class="mt-5">New Category</h5>
    <table class="table mw-100 text-center">
      <tbody>
        <tr>
          <td>
            <input
              class="fs-5 w-100"
              placeholder="ID"
              type="text"
              v-model="newCategory.id"
            />
          </td>
          <td>
            <input
              class="fs-5 w-100"
              placeholder="Title"
              type="text"
              v-model="newCategory.title"
            />
          </td>
          <td>
            <input
              class="fs-5 w-100"
              placeholder="Description"
              type="text"
              v-model="newCategory.description"
            />
          </td>
          <td>
            <button class="btn btn-success w-100" type="button" @click="onCreate">Add Category</button>
          </td>
        </tr>
      </tbody>
    </table>

    <h4>Categories Table</h4>
    <table class="table table-striped mw-100">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">TITLE</th>
          <th scope="col">DESCRIPTION</th>
          <th scope="col">ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <td>{{ category.id }}</td>
          <td class="py-2">
            <input
              class="fs-5 w-100"
              type="text"
              v-model="category.title"
              @keyup="textChanges.next(category)"
            />
          </td>
          <td>
            <input
              class="fs-5 w-100"
              type="text"
              v-model="category.description"
              @keyup="textChanges.next(category)"
            />
          </td>
          <td class="space-between">
            <a
              class="btn btn-info w-50"
              v-if="!category['loading']"
              :href="'/admin/settings/forum/' + category.id"
              >Settings</a
            >
            <button
              class="btn btn-danger w-50"
              v-if="!category['loading']"
              type="button"
              @click="onDelete(category.id)"
            >
              Delete
            </button>
            <span v-if="category['loading'] == 'saving'">Saving!</span>
            <span v-if="category['loading'] == 'saved'">Saved!</span>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-show="fetchingCategories">Loading category list ..</p>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { AppService } from "../services/app.service";

export default class Categories extends Vue {
  app = new AppService();
  newCategory = {
    id: "",
    title: "",
    description: "",
  };

  categories: any[] = [];
  fetchingCategories = false;

  textChanges = new Subject();

  created() {
    this.fetchCategories();
  }

  async fetchCategories() {
    console.log('Categories');
  }

  async onCreate() {
    return;
  }

  async onSave(category: any) {
    return;
  }

  async onDelete(id: string) {
    return;
  }
}
</script>
