<template>
  <v-container fluid>
    <v-row style="padding: 1rem">
      <v-spacer></v-spacer>
      <h2 style="text-align: center">CROPS INFORMATION PAGE</h2>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-col
        v-for="(crop, index) in crops"
        :key="index"
        cols="12"
        md="3"
        sm="6"
      >
        <v-card style="padding: 10px; background-color: antiquewhite">
          <v-img :src="`/images/${crop.imgName}.jpg`" height="237px"></v-img>

          <v-card-title>{{ crop.name }}</v-card-title>

          <v-card-subtitle>{{ crop.variation }}</v-card-subtitle>

          <v-dialog v-model="dialog[index]" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="black" dark v-bind="attrs" v-on="on" text>
                description
              </v-btn>
              <v-btn color="green" dark @click="addCrop(crop)"
                >Plant Crop</v-btn
              >
            </template>

            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                {{ crop.name }} - {{ crop.variation }}
              </v-card-title>

              <v-card-text
                class="pa-6"
                style="font-size: 17px; text-align: justify"
              >
                {{ crop.description }}
                <br>
                <br>
                <h4 class="font-weight-medium">Suggested Temp: {{ crop.suggestedTemp }}</h4><br>
              <h4 class="font-weight-medium">Suggested Humidity: {{ crop.suggestedHumidity }}</h4><br>
              <h4 class="font-weight-medium">Suggested Ph: {{ crop.suggestedPhLevel }}</h4><br>
              <h4 class="font-weight-medium">Suggested Tds: {{ crop.suggestedTdsLevel }}</h4><br>
              <h4 class="font-weight-medium">Suggested Water Temp: {{ crop.suggestedWaterTemp }}</h4><br>
              </v-card-text>
              

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="closeDialog(index)">
                  exit
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
  data() {
    return {
      dialog: [false, false, false, false],
      successSnackbar: false,
      crops: [
        {
          name: "Lettuce",
          variation: "DABI",
          description:
            "Lettuce Dabi is a crisp and flavorful variety of lettuce known for its vibrant green leaves and crunchy texture. With a mild and slightly sweet flavor, Dabi lettuce is versatile, making it suitable for salads, sandwiches, wraps, and garnishes. Its compact size and quick growth make it ideal for home gardens and commercial cultivation alike. Dabi lettuce adds freshness and crunch to dishes, making it a popular choice among salad lovers and culinary enthusiasts.",
          imgName: "lettuce-dabi",
          suggestedTemp: "27",
          suggestedHumidity: "65",
          suggestedPhLevel: "7",
          suggestedTdsLevel: "800",
          suggestedWaterTemp: "27",
        },
        {
          name: "Lettuce",
          variation: "OLMETIE",
          description:
            "Olmetie Lettuce is a vibrant and crisp leafy green variety renowned for its delicate texture and mild, slightly sweet flavor profile. With its tender leaves and refreshing taste, Olmetie Lettuce adds a delightful crunch to salads, sandwiches, and wraps. Its beautiful, frilly leaves boast a rich green color, making it an attractive addition to any dish. Whether enjoyed fresh in a garden salad or used as a crisp bed for savory toppings, Olmetie Lettuce offers versatility and freshness that elevates culinary creations to new heights.",
          imgName: "lettuce-olmetie",
        },
        {
          name: "Lettuce",
          variation: "ROMAINE",
          description:
            "Romaine lettuce, scientifically known as Lactuca sativa var. longifolia, is a type of lettuce with long, crisp leaves that are sturdy and have a slightly bitter taste. It is a popular salad green known for its nutritional value and versatility in various culinary applications. Romaine lettuce is commonly used as a base for salads, sandwiches, and wraps. It is rich in vitamins A, C, and K, as well as folate and fiber, making it a healthy addition to any diet. Romaine lettuce is also low in calories, making it a favorite among those watching their calorie intake.",
          imgName: "lettuce-romaine",
        },
        {
          name: "Tomato",
          variation: "ROMA/PLUM",
          description:
            "Roma tomatoes, also known as plum tomatoes, are characterized by their elongated shape and dense, meaty texture. These tomatoes have relatively few seeds and less moisture compared to other varieties, making them perfect for sauces, pastes, and canning. With a rich, tangy flavor and vibrant red color, Roma tomatoes are prized for their culinary versatility. They are commonly used in Italian cuisine, as well as in soups, stews, and salads. Their firm flesh holds up well when cooked, making them an excellent choice for dishes requiring prolonged simmering or roasting. Overall, Roma tomatoes are a staple in the kitchen, beloved for their robust flavor and culinary adaptability.",
          imgName: "roma-tomato",
        },
        {
          name: "Bean",
          variation: "BUSH/SNAP",
          description:
            "Bush beans, also known as snap beans, are a type of green bean characterized by their compact growth habit, making them suitable for hydroponic systems. These beans produce slender, crisp pods with a mild, slightly sweet flavor, perfect for various culinary applications. In hydroponics, bush beans thrive in nutrient-rich water solutions, allowing for efficient and space-saving cultivation without the need for soil. With their quick growth and high productivity, bush beans are a favored choice for hydroponic gardeners seeking a reliable and nutritious crop.",
          imgName: "bush-bean",
        },
      ],
    };
  },

  methods: {
    closeDialog(index) {
      this.$set(this.dialog, index, false);
    },

    addCrop(crop) {
      const currentTime = new Date();
      console.log("Crop Successfully Added!");

      let payload = {
        data: {
          image_name: crop.imgName,
          crop_name: crop.name,
          crop_variation: crop.variation,
          crop_description: crop.description,
          suggested_temp: crop.suggestedTemp,
          suggested_humidity: crop.suggestedHumidity,
          suggested_ph: crop.suggestedPhLevel,
          suggested_tds: crop.suggestedTdsLevel,
          suggested_waterTemp: crop.suggestedWaterTemp,
          time: currentTime.toISOString(),
        },
      };
      this.$axios
        .post(`/api/crop-details`, payload)
        .then((response) => {
          console.log(response);
          this.successSnackbar = true;
          this.textSuccess = "Succesfully Added! ";
        })
        .catch((error) => {
          console.log(error.response.data.error.message);
        });
    },
  },
};
</script>