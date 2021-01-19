<template>
  <div class="translations">
    <h1>Translations Page</h1>
    <br />
    <br />

    <h4>Add Language</h4>
    <table class="table table-striped mb-5 w-50">
      <tbody>
        <tr>
          <td>
            <input
              class="fs-6 py-2 w-100"
              type="text"
              placeholder="Language code"
              v-model="newLanguageCode"
            />
          </td>
          <td>
            <button class="btn btn-success" @click="addTranslationLanguage">
              Add Translation
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="languageCodes.length">
      <h4>Add Translation</h4>
      <table class="table mb-5 w-100">
        <tbody>
          <tr>
            <td>
              <input
                class="fs-6 py-2 w-100"
                type="text"
                placeholder="Translation Code"
                v-model="newTranslation.code"
              />
            </td>
            <td v-for="ln of languageCodes" :key="ln">
              <input
                class="fs-6 py-2 w-100"
                type="text"
                :placeholder="ln"
                v-model="newTranslation.translations[ln]"
              />
            </td>
            <td>
              <button class="btn btn-success" @click="addTranslations">
                Add Translation
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <h4>Translation Table</h4>
    <table class="table table-striped mb-5 w-100">
      <thead>
        <tr>
          <th scope="col">Code</th>
          <th v-for="ln of languageCodes" :key="ln" scope="col">
            {{ ln }}
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="code of translationCodes" :key="code">
          <td>
            <input
              class="fs-6 py-2 w-100"
              type="text"
              :value="code"
              @keyup="
                textChanges.next({
                  oldCode: code,
                  newCode: $event.target.value,
                })
              "
            />
          </td>
          <td v-for="ln of languageCodes" :key="ln">
            <input
              class="fs-6 py-2 w-100"
              type="text"
              v-model="translations[ln][code]"
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
            <button
              class="w-100 btn btn-danger"
              @click="deleteTranslation(code)"
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
import { Api } from "../services/api.service";
import {
  ApiAddTranslations,
  ApiChangeTranslationCode,
  ApiEditTranslation,
  ApiTranslationList,
} from "../services/api.interfaces";

export default class Categories extends Vue {
  fetchingTranslations = false;

  translations: ApiTranslationList = {};
  newLanguageCode = "";
  newTranslation: ApiAddTranslations = {
    code: "",
    translations: {},
  };
  textChanges = new Subject();

  get languageCodes() {
    return Object.keys(this.translations);
  }

  get translationCodes() {
    const codes: any = {};
    this.languageCodes.forEach((ln) => {
      Object.assign(codes, this.translations[ln]);
    });

    return Object.keys(codes);
  }

  created() {
    this.fetchTranslations();

    this.textChanges.pipe(debounceTime(400)).subscribe((data: any) => {
      if (data.newCode) {
        this.changeTranslationCode(data);
      } else {
        this.updateTranslation(data);
      }
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

  async addTranslationLanguage() {
    if (!this.newLanguageCode.trim()) {
      alert("PLEASE INPUT LANGUAGE");
    }

    try {
      const re = await Api.addTranslationLanguage({
        language: this.newLanguageCode,
      });
      this.translations[this.newLanguageCode] = {};
      this.newLanguageCode = "";
      alert("Language Added!");
    } catch (e) {
      alert(e);
    }
  }

  async addTranslations() {
    this.languageCodes.forEach(async (ln) => {
      const data: ApiEditTranslation = {
        code: this.newTranslation.code,
        language: ln,
        value: this.newTranslation.translations[ln],
      };

      try {
        const re = await Api.editTranslation(data);
        this.translations[ln][data.code] = data.value;
      } catch (e) {
        alert(e);
      }
    });
    this.newTranslation = {
      code: "",
      translations: {},
    };
  }

  async updateTranslation(data: ApiEditTranslation) {
    try {
      const re = await Api.editTranslation(data);

      alert("Translations updated!");
    } catch (e) {
      alert(e);
    }
  }

  async changeTranslationCode(data: ApiChangeTranslationCode) {
    // console.log("change code", data);
    try {
      const re = Api.changeTranslationCode(data);
      this.languageCodes.forEach((ln) => {
        if (this.translations[ln][data.oldCode]) {
          this.translations[ln][data.newCode] = this.translations[ln][
            data.oldCode
          ];
          delete this.translations[ln][data.oldCode];
        }
      });
      alert("Translation code updated!");
    } catch (e) {
      alert(e);
    }
  }

  async deleteTranslation(code: string) {
    const conf = confirm("Delete translation?");
    if (!conf) return;
    try {
      const re = await Api.deleteTranslation({ code: code });
      this.languageCodes.forEach((ln) => {
        delete this.translations[ln][code];
      });
    } catch (e) {
      alert(e);
    }
    alert("Translations deleted!");
  }
}
</script>
