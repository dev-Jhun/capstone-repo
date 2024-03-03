<template>
  <v-container fluid>
    <br />
    <br />
    <br />
    <br />
    <v-card>
      <br />
      <v-spacer></v-spacer>
      <v-card-title class="text-center">
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <span
          class="fontweight-bold display 2"
          style="font-weight: bold; font-size: 30px"
        >
          CROP DETAILED INFORMATION
        </span>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-row>
          <v-col>
            <v-btn to="/plants" color="primary" @click="dialog = false"
          >Back</v-btn
        >
          </v-col>
        </v-row>
      </v-card-title>
      <br>
      <br>

      <v-data-table
        :headers="headers"
        :items="crops"
        hide-default-footer
      ></v-data-table>
    </v-card>
  </v-container>
</template>
  
  <script>
export default {
  layout: "default",
  data() {
    return {
      crops: [],
      search: "",
      headers: [
        {
          text: "CROP NUMBER",
          align: "start",
          value: "attributes.plant_no",
        },
        { text: "CROP NAME", value: "attributes.plant_name" },
        { text: "CROP VARIATION", value: "attributes.plant_variation" },
        { text: "SUGGESTED CROP TEMPERATURE", value: "attributes.plant_temp" },
        { text: "SUGGESTED CROP HUMIDITY", value: "attributes.plant_humid" },
        { text: "SUGGESTED CROP TDS LEVEL", value: "attributes.tds_level" },
        { text: "SUGGESTED CROP PH LEVEL", value: "attributes.ph_level" },
        {
          text: "SUGGESTED HYDROPONIC WATER TEMPERATURE",
          value: "attributes.water_temp",
        },
      ],
    };
  },

  // PlantDetails.vue
  methods: {
    getPlantDetails() {
      console.log(`Plant Details Page`);
      this.$axios
        .get(`/api/plant-infos/${this.$route.params.id}`)
        .then((response) => {
          console.log(response.data);
          if (Array.isArray(response.data.data)) {
            this.crops = response.data.data;
          } else {
            // If it's not an array, convert it to an array or handle it accordingly
            this.crops = [response.data.data];
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  mounted() {
    this.getPlantDetails();
  },
};
</script>
