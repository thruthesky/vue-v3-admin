<template>
  <small class="hint"
    >To add new settings, simply submit the form with key and value.</small
  >
  <form @submit.prevent="onSubmit">
    <input type="text" v-model="form.field" placeholder="Setting Key" />
    <input type="text" v-model="form.value" placeholder="Setting Value" />
    <button type="submit">Save</button>
  </form>

  <table class="table">
    <thead>
      <tr>
        <th scope="col"># Name</th>
        <th scope="col">Value (editable)</th>
        <th scope="col">Buttons</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="key of Object.keys(settings).sort()" :key="key">
        <td>{{ key }}</td>
        <td>
          <form @submit.prevent="onUpdate(key)">
            <input type="text" v-model="settings[key]" />
            <button type="submit">Save</button>
            <button type="button" @click="onDelete(key)">Delete</button>
          </form>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class AppSettings extends Vue {

  form: any = {};
  settings: any = {};

  created() {
    console.log('APp settings')
  }

  onSubmit() {
    // this.col.doc("app").set(
    //   {
    //     [this.form.field]: this.form.value
    //   },
    //   { merge: true }
    // );
    // this.form = {};
    return;
  }

  onUpdate(field: string) {
    // this.col.doc("app").set(
    //   {
    //     [field]: this.settings[field]
    //   },
    //   { merge: true }
    // );
    return;
  }

  onDelete(field: string) {
    // this.col.doc("app").set(
    //   {
    //     [field]: firebase.firestore.FieldValue.delete()
    //   },
    //   { merge: true }
    // );
    return;
  }
}
</script>
