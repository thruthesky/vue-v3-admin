<template>
  <span v-for="path in paths" :key="path">
    <a :href="'/admin/photos/' + path">
      {{ path }}
    </a>
    |
  </span>
  <br /><br />

  <div class="grid">
    <div v-for="photo of photos" :key="photo.uid" class="image-holder">
      <a :href="'/admin/users/' + photo.uid">View Owner</a>
      <div class="photo position-relative">
        <img :src="photo.url" class="image" />
        <button
          class="position-absolute top left"
          type="button"
          @click="onClickDelete(photo.url)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class Posts extends Vue {
  limit = 20;
  paths = ["forum-photos", "user-profile-photos"];

  photos: any[] = [];
  loading = false;
  noMorePhotos = false;
  nextPageToken: string | null = null;

  created() {
    this.fetchImages();
    window.addEventListener("scroll", this.handleScroll);
  }

  get path(): string {
    return this.$route.params["path"] as string;
  }

  async fetchImages() {
    console.log('Photos');
  }

  handleScroll(e: any) {
    const bottomOfWindow =
      document.documentElement.scrollTop + window.innerHeight >
      document.documentElement.offsetHeight - 200;

    if (bottomOfWindow) {
      this.fetchImages();
    }
  }

  async onClickDelete(url: string) {
    return;
  }
}
</script>

<style lang="scss" scoped>
.image-holder {
  box-sizing: border-box;
  padding: 0.25em;
}

@media screen and (min-width: 1200px) {
  .image-holder {
    width: 10%;
  }
}

@media screen and (max-width: 1200px) {
  .image-holder {
    width: 25%;
  }
}

@media screen and (max-width: 900px) {
  .image-holder {
    width: 33%;
  }
}

@media screen and (max-width: 500px) {
  .image-holder {
    flex: 50%;
  }
}

.image {
  width: 100%;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
}
</style>
