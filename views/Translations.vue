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
    <table class="table mb-5 w-100">
      <thead>
        <tr>
          <th scope="col">Code</th>
          <th v-for="ln of translations.languageCodes" :key="ln" scope="col">
            {{ ln }}
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, code) of translations.translations" :key="code">
          <!-- code -->
          <td>
            <input
              class="fs-6 py-2 w-100"
              type="text"
              name="code"
              v-model="value.code"
              @keyup="
                textChanges.next({
                  code: code,
                  new_code: $event.target.value,
                })
              "
            />
          </td>
          <!-- translations -->
          <td v-for="ln of translations.languageCodes" :key="ln">
            <input
              class="fs-6 py-2 w-100"
              type="text"
              v-model="translations.translations[code][ln]"
              @keyup="
                textChanges.next({
                  code: code,
                  language: ln,
                  value: $event.target.value,
                })
              "
            />
          </td>
          <td>
            <button class="btn btn-warning" @click="deleteTranslation(code)">
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
  ApiAddTranslation,
  ApiTranslationList,
  ApiUpdateTranslation,
} from "../services/api.service";

export default class Categories extends Vue {
  fetchingTranslations = false;

  translations: ApiTranslationList = {} as ApiTranslationList;
  newTranslation: ApiAddTranslation = {} as ApiAddTranslation;
  textChanges = new Subject();

  created() {
    this.fetchTranslations();

    this.textChanges.pipe(debounceTime(400)).subscribe((data: any) => {
      console.log(data);
      this.updateTranslation(data as ApiUpdateTranslation);
    });
  }

  async fetchTranslations() {
    try {
      const re = await Api.listTranslations();
      this.translations = re;
    } catch (e) {
      alert(e);
    }
  }

  async addTranslation() {
    try {
      const re = await Api.addTranslation(this.newTranslation);
      if (!this.translations.languageCodes.includes(re.language)) {
        this.translations.languageCodes.push(re.language);
      }

      if (!this.translations.translations[re.code]) {
        this.translations.translations[re.code] = {
          code: re.code,
        };
      }
      this.translations.translations[re.code][re.language] = re.value;
    } catch (e) {
      alert(e);
    }
  }

  async updateTranslation(data: ApiUpdateTranslation) {
    try {
      const re = await Api.updateTranslation(data);
    } catch (e) {
      alert(e);
    }
  }

  async deleteTranslation(code: string) {
    const conf = confirm("Delete translation?");

    if (!conf) return;

    try {
      const re = await Api.deleteTranslation({ code: code });
      delete this.translations.translations[code];
    } catch (e) {
      alert(e);
    }
  }
}
</script>
