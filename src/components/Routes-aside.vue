<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant.sync="mini"
    permanent
    color="#01579b"
    app
    dark
  >
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img src="../assets/logo.svg"></v-img>
      </v-list-item-avatar>

      <v-list-item-title>{{ username }}</v-list-item-title>

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

    <div class="mx-8 bg px-5 py-1">
      <v-switch
        v-model="$vuetify.theme.dark"
        inset
        color="white"
        label="Dark Mode"
      ></v-switch>
    </div>
    <div class="pa-2" v-show="!mini">
      <v-btn @click="logout" block class="black--text white">Logout</v-btn>
    </div>
  </v-navigation-drawer>
</template>


<script>
import { mapState } from "vuex";
import Swal from "sweetalert2";

export default {
  props: ["items"],
  data() {
    return {
      drawer: true,
      mini: true,
    };
  },
  methods: {
    logout() {
      Swal.fire({
        title: "¿Seguro que quiere salir?",
        showDenyButton: true,
        confirmButtonText: `Salir`,
        denyButtonText:'Cancelar'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          localStorage.removeItem("rol");
          localStorage.removeItem("username");
          this.$router.go("Login");
        }
      });
    },
  },
  computed: {
    ...mapState(["username"]),
  },
};
</script>