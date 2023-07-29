<template>
  <div class="ListaComponent">
    <h3>{{ titulo }}</h3>
    <div id="contenedor-cards">
      <div class="tarjeta" v-for="curso in consultarNoCompletados" :key="curso.id">
        <b-card 
          :title="curso.nombre" 
          :img-src="curso.img" 
          img-alt="Image" 
          img-top 
          tag="article"
          style="max-width: 20rem;" 
          class="mb-2">
          <b-card-text class="titulo-info">
            Información
          </b-card-text>
          <div class="info">
            <b-card-text>
              Costo: <b>${{ curso.costo }}</b><br>
              Duración: {{ curso.duracion }}
            </b-card-text>
          </div>
          <div class="info2">
            <b-card-text v-if="curso.completado == false">
              Cupos: <b>{{ curso.cupos }}</b><br>
              Completado: No
            </b-card-text>
            <b-card-text v-else>
              Cupos: <b>{{ curso.cupos }}</b><br>
              Completado: Sí
            </b-card-text>
          </div>
          <div class="info">
            <b-card-text>
              Fecha de registro:<br>
              {{ curso.fecha_registro }}
            </b-card-text>
          </div>
          <div class="info2">
            <b-card-text>
              Descripción:<br>
              {{ curso.descripcion }}
            </b-card-text>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
export default {
  name: 'ListaComponent',
  props: {
    titulo: String
  },
  methods: {
    ...mapActions('datos_cursos', ['consultarCursos']),
  },
  computed: {
    ...mapState('datos_cursos', ['datos']),
    ...mapGetters('datos_cursos', ['consultarNoCompletados'])
  }
}
</script>

<style scoped>
  h3 {
    margin: 30px;
  }
  #contenedor-cards {
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    justify-content: center;
  }
  .tarjeta {
    width: 280px;
    margin-bottom: 20px;
    align-content: stretch;
    margin: 15px;
    display: flex;
  }
  .card {
    width: 100%;
  }
  img {
    width: 200px;
    margin: 0 auto;
    padding-top: 20px;
  }
  .titulo-info {
    color: gray;
    text-align: start;
    font-weight: bold;
    margin-top: 30px;
    margin-bottom: 0px;
  }
  .info {
    text-align: start;
    color: gray;
    font-size: 13px;
    border-left: 2px solid rgb(212, 210, 210);
    padding-left: 50px;
    padding-top: 10px;
    margin-left:30px ;
    position: relative;
  }
  .info::after {
    content: '';
    position: absolute;
    left: -9%;
    top: 10px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: rgb(126 87 194);
    border: 3px solid white;
    box-shadow: gray 1px 1px 1px;
  }
  .info2 {
    text-align: start;
    color: gray;
    font-size: 13px;
    border-left: 2px solid rgb(212, 210, 210);
    padding-left: 50px;
    padding-top: 10px;
    margin-left:30px ;
    position: relative;
  }
  .info2::after {
    content: '';
    position: absolute;
    left: -9%;
    top: 10px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: rgb(76 175 80);
    border: 3px solid white;
    box-shadow: gray 1px 1px 1px;
}
</style>
