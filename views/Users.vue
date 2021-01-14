<template>
  <div class="about">
    <h1>User list in /users collection</h1>

    <div class="py-4">
      <button class="m-2" @click="onSelectAllUsers">
        {{ checkbox.length ? "Deselect selected users" : "Select all users" }}
      </button>
      <button
        :disabled="!checkbox.length"
        class="m-2"
        @click="onDeleteSelectedUsers"
      >
        Delete selected users
      </button>
      <input
        class="fs-6"
        type="text"
        placeholder="Search by UID"
        name="uid"
        v-model="uid"
      />
      <button class="m-2" @click="search()">Search</button>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Photo</th>
          <th scope="col">UID / Display Name / Greeting</th>
          <th scope="col">Firstname</th>
          <th scope="col">Lastname</th>
          <th scope="col">Buttons</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.uid">
          <td>
            <input
              type="checkbox"
              :id="user.uid"
              :value="user.uid"
              v-model="checkbox"
            />
          </td>
          <td>
            <img v-if="user.photoURL" :src="user.photoURL" class="avatar" />
          </td>
          <td>
            <div class="sm">{{ user.uid }}</div>
            <div class="md bold">{{ user.displayName }}</div>
            <div class="sm grey">{{ user.greeting ?? "" }}</div>
          </td>
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>
            <button type="button" @click="onDelete(user.uid)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="fetching">loading users ...</p>
    <p v-if="noMoreUsers">No more users ...</p>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
export default class Users extends Vue {
  limit = 30;
  users: any[] = [];
  fetching = false;
  noMoreUsers = false;

  checkbox: any = [];
  lastSnapshot: any;
  uid: any = "";

  search() {
    console.log('Users');
    this.users = [];
    this.noMoreUsers = false;
    this.lastSnapshot = null;
    if (this.uid == "") {
      this.fetchUsers();
    } else {
      this.fetchUser();
    }
  }

  async fetchUser() {
    return;
  }

  async fetchUsers() {
    return;
  }

  async fetchPublicData(uid: string) {
    return;
  }

  async created() {
    window.addEventListener("scroll", this.handleScroll);
  }

  handleScroll(e: any) {
    const bottomOfWindow =
      document.documentElement.scrollTop + window.innerHeight >
      document.documentElement.offsetHeight - 200;

    if (bottomOfWindow) {
      this.fetchUsers();
    }
  }

  onDelete(uid: string) {
    return;
  }
  onDeleteSelectedUsers() {
    const conf = confirm("Delete Selected Users?");
    if (!conf) return;
    const uids = this.checkbox;
    this.onDelete(uids);
  }
  onSelectAllUsers() {
    if (this.checkbox.length) {
      this.checkbox = [];
    } else {
      this.users.forEach((user) => {
        this.checkbox.push(user.uid);
      });
    }
  }
}
</script>

<style lang="scss" scoped></style>
