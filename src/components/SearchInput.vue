<template>
    <input id="search-input" v-model="searchQuery" placeholder="Digite o nome do país" class="block w-full p-1 ps-10 border rounded-lg"/>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: ''
      };
    }
  };
  </script>
  
  <style scoped>
  #search-input {
    width: 300px;
  }
  </style>
  