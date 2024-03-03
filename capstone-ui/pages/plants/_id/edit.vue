<template>
    <v-container>
  
  <v-row>
    <v-col class="d-flex justify-center">
      <v-card width="700">
        <v-card-title>EDIT PAGE
          <v-spacer></v-spacer>
              <v-btn to="/plants" color="primary" @click="dialog = false">GO BACK</v-btn>
        </v-card-title>
        
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field label="Plant Number" v-model="plant_no" :rules="plantNoRules"></v-text-field>
                <v-text-field label="Plant Name" v-model="plant_name"></v-text-field>
                <v-text-field label="Plant Variation" v-model="plant_variation"></v-text-field>
                <v-text-field label="Suggested Plant Temperature" v-model="plant_temp"></v-text-field>
                <v-text-field label="Suggested Plant Humidity" v-model="plant_humid"></v-text-field>
                <v-text-field label="Suggested TDS level" v-model="tds_level"></v-text-field>
                <v-text-field label="Suggested pH Level" v-model="ph_level"></v-text-field>
                <v-text-field label="Suggested Water Temperature" v-model="water_temp"></v-text-field>
  
            <v-btn color="success" @click="updateData()">Save</v-btn>
            <v-btn to="/plants" color="error">Cancel</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
  
    </v-col>
  </v-row>
  
  
  
      
  
      <!-- SUCCESS SNACKBAR     -->
      <v-snackbar color="green" v-model="successSnackbar" class="d-flex justify-center">
        {{ textSuccess }}
        <template v-slot:action="{ attrs }">
          <v-btn plain color="white" v-bind="attrs" @click="successSnackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
  
      <!-- ERROR SNACKBAR     -->
      <v-snackbar color="red" v-model="errorSnackbar" class="d-flex justify-center">
        {{ textError }}
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="errorSnackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </template>
  
  
  <script>
  export default {
    layout: "dboard",
    data() {
      return {
        valid: true,
        plantNoRules: [(v) => !!v || "Name is required"],
        plant_no: "",
        plant_name: "",
        plant_variation: "",
        plant_temp: "",
        plant_humid: "",
        tds_level: "",
        ph_level: "",
        water_temp: "",
        successSnackbar: false,
        errorSnackbar: false,
        textSuccess: "",
        textError: "",
      };
    },
    methods: {
  
  
  
      getPlantDetails() {
  
        console.log(`Crop Details Page`);
        this.$axios
          .get(`/api/plant-infos/${this.$route.params.id}`)
          .then((response) => {
            console.log(response.data.data.attributes.plant_no);
  
  
            this.plant_no = response.data.data.attributes.plant_no;
            this.plant_name = response.data.data.attributes.plant_name;
            this.plant_variation = response.data.data.attributes.plant_variation;
            this.plant_temp = response.data.data.attributes.plant_temp;
            this.plant_humid = response.data.data.attributes.plant_humid;
            this.tds_level = response.data.data.attributes.tds_level;
            this.ph_level = response.data.data.attributes.ph_level;
            this.water_temp = response.data.data.attributes.water_temp;
          })
          .catch((error) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      updateData() {
  
  
        let payload = {
          data: {
            plant_no: this.plant_no,
            plant_name: this.plant_name,
            plant_variation: this.plant_variation,
            plant_temp: this.plant_temp,
            plant_humid: this.plant_humid,
            tds_level: this.tds_level,
            ph_level: this.ph_level,
            water_temp: this.water_temp,
            },
        };
        this.$axios
          .put(`/api/plant-infos/${this.$route.params.id}`, payload)
          .then((response) => {
            console.log(response);
            //this.$refs.form.reset();
            this.successSnackbar = true;
            this.textSuccess = "Succesfully Edited! ";
          })
          .catch((error) => {
          console.log(error);

          if (error.response.data.error.message) {
              this.errorSnackbar = true;
              this.textError = "Crop Number Already Exist";
            }
        });



      },
    },
  
    mounted() {
      this.getPlantDetails();
    },
  };
  </script>