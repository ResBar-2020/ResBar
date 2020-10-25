
<template>
  <v-app>
    <v-main>
      <v-container class="fill-height fondoBG" fluid >
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4" >
            <v-card class="elevation-12" >
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    disabled
                    id="loggin"
                    v-model="user.username"
                    label="Login"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    disabled
                    id="password"
                    v-model="user.password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                  <v-text-field
                    id="pin"
                    v-model="user.pin"
                    label="Pin"
                    name="pin"
                    prepend-icon="mdi-numeric"
                    type="text"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="secondary">Cancelar</v-btn>
                <v-btn
                  color="primary"
                  @click="authenticate(user)"
                  @keyup.enter="authenticate(user)"
                >Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>


<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
        pin: ""
      }
    };
  },
  methods: {
    ...mapActions(["authenticate"])
  },
  computed: {
    ...mapState(["username"])
  },
  watch: {
    username: function() {
      this.$router.go("Ordenes");
    }
  },
  created() {
    this.user = {
      loggin: "",
      clave: "",
      pin: ""
    };
  }
};
</script>
