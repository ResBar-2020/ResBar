<template>
  <v-app>
    <v-main>
      <div v-for="idioma in idiomas" :key="idioma._id">
        <v-card class="mx-auto mt-16" elevation="10">
          <v-card-title
            class="primary white--text justify-center text-uppercase"
          >
            {{ idioma.layouts[0].labels.title }}
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                :label="idioma.layouts[0].labels.username"
                prepend-icon="mdi-account-circle"
                v-model="user.loggin"
                :rules="validRules"
                autocomplete="off"
              />
              <v-text-field
                :label="idioma.layouts[0].labels.password"
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
              >{{idioma.layouts[0].labels.loginError}}</label
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
                  >{{ idioma.layouts[0].labels.submit }}</v-btn
                >
              </v-col>
            </v-row>
          </v-card-actions>
          <v-row justify="center" no-gutters>
            <v-col class="py-4 text-center marg" cols="12">
              <span class="copyrigth">{{idioma.layouts[0].labels.copyrigth}}</span>
            </v-col>
          </v-row>
        </v-card>
      </div>
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
      idiomasName: [],
      user: {
        loggin: "",
        clave: "",
      },
      validRules: [(v) => !!v || "El campo es requerido"],
    };
  },
  methods: {
    ...mapActions(["authenticate", "getIdioma"]),

    validate() {
      this.$refs.form[0].validate()
    },
  },
  computed: {
    ...mapState(["username"]),
    ...mapGetters(["error", "idiomas"]),
  },
  watch: {
    username: function () {
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
.v-btn:hover {
  box-shadow: 0 10px 45px #01579b;
}
.copyrigth {
  text-shadow: 0 5px 10px rgba(0, 0, 0, 0.6);
}
.marg {
  margin-top: -25px;
}

.v-main {
  background: url("../../assets/images/background.jpg");
  background-size: cover;
}
.v-card {
  position: absolute;
  top: 25%;
  left: 15%;
  transform: translate(-30%, -30%);
  width: 35em;
}
.errorLogin {
  color: red;
  text-shadow: 0 0 20px red;
}
@media screen and (max-width: 960px){
  .v-card{
    transform: translate(-10%, -30%);
    width: 20em;
  }
}
</style>