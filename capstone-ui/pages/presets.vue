<template>
  <v-container fluid>
    <br />
    <br />
    <v-row>
      <v-spacer></v-spacer>

      <v-col cols="12" md="6" sm="12" class="d-flex justify-center">
        <v-card width="850" elevation="4">
          <v-card-title
            >Crop Details
            <v-spacer></v-spacer>
            <v-btn to="/dashboard" color="primary" @click="dialog = false"
              >Dashboard</v-btn
            >
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <!-- Use v-row to create a horizontal row -->
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Crop Number"
                    v-model="plant_no"
                    :rules="plantNoRules"
                    outlined
                    prepend-inner-icon="mdi-numeric"
                    type="number"
                    min="0"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Crop Name"
                    v-model="plant_name"
                    prepend-inner-icon="mdi-pencil"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Crop Variation"
                    v-model="plant_variation"
                    prepend-inner-icon="mdi-file-document"
                    outlined
                  ></v-text-field> </v-col
                ><v-col cols="12" md="6">
                  <v-text-field
                    label="Suggested Temperature"
                    v-model="plant_temp"
                    outlined
                    prepend-inner-icon="mdi-temperature-celsius"
                    type="number"
                    min="0"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Suggested Humidity"
                    v-model="plant_humid"
                    prepend-inner-icon="mdi-weather-windy"
                    outlined
                    type="number"
                    min="0"
                  ></v-text-field> </v-col
                ><v-col cols="12" md="6">
                  <v-text-field
                    label="Suggested TDS Level"
                    v-model="tds_level"
                    prepend-inner-icon="mdi-water-percent"
                    outlined
                    type="number"
                    min="0"
                    max="2000"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Suggested pH Level (1 - 14)"
                    v-model="ph_level"
                    prepend-inner-icon="mdi-thermometer"
                    outlined
                    type="number"
                    min="0"
                    max="14"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Suggested Water Temperature"
                    v-model="water_temp"
                    prepend-inner-icon="mdi-test-tube"
                    outlined
                    type="number"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12" md="6">
                  <v-file-input
                    :rules="rules"
                    accept="image/*"
                    placeholder="Pick an crop image"
                    prepend-icon="mdi-camera"
                    label="Crop image"
                    v-model="crop_image"
                    outlined
                    @change="selectImage"
                  ></v-file-input>
                </v-col>

              </v-row>

              <v-spacer></v-spacer>
              <v-row>
                <v-col class="text-right">
                  <v-btn color="success" @click="addPlant()">ADD CROP</v-btn>
                  <v-btn color="error" @click="clearField()">Cancel</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>

    <!-- SUCCESS SNACKBAR     -->
    <v-snackbar color="green" v-model="successSnackbar">
      {{ textSuccess }}
      <template v-slot:action="{ attrs }">
        <v-btn
          plain
          color="white"
          v-bind="attrs"
          @click="successSnackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <!-- ERROR SNACKBAR     -->
    <v-snackbar color="red" v-model="errorSnackbar">
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
  data() {
    return {
      rules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!",
          // (v) => !!v || "Crop Image is required"
      ],
      isActive: false,
      valid: true,
      plantNoRules: [(v) => !!v || "Crop Number is required"],
      plant_no: "",
      plant_name: "",
      plant_variation: "",
      plant_temp: "",
      plant_humid: "",
      tds_level: "",
      ph_level: "",
      water_temp: "",
      crop_image: null,
      selectedPhoto: null,
      successSnackbar: false,
      errorSnackbar: false,
      textSuccess: "",
      textError: "",
    };
  },

  methods: {
    //images
    async selectImage(e) {
      const file = e;
      if (!file) return;
      //const readData = (f) =>
        // new Promise((resolve) => {
        //   const reader = new FileReader();
        //   reader.onloadend = () => resolve(reader.result);
        //   reader.readAsDataURL(f);
        // });
       //const data = await readData(file);
      // this.imagePreview = data;
      this.selectedPhoto = e
      console.log(this.selectedPhoto)
    },
    async addPlant() {
      if (this.$refs.form.validate()) {
        const formData = new FormData();

        formData.append("files", this.selectedPhoto);
        
        console.log(formData)

        await this.$axios
          .post(`/api/upload`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log(response.data);
            console.log("sample errorr 2");

            
            const photo_path = response.data[0].url;

            const payload = {
              data: {
                plant_no: this.plant_no,
                plant_name: this.plant_name,
                plant_variation: this.plant_variation,
                plant_temp: this.plant_temp,
                plant_humid: this.plant_humid,
                tds_level: this.tds_level,
                ph_level: this.ph_level,
                water_temp: this.water_temp,
                crop_image: photo_path,
              },
            };
            this.$axios
              .post(`/api/plant-infos`, payload)
              .then((response) => {
                console.log(response);
                this.$refs.form.reset();
                this.successSnackbar = true;
                this.textSuccess = "Succesfully Added! ";
              })
              .catch((error) => {
                console.log(error.response.data.error.message);

                if (error.response.data.error.message) {
                  this.errorSnackbar = true;
                  this.textError = "Crop Number Already Listed";
                }
              });
          });
      }
    },
    clearField() {
      this.$refs.form.reset();
    },
  },
};
</script>