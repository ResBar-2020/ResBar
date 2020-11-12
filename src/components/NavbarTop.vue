<template>
  <div>
    <v-app-bar class="d-block d-md-none primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-btn color="primary">
        <v-icon>mdi-account</v-icon>
        <small>{{ username }}</small>
      </v-btn>
      <v-btn @click="logout" icon>
        <v-icon>mdi-power</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute top temporary color="primary">
      <v-list nav dense class="text--white">
        <v-list-item-group
          v-model="group"
          active-class="blue darken-1"
        >
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-btn text :to="item.route">{{ item.title }}</v-btn>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  //TODO Agregar props para recibir las rutas
  props: ["items"],
  data() {
    return {
      drawer: false,
      group: null,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("rol");
      localStorage.removeItem("username");
      this.$router.go("Login");
    },
  },
  computed: {
    ...mapState(["username"]),
  },
};
</script>
<style scoped>
.v-btn--outlined .v-btn__content .v-icon,
.v-btn--round .v-btn__content .v-icon {
  color: #fff;
}
.theme--light.v-btn {
    color: #fff;
}
.theme--light.v-icon {
    color: #fff;
}
.v-list-item-group .v-list-item--active {
    color: #fff;
}
</style>