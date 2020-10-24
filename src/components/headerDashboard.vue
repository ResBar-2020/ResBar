<template>
    <div>
        <v-parallax
                dark
                height="115"
                src="../assets/images/font.jpg"
        >
            <v-container fluid>
            <v-row dense
                   align="center"
                   justify="center"
            >
                <v-col
                        class="text-center "
                        cols="12"
                >
                    <h1 class="display-1 font-weight-thin mb-4">
                       <strong> {{title}} </strong>
                    </h1>
                    <h4 class="subheading">
                        {{subtitle}}
                    </h4>
                </v-col>
            </v-row>
            </v-container>
        </v-parallax>
    </div>
</template>

<script>
    export default {
        name: "headerDashboard",
        props: ['title','subtitle']
    }
</script>

<style scoped>

</style>