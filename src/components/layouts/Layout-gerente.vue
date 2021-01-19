<template>
  <v-app>
    <navbar-top :items="items"/>
    <routesAside class="d-none d-md-inline-block" :items="items"></routesAside>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
    <v-footer dark padless>
      <v-row justify="center" no-gutters>
        <v-col class="py-4 text-center white--text" cols="12"
          >Copyright © Diseño I 2020</v-col
        >
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import routesAside from "../Routes-aside.vue";
import NavbarTop from "../NavbarTop"

export default {
  data: () => ({
    items: [
      { title: "Ordenes", route: "/", icon: "mdi-clipboard-text" },
      { title: "Domicilio", route: "/domicilio", icon: "mdi-truck" },
      { title: "Recoger", route: "/recoger", icon: "mdi-car" },
      {
        title: "Clientes",
        route: "/clientes",
        icon: "mdi-account-box-multiple",
      },
      { title: "Admin Productos", route: "/productos", icon: "mdi-hamburger" },
      { title: "Categorias", route: "/categorias", icon: "mdi-sitemap" },
      { title: "Informes", route: "/informes", icon: "mdi-chart-line" },
      { title: "Usuarios", route: "/usuarios", icon: "mdi-account-group" },
      {
        title: "Bitacoras",
        route: "/bitacoras",
        icon: "mdi-book-open-page-variant",
      },
      {
        title: "Parametros",
        route: "/parametros",
        icon: "mdi-format-paragraph",
      },
      { title: "Menú", route: "/menuProductos", icon: "mdi-food" },
    ],
  }),
  components: { routesAside, NavbarTop},
};
</script>
<style scoped>
.container{
  padding: 0;
}
.v-main{
  padding: 0 !important;
}
@media screen and (min-width: 960px){
  .v-main{
    padding: 0 0 0 56px !important;
  }
}
</style>