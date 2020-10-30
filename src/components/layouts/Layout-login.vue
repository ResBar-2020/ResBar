<template>
  <v-app>
    <v-content>
      <v-card width="500" class="mx-auto mt-16" elevation="10">
        <v-card-title class="primary white--text justify-center">
          Inicia sesión en Resbar
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Nombre de usuario"
            prepend-icon="mdi-account-circle"
          />
          <v-text-field
            label="Contraseña"
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            class="mx-auto my-3"
            color="primary"
            @click="authenticate(user)"
            @keyup.enter="authenticate(user)"
            >Iniciar Sesión</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      showPassword: false,
      user: {
        username: "",
        password: "",
        pin: "",
      },
    };
  },
  methods: {
    ...mapActions(["authenticate"]),
  },
  computed: {
    ...mapState(["username"]),
  },
  watch: {
    username: function() {
      this.$router.go("Ordenes");
    },
  },
  created() {
    this.user = {
      loggin: "",
      clave: "",
      pin: "",
    };
  },
};
</script>
