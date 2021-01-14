<template>
  <div class="border p-3">
    <div>
      <select class="mx-3" v-if="!category" v-model="newPostData.category">
        <option disabled value="">Category</option>
        <option v-for="category of categories" :key="category">
          {{ category }}
        </option>
      </select>
    </div>
    <!-- title -->
    <b>Title</b>
    <input
      type="text"
      name="title"
      id="title"
      v-model="newPostData.title"
      class="mb-3 w-100"
    />
    <!-- content -->
    <div>
      <b>Content</b>
      <textarea
        name="content"
        id="content"
        v-model="newPostData.content"
        class="mb-3 w-100"
        style="min-height: 150px;"
      />
    </div>
    <!-- files -->
    <div v-if="newPostData.files.length" class="d-flex m-2">
      <div
        v-for="url in newPostData.files"
        :key="url"
        class="position-relative"
        style="width: 150px; height: 150px"
      >
        <img :src="url" style="width: 100%; height: 100%" />
        <button
          type="button"
          class="position-absolute top left"
          @click="onClickDeleteFile(url)"
        >
          DELETE
        </button>
      </div>
    </div>
    <!-- buttons -->
    <div class="d-flex">
      <input
        type="file"
        name="image_upload"
        id="image_upload"
        v-on:change="onImageChanged($event)"
      />
      <button class="btn-success" type="button" @click="onCreate()">
        Create
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import PostComponent from "./Post-component.vue";

@Options({
  props: ["category", "categories"],
  emits: ["on-created"]
})
export default class PostsCreateComponent extends Vue {

  categories!: string[];
  category!: string;
  post!: string;

  forumPhotosFolder = "forum-photos";

  newPostData: any = {
    title: "",
    content: "",
    category: "",
    files: []
  };

  created() {
    console.log('post-create-component')
  }

  async onCreate() {
    this.newPostData.title = "";
    this.newPostData.content = "";
    this.newPostData.files = [];
    return;
  }

  async onImageChanged(event: any) {
    const file: File = event.target.files[0];
    console.log(file);
    return;
  }

  async onClickDeleteFile(url: string) {
    return;
  }
}
</script>
