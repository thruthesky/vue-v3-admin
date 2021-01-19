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

    <!-- Translation table -->
    <!-- {{ translations }} -->
    <table class="table table-striped mb-5 w-100">
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
        <tr
          v-for="(translation, index) of translations.translations"
          :key="index"
        >
          <!-- code -->
          <td>
            <input
              class="fs-6 py-2 w-100"
              type="text"
              name="code"
              :value="translations.translations[index].code"
              @keyup="
                textChanges.next({
                  code: translations.translations[index].code,
                  new_code: $event.target.value,
                })
              "
            />
          </td>
          <!-- translations -->
          <td class="p-2" v-for="ln of translations.languageCodes" :key="ln">
            <input
              class="fs-6 py-2 w-100"
              type="text"
              v-model="translations.translations[index][ln]"
              @keyup="
                textChanges.next({
                  code: translations.translations[index].code,
                  language: ln,
                  value: $event.target.value,
                })
              "
            />
          </td>
          <td class="text-center">
            <button
              class="w-100 btn btn-danger"
              @click="deleteTranslation(translations.translations[index].code)"
            >
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

  translations: ApiTranslationList = {
    translations: {},
    languageCodes: [],
  } as ApiTranslationList;
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
      Object.assign(this.translations, re);
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

      if (this.translations.translations[re.code]) {
        this.translations.translations[re.code][re.language] = re.value;
      } else {
        this.translations.translations[re.code] = {
          code: re.code,
          [re.language]: re.value,
        };
      }
      this.newTranslation = {} as any;
    } catch (e) {
      alert(e);
    }
  }

  async updateTranslation(data: ApiUpdateTranslation) {
    this.translations.translations[data.code]["loading"] = "saving";

    try {
      const re = await Api.updateTranslation(data);
      for (const [key, value] of Object.entries(
        this.translations.translations
      )) {
        if (value.code == data.code) {
          this.translations.translations[key].code = re.code;
          this.translations.translations[key]["loading"] = "saved";
        }
        setTimeout(() => {
          delete this.translations.translations[re.code]["loading"];
        }, 500);
      }
    } catch (e) {
      alert(e);
    }
  }

  async deleteTranslation(code: string) {
    const conf = confirm("Delete translation?");
    if (!conf) return;
    try {
      const re = await Api.deleteTranslation({ code: code });
      for (const [key, value] of Object.entries(
        this.translations.translations
      )) {
        if (value.code == re.code) delete this.translations.translations[key];
      }
    } catch (e) {
      alert(e);
    }
  }
}
</script>
