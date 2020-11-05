<template>
  <v-app>
    <v-main>
      <v-card width="500" class="mx-auto mt-16" elevation="10">
        <v-card-title class="primary white--text justify-center">
          Inicia sesión en Resbar
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Nombre de usuario"
            prepend-icon="mdi-account-circle"
            v-model="user.loggin"
          />
          <v-text-field
            label="Contraseña"
            v-model="user.clave"
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
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      showPassword: false,
      user: {
        loggin: "",
        clave: "",
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
      this.$router.go("/ordenes");
    },
  },
  created() {
    this.user = {
      loggin: "",
      clave: "",
    };
  },
};
</script>
<style scoped>
.v-main{
  background: url('../../assets/images/bg.jpg');
  background-size: cover;
}
.v-card{
    position: absolute;
    top: 20%;
    left: 30%;
    transform: translate(-30%, -30%);
    width: 400px;
}


</style>