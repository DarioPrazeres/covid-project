<template>
    <div class="country-detail block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h2 class="mb-2 text-2xl text-gray-900 dark:text-white">{{ countryData.country }}</h2>
      <p>Confirmados: <strong> {{ countryData.confirmed }}</strong></p>
      <p>Mortes: <strong> {{ countryData.deaths }}</strong></p>
      <p>Recuperados: <strong>{{ countryData.recovered }}</strong> </p>
      <hr>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      countryData: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .country-detail {
    width: 250px;
    height: 200px;
    margin: 15px 30px 15px 0;
  }
  </style>
  