<template>
  <v-app>
    <v-main>
      <v-card width="500" class="mx-auto mt-16" elevation="10">
        <v-card-title class="primary white--text justify-center text-uppercase">
          Resbar
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              label="Nombre de usuario"
              prepend-icon="mdi-account-circle"
              v-model="user.loggin"
              :rules="validRules"
              autocomplete="off"
            />
            <v-text-field
              label="Contraseña"
              v-model="user.clave"
              :rules="validRules"
              :type="showPassword ? 'text' : 'password'"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            />
          </v-form>
        </v-card-text>
        <div class="text-center">
          <label v-if="error" class="errorLogin"
            >El usuario y la contraseña no coinciden</label
          >
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-row>
            <v-col class="marg" cols="12">
              <v-btn
                class="mx-auto my-3"
                color="primary"
                @click="
                  validate();
                  authenticate(user);
                "
                @keyup.enter="authenticate(user)"
                >Iniciar Sesión</v-btn
              >
            </v-col>
          </v-row>
        </v-card-actions>
        <v-row justify="center"  no-gutters> 
        <v-col class="py-4 text-center marg" cols="12">
          <span class="copyrigth">Copyright © Diseño I 2020</span>
          </v-col>
      </v-row>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      valid: true,
      showPassword: false,
      idiomasName:[],
      user: {
        loggin: "",
        clave: "",
      },
      validRules: [(v) => !!v || "El campo es requerido"],
    };
  },
  methods: {
    ...mapActions(["authenticate","getIdioma"]),
    
    validate() {
      this.$refs.form.validate();
    },
  },
  computed: {
    ...mapState(["username"]),
    ...mapGetters(["error","idiomas"]),
  },
  watch: {
    username: function () {
      this.$router.push({name: "Ordenes"});
      this.$router.go();
    },
  },
  created() {
    this.getIdioma();
    this.user = {};
  },
};
</script>
<style scoped>
.v-btn:hover{
  box-shadow: 0 10px 45px #01579b;
}
.copyrigth{
  text-shadow: 0 5px 10px rgba(0, 0, 0, 0.6);
}
.marg{
  margin-top: -25px;
}

.v-main {
  background: url("../../assets/images/bg.jpg");
  background-size: cover;
}
.v-card {
  position: absolute;
  top: 20%;
  left: 30%;
  transform: translate(-30%, -30%);
  width: 400px;
}
.errorLogin {
  color: red;
  text-shadow: 0 0 20px red;
}
</style>