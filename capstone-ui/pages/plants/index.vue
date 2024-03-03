<template>
  <v-container fluid>
    <v-row>
      <v-col align="right">
        <v-btn to="/presets" color="primary"
          ><v-icon>mdi-plus</v-icon>PRESETS</v-btn
        >
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            List of Plant
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table :headers="headers" :items="info" :search="search">
            <template slot="item.actions" slot-scope="{ item }">
              <v-layout align-center justify-center>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-flex>
                  <v-btn dark :to="`/plants/${item.id}`" color="#43A047" class="ml-2"
                    ><v-icon left>mdi-eye</v-icon>VIEW</v-btn
                  >
                </v-flex>
                <v-flex>
                  <v-btn
                    dark
                    color="#01579B"
                    @click="plantCrop(item)"
                    class="ml-2"
                    ><v-icon left>mdi-leaf</v-icon>PLANT</v-btn
                  >
                </v-flex>
                <v-flex>
                  <v-btn :to="`/plants/${item.id}/edit`" dark color="purple" class="ml-2"
                    ><v-icon left>mdi-pencil</v-icon>Edit</v-btn
                  >
                </v-flex>
                <v-flex>
                  <v-btn @click="showDeleteDialog(item.id)" dark color="#D32F2F" class="ml-2"
                    ><v-icon left>mdi-trash-can</v-icon>REMOVE</v-btn
                  >
                </v-flex>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
              </v-layout>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" width="400">
      <v-sheet
        class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block"
        color="blue-grey darken-3"
        dark
      >
        <div class="grey--text text--lighten-1 text-body-2 mb-4">
          Are you sure you want to delete this Data?
        </div>

        <v-btn class="ma-1" color="grey" plain @click="dialog = false">
          Cancel
        </v-btn>

        <v-btn class="ma-1" color="error" plain @click="deleteData()">
          Delete
        </v-btn>
      </v-sheet>
    </v-dialog>

    <v-snackbar v-model="successSnackbar" color="success" timeout="3000">
      Planting successful!
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="successSnackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
  
  <script>
export default {
  layout: "default",

  data() {
    return {
      search: "",
      successSnackbar: false,
      headers: [
        {
          text: "Plant Number",
          align: "start",
          sortable: false,
          value: "attributes.plant_no",
        },
        { text: "Plant Name", value: "attributes.plant_name" },
        { text: "Plant Variation", value: "attributes.plant_variation" },
        { text: "", value: "actions" },
      ],
      info: [],
      dialog: false,
      plant_no: null,
    };
  },

  methods: {
    getPlantInfo() {
      this.$axios
        .get(`/api/plant-infos`)
        .then((response) => {
          this.info = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    showDeleteDialog(plant_no) {
      console.log(plant_no);
      this.dialog = true;
      this.plant_no = plant_no;
    },

    deleteData() {
      this.$axios
        .delete(`/api/plant-infos/${this.plant_no}`)
        .then((response) => {
          console.log(response);
          this.dialog = false;
          this.getPlantInfo(); // Refresh the data after deletion
        })
        .catch((error) => {
          console.error(error);
        });
    },

    plantCrop(plantInfo) {
      const currentTime = new Date();
      let payload = {
        data: {
          plant_name: plantInfo.attributes.plant_name,
          plant_variation: plantInfo.attributes.plant_variation,
          plant_temp: plantInfo.attributes.plant_temp,
          plant_humid: plantInfo.attributes.plant_humid,
          tds_level: plantInfo.attributes.tds_level,
          ph_level: plantInfo.attributes.ph_level,
          water_temp: plantInfo.attributes.water_temp,
          time: currentTime.toISOString(),
        },
      };

      this.$axios
        .post(`/api/plant-crops`, payload)
        .then((response) => {
          console.log(response);
          this.successSnackbar = true;
          this.textSuccess = "Successfully Planted!";
          //this.$router.push('/dashboard');
        })
        .catch((error) => {
          if (error.response?.status === 422) {
            // HTTP status 422 usually indicates a validation error
            console.warn("Duplicate Plant Entry. No error message displayed.");
          } else {
            console.error("Error:", error);
            this.textError = "An error occurred while processing the request.";
          }
        });
    },
  },

  mounted() {
    this.getPlantInfo();
  },
};
</script>