<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant.sync="mini"
    permanent
    color="primary"
    app
    dark
  >
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img src="../assets/logo.svg"></v-img>
      </v-list-item-avatar>

      <v-list-item-title>{{username}}</v-list-item-title>

      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item v-for="item in items" :key="item.title" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-btn text :to="item.route">{{ item.title }}</v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2" v-show="!mini">
        <v-btn @click="logout" block>Logout</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>


<script>
import { mapState } from "vuex";
export default {
  props: ["items"],
  data() {
    return {
      drawer: true,
      mini: true
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("rol");
      this.$router.go("Login");
    }
  },
  computed: {
    ...mapState(["username"])
  }
};
</script>