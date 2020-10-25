<template>
  <v-app>
    <routesAside :items="items"></routesAside>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import routesAside from "../Routes-aside.vue";

export default {
  data: () => ({
    items: [
      { title: "Ordenes", route: "/ordenes", icon: "mdi-clipboard-text" },
      { title: "Domicilio", route: "/domicilio", icon: "mdi-truck" },
      {
        title: "Clientes",
        route: "/clientes",
        icon: "mdi-account-box-multiple"
      },
      { title: "Productos", route: "/productos", icon: "mdi-food" },
      { title: "Categorias", route: "/categorias", icon: "mdi-sitemap" },
      { title: "Informes", route: "/informes", icon: "mdi-chart-line" },
      { title: "Usuarios", route: "/usuarios", icon: "mdi-account-group" },
      {
        title: "Bitacoras",
        route: "/bitacoras",
        icon: "mdi-book-open-page-variant"
      },
      {
        title: "Parametros",
        route: "/parametros",
        icon: "mdi-format-paragraph"
      }
    ]
  }),
  components: { routesAside }
};
</script>