<script>
export default {
  data() {
      return {
        activeComp: ''
      }
    }
}
</script>
<template>
  <section id="body-content">
    <header>
    <h1>Como Deseja Ver os Dados?</h1>
    <router-link to="/">Grafico</router-link>
    <router-link to="/countries">Dados por País</router-link><br>
  </header>
  <div id="project">
    <router-view></router-view>
  </div>
  </section>
</template>



<style scoped>
  #project{
    width: 100%;
  }
  a {
    display: inline-block;
    background-color: #157347;
    border-radius: 8px;
    color: white;
    padding: 10px;
    margin: 10px;
    height: 50px;
    min-width: 150px;
  }
  a:hover {
    background-color: rgb(110, 79, 13);
  }
  div {
    padding: 10px;
  }
</style>
