<template>
  <div class="translations">
    <h1>Translations Page</h1>
    <br />
    <br />

    <h4>Add New languange (code):</h4>
    <table class="table mb-5 w-50">
      <tbody>
        <tr>
          <td>
            <input
              class="fs-6 py-2 w-100"
              type="text"
              name="newLanguange"
              v-model="newLanguangeCode"
            />
          </td>
          <td>
            <button class="btn btn-success" @click="addNewLanguageCode">
              Add Language Code
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <h4>Add new translation</h4>
    <table class="table mb-5">
      <thead>
        <tr>
          <th>Code</th>
          <th v-for="lc of languageCodes" :key="lc">
            {{ lc.toUpperCase() }}
          </th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="py-2">
            <input
              class="fs-5 w-100"
              type="text"
              name="newTranslationCode"
              v-model="newTranslationCode"
            />
          </td>
          <td class="py-2" v-for="lc of languageCodes" :key="lc">
            <input
              class="fs-5 w-100"
              type="text"
              v-model="newTranslationTexts[lc]"
            />
          </td>
          <td>
            <button
              class="w-100 btn btn-success"
              @click="onAddNewTranslationCode"
            >
              Add
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <h4>Translations table</h4>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>CODE</th>
          <th v-for="lc of languageCodes" :key="lc">
            {{ lc.toUpperCase() }}
          </th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(texts, code) in translations" :key="code">
          <td>
            <input
              class="fs-5 w-100"
              type="text"
              :value="code"
              @keyup="
                textChanges.next({ code: code, newCode: $event.target.value })
              "
            />
          </td>
          <td class="p-2" v-for="lc in languageCodes" :key="lc">
            <input
              class="fs-5 w-100"
              type="text"
              v-model="texts[lc]"
              @keyup="textChanges.next({ code: code, lc: lc })"
            />
          </td>
          <td class="text-center">
            <button
              class="w-100 btn btn-danger"
              type="button"
              @click="onDelete(code)"
              v-if="!translations[code]['loading']"
            >
              Delete
            </button>

            <span v-if="translations[code]['loading'] == 'saving'"
              >Saving.</span
            >
            <span v-if="translations[code]['loading'] == 'saved'">Saved!</span>
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

export default class Categories extends Vue {
  fetchingTranslations = false;

  newLanguangeCode = "";
  newTranslationCode = "";
  newTranslationTexts = {};

  languageCodes: string[] = [];
  translations: {
    [key: string]: {
      [key: string]: {};
    };
  } = {};

  textChanges = new Subject();

  created() {
    this.fetchTranslations();

    this.textChanges.pipe(debounceTime(400)).subscribe((data: any) => {
      if (data.newCode) {
        this.onUpdateTranslationCode(data.code, data.newCode);
      } else {
        this.saveText(data.code, data.lc);
      }
    });
  }

  async fetchTranslations() {
    this.fetchingTranslations = true;
    console.log("Translations");
  }

  async addNewLanguageCode() {
    if (!this.newLanguangeCode) return;
    return;
  }

  onDelete(translationCode: string) {
    const conf = confirm("Delete translation for " + translationCode + "?");
    if (!conf) return;
    return;
  }

  onAddNewTranslationCode() {
    if (!this.newTranslationCode) {
      return alert("Please enter translation code");
    }

    if (this.translations[this.newTranslationCode]) {
      return alert("translation code already exists");
    }

    return;
  }

  onUpdateTranslationCode(code: string, newCode: string) {
    return;
  }

  async saveText(code: string, lc: string) {
    return;
  }
}
</script>
