<template>
  <div>
    <h2>Informes</h2>
    <br/><br/>
  <v-container>
    <v-toolbar class="mx-auto" flat> 

    <v-card class="" width="300" height="180" color="#E8E8EC">
      <v-card-text>
        <div>Platos Vendidos</div>
        <p class="display-1 text--primary">231</p>
        <div class="text--primary">Platos</div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="deep-purple accent-4"> Ver todos </v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="" width="300" height="180" color="#E8E8EC">
      <v-card-text>
        <div>Ordenes Finalizadas</div>
        <p class="display-1 text--primary">127</p>
        <div class="text--primary">Ordenes</div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="deep-purple accent-4"> Ver todos </v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="" width="300" height="180" color="#E8E8EC">
      <v-card-text>
        <div>Más Vendido</div>
        <p class="display-1 text--primary"> Carne Asada </p>
        <div class="text--primary"> 100 veces vendida</div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="deep-purple accent-4"> Ver todos</v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="" width="300" height="180" color="#E8E8EC">
      <v-card-text>
        <div>Ordenes Activas</div>
        <p class="display-1 text--primary">30</p>
        <div class="text--primary">Ordenes</div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="deep-purple accent-4"> Ver todos </v-btn>
      </v-card-actions>
    </v-card>
    </v-toolbar>
  </v-container>

  <br/><br/><br/>
  <h3>Mejores Meseros</h3>

    <v-card class="" width="350" height="70" color="#B9B4B3">
      <v-card-text>
        <span> Mesero A</span>
        <p>Mas Ordenes Despachadas</p>
      </v-card-text>
    </v-card>
<br/>
    <v-card class="" width="350" height="70" color="#B9B4B3">
      <v-card-text>
        <span class=""> Mesero B</span>
        <p>Mas Tiempo Trabajando</p>
      </v-card-text>
    </v-card>
<br/>
    <v-card class="" width="350" height="70" color="#B9B4B3">
      <v-card-text>
        <span> Mesero C</span>
        <p>Más Puntual</p>
      </v-card-text>
    </v-card>
  </div>
</template>
