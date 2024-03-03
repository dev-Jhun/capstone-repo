<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="4" sm="12">
        <v-card>
          <v-img :src="`/images/${imgName}.jpg`" height="337px"></v-img>

          <v-card-title> {{ cropName }} </v-card-title>

          <v-card-subtitle> {{ cropVariation }} </v-card-subtitle>
          <v-card-text style="text-align: justify;">
            {{ cropDescription }}
          </v-card-text>
        </v-card>
      </v-col>

      <v-col>
        <v-row>
          <v-col cols="12" md="4" sm="6">
            <v-card color="#F2F597">
              <v-list-item two-line class="d-flex justify-center align-center">
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold mb-5 text-center">
                    {{ plantName }} - {{ plantVar }}
                  </v-list-item-title>
                  <v-list-item-subtitle>Temperature</v-list-item-subtitle>
                  <v-divider></v-divider>
                  <v-list-item-title class="display-2">{{
                    plantTempValue
                  }}</v-list-item-title>
                  <v-list-item-subtitle
                    class="font-weight-bold mb-1 text-center"
                    >Suggested : {{ plantTemp }}</v-list-item-subtitle
                  >
                </v-list-item-content>
                <v-icon class="display-3" color="green"
                  >mdi-temperature-celsius</v-icon
                >
              </v-list-item>
              <br />

              <v-row justify="center">
                <v-dialog v-model="dialogTemp" persistent max-width="400px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="green" dark v-bind="attrs" v-on="on">
                      Override
                    </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar color="primary" dark
                      >Overwrite temperature</v-toolbar
                    >
                    <v-card-title
                      class="font-weight-bold"
                      style="text-align: center; margin: auto; display: block"
                      >Temp Control</v-card-title
                    >
                    <v-card-text>
                      <v-container
                        style="padding: 20px 50px; text-align: center"
                      >
                        <v-row justify="center">
                          <v-col cols="8">
                            <v-switch
                              v-model="switchTemp"
                              inset
                              :label="`Misting ${switchTemp ? 'ON' : 'OFF'}`"
                              style="
                                width: 300px;
                                max-width: 100%;
                                margin: auto;
                                display: flex;
                                justify-content: center;
                              "
                              @change="sendCommand"
                            ></v-switch>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red" dark @click="dialogTemp = false">
                        Close
                      </v-btn>
                      <v-btn color="success" dark @click="dialogTemp = false">
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>

              <br />
            </v-card>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-card color="#AAD9BB">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold mb-5 text-center"
                    >{{ plantName }} - {{ plantVar }}</v-list-item-title
                  >
                  <v-list-item-subtitle>Humidity</v-list-item-subtitle>
                  <v-divider></v-divider>
                  <v-list-item-title class="display-2">{{
                    plantHumidValue
                  }}</v-list-item-title>
                  <v-list-item-subtitle
                    class="font-weight-bold mb-1 text-center"
                    >Suggested :{{ plantHumid }}</v-list-item-subtitle
                  >
                </v-list-item-content>
                <v-icon class="display-3" color="#607D8B"
                  >mdi-weather-windy</v-icon
                >
              </v-list-item>
              <br />
              <v-row justify="center">
                <v-dialog v-model="dialogHumid" persistent max-width="400px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="green" dark v-bind="attrs" v-on="on">
                      Override
                    </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar color="primary" dark
                      >Overwrite Humidity</v-toolbar
                    >
                    <v-card-title
                      class="font-weight-bold"
                      style="text-align: center; margin: auto; display: block"
                      >Humid Control</v-card-title
                    >
                    <v-card-text>
                      <v-container
                        style="padding: 20px 50px; text-align: center"
                      >
                        <v-row justify="center">
                          <v-col cols="8">
                            <v-switch
                              v-model="switchTemp"
                              inset
                              :label="`Misting ${switchTemp ? 'ON' : 'OFF'}`"
                              style="
                                width: 300px;
                                max-width: 100%;
                                margin: auto;
                                display: flex;
                                justify-content: center;
                              "
                              @change="sendCommand"
                            ></v-switch>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red" dark @click="dialogHumid = false">
                        Close
                      </v-btn>
                      <v-btn color="success" dark @click="dialogHumid = false">
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
              <br />
            </v-card>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-card color="#86B6F6">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold mb-5 text-center"
                    >{{ plantName }} - {{ plantVar }}</v-list-item-title
                  >
                  <v-list-item-subtitle>pH Level</v-list-item-subtitle>
                  <v-divider></v-divider>
                  <v-list-item-title class="display-2">{{
                    phLevelValue
                  }}</v-list-item-title>
                  <v-list-item-subtitle
                    class="font-weight-bold mb-1 text-center"
                    >Suggested : {{ phLevel }}</v-list-item-subtitle
                  >
                </v-list-item-content>
                <v-icon class="display-3" color="blue">mdi-thermometer</v-icon>
              </v-list-item>
              <br />
              <v-row justify="center">
                <v-dialog v-model="dialogPh" persistent max-width="450px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="green" dark v-bind="attrs" v-on="on">
                      Override
                    </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar color="primary" dark
                      >Overwrite pH Level</v-toolbar
                    >
                    <v-card-title
                      class="font-weight-bold"
                      style="text-align: center; margin: auto; display: block"
                      >pH Control</v-card-title
                    >
                    <v-card-text>
                      <v-container style="padding: 20px 50px">
                        <v-row>
                          <v-row justify="center">
                            <v-col cols="10">
                              <v-switch
                                v-model="switchPhUp"
                                inset
                                :label="`PH UP ${switchPhUp ? 'ON' : 'OFF'}`"
                                style="
                                  width: 300px;
                                  max-width: 100%;
                                  margin: auto;
                                  display: flex;
                                  justify-content: center;
                                "
                                @change="sendCommandPhUp"
                              ></v-switch>
                              <v-switch
                                v-model="switchPhDown"
                                inset
                                :label="`PH DOWN ${
                                  switchPhDown ? 'ON' : 'OFF'
                                }`"
                                style="
                                  width: 300px;
                                  max-width: 100%;
                                  margin: auto;
                                  display: flex;
                                  justify-content: center;
                                "
                                @change="sendCommandPhDown"
                              ></v-switch>
                            </v-col>
                          </v-row>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red" dark @click="dialogPh = false">
                        Close
                      </v-btn>
                      <v-btn color="success" dark @click="dialogPh = false">
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
              <br />
            </v-card>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-card color="#F3CCF3">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold mb-5 text-center"
                    >{{ plantName }} - {{ plantVar }}</v-list-item-title
                  >
                  <v-list-item-subtitle>TDS Level</v-list-item-subtitle>
                  <v-divider></v-divider>
                  <v-list-item-title class="display-2">{{
                    tdsLevelValue
                  }}</v-list-item-title>
                  <v-list-item-subtitle
                    class="font-weight-bold mb-1 text-center"
                    >Suggested : {{ tdsLevel }}</v-list-item-subtitle
                  >
                </v-list-item-content>
                <v-icon class="display-3" color="yellow"
                  >mdi-water-percent</v-icon
                >
              </v-list-item>
              <br />
              <v-row justify="center">
                <v-dialog v-model="dialogTds" persistent max-width="450px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="green" dark v-bind="attrs" v-on="on">
                      Override
                    </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar color="primary" dark
                      >Overwrite TDS Level</v-toolbar
                    >
                    <v-card-title
                      class="font-weight-bold"
                      style="text-align: center; margin: auto; display: block"
                      >TDS Control</v-card-title
                    >
                    <v-card-text>
                      <v-container style="padding: 20px 50px">
                        <v-row>
                          <v-row justify="center">
                            <v-col cols="10">
                              <v-switch
                                v-model="switchSolutionA"
                                inset
                                :label="`SOLUTION A ${
                                  switchSolutionA ? 'ON' : 'OFF'
                                }`"
                                style="
                                  width: 300px;
                                  max-width: 100%;
                                  margin: auto;
                                  display: flex;
                                  justify-content: center;
                                "
                                @change="sendCommandSolutionA"
                              ></v-switch>
                              <v-switch
                                v-model="switchSolutionB"
                                inset
                                :label="`SOLUTION B ${
                                  switchSolutionB ? 'ON' : 'OFF'
                                }`"
                                style="
                                  width: 300px;
                                  max-width: 100%;
                                  margin: auto;
                                  display: flex;
                                  justify-content: center;
                                "
                                @change="sendCommandSolutionB"
                              ></v-switch>
                            </v-col>
                          </v-row>
                          <v-col cols="12"> </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red" dark @click="dialogTds = false">
                        Close
                      </v-btn>
                      <v-btn color="success" dark @click="dialogTds = false">
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
              <br />
            </v-card>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-card height="214px" color="#C6A969">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold mb-5 text-center"
                    >{{ plantName }} - {{ plantVar }}</v-list-item-title
                  >
                  <v-list-item-subtitle>Water Temperature</v-list-item-subtitle>
                  <v-divider></v-divider>
                  <v-list-item-title class="display-2">{{
                    waterTempValue
                  }}</v-list-item-title>
                  <v-list-item-subtitle
                    class="font-weight-bold mb-1 text-center"
                    >Suggested : {{ waterTemp }}</v-list-item-subtitle
                  >
                </v-list-item-content>
                <v-icon class="display-3" color="orange">mdi-water</v-icon>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <br />
    <br />
    <br />
    <!-- <v-row>
      <v-spacer></v-spacer>
      <v-col cols="12" md="4" sm="12">
        <h2 class="text-center">TEMPERATURE</h2>
        <apexchart
          type="bar"
          :options="tempSensorChart"
          :series="series"
        ></apexchart>
      </v-col>
      <v-spacer></v-spacer>
    </v-row> -->
    <br />
    <br />
    <br />
    <br />
    <br />

    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            Plants Information
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
          </v-data-table>
        </v-card>
      </v-col>
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
  layout: "default",
  name: "DashboardPage",
  data() {
    return {
      successSnackbar: false,
      errorSnackbar: false,
      textSuccess: "",
      textError: "",
      // tempSensorChart: {
      //   colors: ["#ffff00"],
      //   chart: {
      //     id: "bar-chart-1",
      //     background: "#CDF5FD",
      //   },
      //   xaxis: {
      //     categories: this.generateTimeLabels().reverse(), // Reverse the order of time labels
      //   },
      // },
      // series1: [
      //   {
      //     name: "Temperature",
      //     data: [30, 20, 35, 20, 49, 10],
      //   },
      // ],

      showCropDescription: false,
      cropDescription: "",
      imgName: "",
      cropName: "",
      cropVariation: "",

      //override value
      switchTemp: false,
      switchHumid: false,
      switchPhUp: false,
      switchPhDown: false,
      switchSolutionA: false,
      switchSolutionB: false,

      dialogTemp: false,
      dialogHumid: false,
      dialogPh: false,
      dialogTds: false,
      dialogWatertemp: false,

      search: "",

      //suggested value
      plantName: "",
      plantVar: "",
      plantTemp: "",
      plantHumid: "",
      tdsLevel: "",
      phLevel: "",
      waterTemp: "",
      //crop_image: "",

      //sensor Value
      plantTempValue: "00",
      plantHumidValue: "00",
      phLevelValue: "00",
      tdsLevelValue: "00",
      waterTempValue: "00",

      // phUpItem: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      // phDownItem: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],

      // solutionA: "",
      // solutionB: "",
      // tdsWater: "",

      //data table
      headers: [
        {
          text: "Plant Number",
          align: "start",
          sortable: false,
          value: "attributes.plant_no",
        },
        { text: "Plant Name", value: "attributes.plant_name" },
        { text: "Plant Variation", value: "attributes.plant_variation" },
        { text: " Suggested Temperature", value: "attributes.plant_temp" },
        { text: "Suggested Humidity", value: "attributes.plant_humid" },
        { text: "Suggested TDS level", value: "attributes.tds_level" },
        { text: "Suggested pH Level", value: "attributes.ph_level" },
        { text: "Suggested Water Temperature", value: "attributes.water_temp" },
        { text: "", value: "actions" },
      ],

      //database conn
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

    getPlantCrops() {
      this.$axios
        .get(`/api/plant-crops/latest`)
        .then((response) => {
          this.plantName = response.data.data.plant_name;
          this.plantVar = response.data.data.plant_variation;
          this.plantTemp = response.data.data.plant_temp;
          this.plantHumid = response.data.data.plant_humid;
          this.tdsLevel = response.data.data.tds_level;
          this.phLevel = response.data.data.ph_level;
          this.waterTemp = response.data.data.plant_temp;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getPlantValue() {
      this.$axios
        .get(`/api/sensor-values/latest`)
        .then((response) => {
          this.plantTempValue = response.data.data.plant_temp;
          this.plantHumidValue = response.data.data.plant_humid;
          this.tdsLevelValue = response.data.data.tds_level;
          this.phLevelValue = response.data.data.ph_level;
          this.waterTempValue = response.data.data.water_temp;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getLatestDetail() {
      this.$axios
        .get(`/api/crop-detailsnew/latest`)
        .then((response) => {
          this.imgName = response.data.data.image_name;
          this.cropName = response.data.data.crop_name;
          this.cropVariation = response.data.data.crop_variation;
          this.cropDescription = response.data.data.crop_description;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async sendCommand() {
      const command = this.switchTemp ? "0" : "1";
      try {
        const response = await this.$axios.post(
          "http://localhost:3030/command",
          { command }
        );
        console.log(command);
        if (command === "0") {
          this.successSnackbar = true;
          this.textSuccess = "Misting is Running";
        }
      } catch (error) {
        console.error("Error sending command:", error);
      }
    },
    // async sendCommandHumid() {
    //   const command = this.switchHumid ? "2" : "3";
    //   try {
    //     const response = await this.$axios.post(
    //       "http://localhost:3030/command",
    //       { command }
    //     );
    //     console.log(command);
    //     if (command === "2") {
    //       this.successSnackbar = true;
    //       this.textSuccess = "Misting is Running";
    //     }
    //   } catch (error) {
    //     console.error("Error sending command:", error);
    //   }
    // },
    async sendCommandPhUp() {
      const command = this.switchPhUp ? "C" : "D";
      try {
        const response = await this.$axios.post(
          "http://localhost:3030/command",
          { command }
        );
        console.log(command);
        if (command === "C") {
          this.successSnackbar = true;
          this.textSuccess = "PH UP is Running";
        }
      } catch (error) {
        console.error("Error sending command:", error);
      }
    },
    async sendCommandPhDown() {
      const command = this.switchPhDown ? "6" : "7";
      try {
        const response = await this.$axios.post(
          "http://localhost:3030/command",
          { command }
        );
        console.log(command);
        if (command === "6") {
          this.successSnackbar = true;
          this.textSuccess = "PH DOWN is Running";
        }
      } catch (error) {
        console.error("Error sending command:", error);
      }
    },
    async sendCommandSolutionA() {
      const command = this.switchSolutionA ? "8" : "9";
      try {
        const response = await this.$axios.post(
          "http://localhost:3030/command",
          { command }
        );
        console.log(command);
        if (command === "8") {
          this.successSnackbar = true;
          this.textSuccess = "SOLUTION A is Running";
        }
      } catch (error) {
        console.error("Error sending command:", error);
      }
    },
    async sendCommandSolutionB() {
      const command = this.switchSolutionB ? "A" : "B";
      try {
        const response = await this.$axios.post(
          "http://localhost:3030/command",
          { command }
        );
        console.log(command);
        if (command === "A") {
          this.successSnackbar = true;
          this.textSuccess = "SOLUTION B is Running";
        }
      } catch (error) {
        console.error("Error sending command:", error);
      }
    },
    // generateTimeLabels() {
    //   const labels = [];
    //   const currentTime = new Date(); // Current time for reference
    //   const interval = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
    //   const numberOfLabels = 6; // Number of labels to generate, adjust as needed

    //   // Generate time labels for the past hours
    //   for (let i = 0; i < numberOfLabels; i++) {
    //     // Start from the past and move towards the current time
    //     const time = new Date(currentTime.getTime() - i * interval); // Adjust based on the current time
    //     const formattedTime = this.formatTime(time);
    //     labels.push(formattedTime);
    //   }
    //   return labels;
    // },
    // formatTime(time) {
    //   const options = {
    //     weekday: "short",
    //     month: "short",
    //     day: "numeric",
    //     hour: "numeric",
    //     minute: "numeric",
    //     hour12: true,
    //   };
    //   return time.toLocaleDateString("en-US", options);
    // },
  },

  mounted() {
    console.log("Component is mounted");
    this.getPlantCrops();
    this.getPlantInfo();
    this.getLatestDetail();
    // this.sendCommand();
    // this.sendCommandHumid();
    // this.sendCommandPhUp();
    // this.sendCommandPhDown();
    // this.sendCommandSolutionA();
    // this.sendCommandSolutionB();

    this.intervalId = setInterval(() => {
      this.getPlantValue();
    }, 1000); // Run every 5 seconds (5000 milliseconds)
  },

  beforeDestroy() {
    clearInterval(this.intervalId);
  },
};
</script>


<style scoped>
body {
  margin: 0;
  padding: 0;
}
p {
  font-weight: bold;
  font-size: 15px;
  color: gray;
}
</style>
