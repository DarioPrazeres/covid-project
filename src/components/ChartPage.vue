<template>
  <div>
    <div id="grafic">
      <button id="btn-full-grafic" @click="showFullChart">Ver Gráfico Completo</button>
      <div id="chart_div"></div>
      <div id="control-grafic">
        <button @click="prevPage" :disabled="currentPage === 0">Anterior</button>
        <button @click="nextPage" :disabled="currentPage === totalPages">Próximo</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      dataCovid: [],
      currentPage: 0,
      pageSize: 15
    };
  },
  mounted() {
    google.charts.load('current', {packages: ['corechart', 'bar']});
    google.charts.setOnLoadCallback(this.drawBasic);
  },
  methods: {
    async fetchCovidData() {
      try {
        const response = await axios.get('https://covid19-brazil-api.vercel.app/api/report/v1/countries');
        return response.data.data;
      } catch (error) {
        console.error('Erro ao obter dados da API:', error);
      }
    },
    async drawBasic() {
      this.dataCovid = await this.fetchCovidData();
      this.renderChart();
    },
    renderChart() {
      const formattedData = this.formatData(this.getCurrentPageData());
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Country');
      data.addColumn('number', 'Confirmed Cases');
      data.addColumn('number', 'Deaths'); // Adicionando a série para mortes
      data.addRows(formattedData);
      var options = {
        title: 'Casos Confirmados e Mortes por País (Top 15)',
        hAxis: {
          title: 'País'
        },
        vAxis: {
          title: 'Casos Confirmados e Mortes'
        }
      };
      var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    },
    formatData(data) {
      return data.map(countryData => [countryData.country, countryData.confirmed, countryData.deaths]); // Adicionando mortes aos dados formatados
    },
    getCurrentPageData() {
      const startIndex = this.currentPage * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.dataCovid.slice(startIndex, endIndex);
    },
    nextPage() {
      if ((this.currentPage + 1) * this.pageSize < this.dataCovid.length) {
        this.currentPage++;
        this.renderChart();
      }
    },
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.renderChart();
      }
    },
    showFullChart() {
      const formattedData = this.formatData(this.dataCovid);
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Country');
      data.addColumn('number', 'Confirmed Cases');
      data.addColumn('number', 'Deaths');
      data.addRows(formattedData);
      var options = {
        title: 'Casos Confirmados e Mortes por País',
        hAxis: {
          title: 'País'
        },
        vAxis: {
          title: 'Casos Confirmados e Mortes'
        }
      };
      var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }
  }
};
</script>

<style>
#grafic {
  position: relative;
}
#chart_div {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 600px;
}
#btn-full-grafic {
  border: solid 1px #0B5ED7;
  background-color: #157347;
  color: #FFF;
}
#control-grafic {
  top: 0px;
  right: 10px;
  position: absolute;
}
#control-grafic button {
  border: solid 1px #0B5ED7;
  background-color: #0B5ED7;
  color: #FFF;
}
</style>
