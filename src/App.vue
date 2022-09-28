<template>
  <div class="container">
    <div class="pt-2 font-size-xl mb-3">Create Address</div>

    <button class="btn btn-success" @click="triggerReady">
      Trigger map ready event
    </button>
    <hr />

    <div class="row">
      <div class="col-md-8">
        <div class="map_holder">
          <place-search 
            v-bind:ready="ready"
            placeholder="Enter a location"
            loading="Map is loading"
            v-bind:gps_timeout="7000"
            v-bind:fallbackProcedure="fallbackProcedure"
            v-bind:zoom="zoom"
            v-bind:geolocation="geolocation"
            v-bind:address="address"
            v-bind:verConsole="verConsole"
            v-bind:manually="manually"
            v-bind:query_mod="query_mod"
            @changed="getMapData"
          >
          </place-search>
        </div>
      </div>
      <div class="col-md-4">
        <div class="text-uppercase color-secondary mb-1">Address</div>
        <div class="mb-3 font-weight-bold">
          {{
            place.country != null
              ? place.country + ", " + place.city
              : "Please search for an address before procceeding"
          }}
        </div>

        <div class="text-uppercase color-secondary mb-1">Zip code</div>
        <div class="mb-3">
          <input type="text" v-model="place.zip_code" class="form-control" />
        </div>

        <div class="text-uppercase color-secondary mb-1">
          Address descriotion
        </div>
        <div class="mb-3">
          <textarea
            class="form-control"
            cols="30"
            rows="5"
            v-model="place.address_description"
          ></textarea>
        </div>

        <div class="mb-2">
          <div class="form-check">
            <input
              class="form-check-input"
              id="primary_address"
              type="checkbox"
              v-model="form_data.primary"
            />
            <label class="form-check-label" for="primary_address">
              Make Primary Address
            </label>
          </div>
        </div>
        <div class="mt-3">
          <button class="btn btn-primary w-100">Save address</button>
        </div>

        <input type="text" v-model="endereco" placeholder="Endereço">       

        <div class="mt-3">
          <button class="btn btn-primary w-100" @click.prevent="mudarEnd()">Mudar Endereço</button>
          <button class="btn btn-primary w-100" @click.prevent="mudarMap(-22.645000, -43.216510)">Mapa 1</button>
          <button class="btn btn-primary w-100" @click.prevent="mudarMap(-22.759781, -43.451511)">Mapa 2</button>
          <button class="btn btn-primary w-100" @click.prevent="mudarMap(-22.782921, -43.428268)">Mapa 3</button>
          <button class="btn btn-primary w-100" @click.prevent="mudarMap(-22.509911, -43.175480)">Mapa 4</button>
          <button class="btn btn-primary w-100" @click.prevent="mudarMap(-8.052240, -34.928612)">Mapa 5</button>
          <button class="btn btn-primary w-100" @click.prevent="fecharMapa()">Fechar Mapa</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  
  data() {
    return {
      verConsole: false,
      endereco: "",
      ready: true, //Add ready:false to stop map from loading, and then when changed to true map will auto load
      fallbackProcedure: "geolocation", //gps | geolocation | address | manually
      zoom: 17, //Default Zoom
      geolocation: {
        // If GPS and Find by address fails then, map will be positioned by a default geolocation
        lat: 31.73858,
        lng: -35.98628,
        zoom: 2,
      },      
      address: {
        query: "Brazil, Rio de Janeiro", 
        zoom: 10,
      },
      manually: {
        address_description: "21 Dhjetori, Tirana, Albania",
        city: "Tirana",
        country: "Albania",
        lat: 41.3267905,
        lng: 19.8060475,
        state: "Tirana County",
        zip_code: "",
        zoom: 17,
      },
      place: {},
      form_data: {},

      t_lat: "",
      t_lng: "",
      query_mod: "",
    };
  },

  watch: {
    address: function (val) {      
      console.log("App Address:");
      console.log(val);
      console.log("------------------");
    },
    
    ready: function (val) {
      console.log("Ready: "+val);
    },
    geolocation: function (val) {
      this.query_mod = this.place.address_description;
      if(this.verConsole){  
        console.log("Geolocation:");
        console.log(val);
        console.log("------------------");
      }
    },
  },
  
  methods: {
    fecharMapa(){
      this.ready = false;
    },
    mudarMap($lat, $lng){    
      this.geolocation = {
        lat: $lat,
        lng: $lng,
        zoom: 17,
      };
      this.fallbackProcedure = "geolocation";
      this.ready = true;
      if(this.verConsole){        
        console.log("Lat: "+$lat);
        console.log("Lng: "+$lng);
      }
    },
    mudarEnd() {    
      this.address = {
        query: this.endereco,
        zoom: 15,
      },
      this.fallbackProcedure = "address";
      this.ready = true;
    },
    getMapData(place) {
      this.place = place;
      if(this.verConsole){  
      console.log(place);
      }
    },
    triggerReady() {
      this.fallbackProcedure = "manually";
      this.ready = true;
    },
  },
  created() {},

};
</script>

<style lang="scss" scoped>
.map_holder {
  width: 100%;
  height: 450px;
  float: left;
}
</style>


