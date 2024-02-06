<template>
  <div id="countries-container">
    <h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Dados COVID-19 em Alguns Países</h1>

    <!-- Barra de pesquisa -->
    <search-input v-model="searchQuery" />

    <div id="countries-list" v-if="paginatedData && paginatedData.length > 0">
      <!-- Usando o componente CountryDetail -->
      <country-detail v-for="countryData in paginatedData" :key="countryData.country" :countryData="countryData" />
      
      <div id="control-page">
        <!-- Controle de paginação -->
        <button @click="prevPage" :disabled="currentPage === 1" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Anterior</button>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:hover:bg-blue-700 ">Próxima</button>
      </div>
    </div>

    <div v-else>
      <p>Nenhum país encontrado.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CountryDetail from './CountryDetail.vue'; // Importando o componente CountryDetail
import SearchInput from './SearchInput.vue'; // Importando o componente SearchInput

export default {
  components: {
    CountryDetail, // Registrando o componente CountryDetail
    SearchInput // Registrando o componente SearchInput
  },
  data() {
    return {
      covidData: [],
      searchQuery: '',
      itemsPerPage: 20,
      currentPage: 1,
    };
  },
  computed: {
    filteredData() {
      return this.covidData.filter(countryData =>
        countryData.country.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    paginatedData() {
      if (!this.filteredData) {
        return [];
      }
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredData.slice(start, end);
    },
    totalPages() {
      return Math.ceil((this.filteredData || []).length / this.itemsPerPage);
    },
  },
  mounted() {
    this.fetchCovidData();
  },
  watch: {
    searchQuery() {
      // Resetar a página para 1 quando a pesquisa é alterada
      this.currentPage = 1;
    },
  },
  methods: {
    async fetchCovidData() {
      try {
        const response = await axios.get('https://covid19-brazil-api.vercel.app/api/report/v1/countries');
        this.covidData = response.data.data;
      } catch (error) {
        console.error('Erro ao obter dados da API:', error);
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
};
</script>

<style>
  #countries-container {
    position: relative;
    width: 100%;
  }
  #countries-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  #control-page{
    position: absolute;
    top: 10px;
    right: 20px;
  }
</style>
