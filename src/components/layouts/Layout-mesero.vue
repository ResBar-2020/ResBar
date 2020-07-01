<template>
  <v-app>
  
   <routesAside :items="items"></routesAside>

    <v-main>
      <v-container class="fill-height" fluid>
        <router-view/>
      </v-container>
    </v-main>

    <v-footer dark padless>
      <v-row justify="center"  no-gutters> 
        <v-col class="py-4 text-center white--text" cols="12">Copyright © Diseño I 2020</v-col>
      </v-row>
    </v-footer>
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