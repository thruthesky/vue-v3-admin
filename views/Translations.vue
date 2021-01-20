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
            <button
              class="btn btn-success w-100"
              @click="addTranslationLanguage"
            >
              Add Language
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="languages.length">
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
            <td v-for="ln of languages" :key="ln">
              <input
                class="fs-6 py-2 w-100"
                type="text"
                :placeholder="ln"
                v-model="newTranslation.translations[ln]"
              />
            </td>
            <td>
              <button class="btn btn-success w-100" @click="addTranslations">
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
          <th v-for="ln of languages" :key="ln" scope="col">
            {{ ln }}
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(values, code) of translations" :key="code">
          <td>
            <input
              class="fs-6 py-2 w-100"
              type="text"
              :value="translations[code].code"
              @keyup="
                textChanges.next({
                  loading: code,
                  oldCode: translations[code].code,
                  newCode: $event.target.value,
                })
              "
            />
          </td>
          <td v-for="ln of languages" :key="ln + '-' + code">
            <input
              class="fs-6 py-2 w-100"
              type="text"
              v-model="translations[code][ln]"
              @keyup="
                textChanges.next({
                  code: code,
                  language: ln,
                  value: $event.target.value,
                })
              "
            />
          </td>
          <td class="text-center">
            <button
              :disabled="translations[code]['loading']"
              :class="
                translations[code]['loading'] ? 'btn-secondary' : 'btn-danger'
              "
              class="w-100 btn"
              @click="deleteTranslation(code)"
            >
              {{
                translations[code]["loading"] == "saving"
                  ? "SAVING"
                  : translations[code]["loading"] == "saved"
                  ? "SAVED!"
                  : "DELETE"
              }}
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

  languages: string[] = [];
  translations: ApiTranslationList = {};
  newLanguageCode = "";
  newTranslation: ApiAddTranslations = {
    code: "",
    translations: {},
  };
  textChanges = new Subject();

  created() {
    this.fetchTranslations();

    this.textChanges
      .pipe(
        debounceTime(400)
        // , distinctUntilChanged()
      )
      .subscribe((data: any) => {
        if (data.newCode) {
          this.changeTranslationCode(data);
        } else {
          this.updateTranslation(data);
        }
      });
  }

  async fetchTranslations() {
    try {
      const re: any = await Api.listTranslations();
      this.translations = re.translations;
      this.languages = re.languages;
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
    this.languages.forEach(async (ln) => {
      const data: ApiEditTranslation = {
        code: this.newTranslation.code,
        language: ln,
        value: this.newTranslation.translations[ln],
      };
      try {
        const re = await Api.editTranslation(data);
        if (this.translations[data.code] == null) {
          this.translations[data.code] = {};
        }
        this.translations[data.code][ln] = data.value;
      } catch (e) {
        alert(e);
      }
    });
    console.log("translation added");
    this.newTranslation = {
      code: "",
      translations: {},
    };
  }

  async updateTranslation(data: ApiEditTranslation) {
    this.translations[data.code]["loading"] = "saving";

    try {
      const re = await Api.editTranslation(data);
      this.translations[data.code]["loading"] = "saved";
      setTimeout(() => {
        delete this.translations[data.code]["loading"];
        console.log("translation updated");
      }, 400);
    } catch (e) {
      alert(e);
    }
  }

  async changeTranslationCode(data: ApiChangeTranslationCode) {
    if (data.newCode.trim() === data.oldCode.trim()) return;
    this.translations[data.loading]["loading"] = "saving";
    try {
      const re = Api.changeTranslationCode(data);
      this.translations[data.loading]["loading"] = "saved";
      for (const [key, value] of Object.entries(this.translations)) {
        if (value.code === data.oldCode) {
          this.translations[key].code = data.newCode;
        }
      }
      setTimeout(() => {
        delete this.translations[data.loading]["loading"];
        console.log("translation updated");
      }, 400);
    } catch (e) {
      alert(e);
    }
  }

  async deleteTranslation(code: string) {
    const conf = confirm("Delete translation?");
    if (!conf) return;
    try {
      const re = await Api.deleteTranslation({ code: code });
      delete this.translations[code];
    } catch (e) {
      alert(e);
    }
  }
}
</script>
