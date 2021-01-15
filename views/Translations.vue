<template>
  <div class="translations">
    <h1>Translations Page</h1>
    <br />
    <br />

    <h4>Add Translation</h4>
    <table class="table mb-5 w-100">
      <tbody>
        <tr>
          <td>
            <input
              class="fs-6 py-2 w-100"
              type="text"
              placeholder="Language"
              v-model="newTranslation.language"
            />
          </td>
          <td>
            <input
              class="fs-6 py-2 w-100"
              type="text"
              placeholder="Code"
              v-model="newTranslation.code"
            />
          </td>
          <td>
            <input
              class="fs-6 py-2 w-100"
              type="text"
              placeholder="Text"
              v-model="newTranslation.value"
            />
          </td>
          <td>
            <button class="btn btn-success" @click="addTranslation">
              Add Translation
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 
    {{ translations }} -->

    <table class="table mb-5 w-100">
      <tbody>
        <tr
          v-for="(translation, index) of translations"
          :key="translation.code"
        >
          <td>ID: <br />{{ translation.ID }}</td>
          <td>
            <span> code </span>
            <input
              class="fs-6 py-2 w-100"
              type="text"
              v-model="translations[index].code"
            />
            {{ translation }}
          </td>
          <td
            v-for="(value, key) of translations[index].translations"
            :key="key + value"
          >
            <input class="fs-6 py-2 w-100" type="text" :value="value" />
          </td>
          <td>
            <button class="btn btn-success" @click="updateTranslation(index)">
              Update
            </button>
            <button class="btn btn-warning" @click="deleteTranslation(index)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import {
  Api,
  ApiEditTranslation,
  ApiTranslation,
} from "../services/api.service";

export default class Categories extends Vue {
  fetchingTranslations = false;

  newTranslation: ApiEditTranslation = {} as ApiEditTranslation;

  textChanges = new Subject();

  translations: ApiTranslation[] = [];

  created() {
    this.fetchTranslations();
  }

  async fetchTranslations() {
    return;
  }

  async addTranslation() {
    try {
      const re = await Api.addTranslation(this.newTranslation);

      // this.translations.push(re);
      console.log("Success adding translation :", re);
    } catch (e) {
      console.error(e);
    }
  }

  async updateTranslation(index: number) {
    console.log(this.translations[index]);
    try {
      const re = await Api.updateTranslation(this.translations[index]);
      console.log("Success updating translation :", re);
    } catch (e) {
      console.error(e);
    }
  }

  async deleteTranslation(index: number) {
    const conf = confirm("Delete translation?");

    if (!conf) return;

    try {
      const re = await Api.deleteTranslation(this.translations[index]);
      this.translations.splice(index, 1);
    } catch (e) {
      console.error(e);
    }
  }
}
</script>
