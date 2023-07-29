<template>
    <div id="TotalesComponent">
        <p id="purple"><i class="fa-solid fa-user-group" style="color: blueviolet"></i> Cantidad total de alumnos permitidos: <b>{{ totalCupos }}</b> alumnos.</p>
        <p id="blue"><i class="fa-solid fa-user-check" style="color: blue;"></i> Cantidad total de alumnos inscritos: <b>{{ totalInscritos }}</b> alumnos.</p>
        <p id="red"><i class="fa-solid fa-user-plus" style="color: red;"></i> Cantidad total de cupos restantes: <b>{{ totalRestantes }}</b> cupos.</p>
        <p id="pink"><i class="fa-solid fa-ban" style="color: fuchsia;"></i> Cantidad total de cursos terminados: <b>{{ totalTerminados }}</b> cursos.</p>
        <p id="activos"><i class="fa-solid fa-bell" style="color: #879523;"></i> Cantidad total de cursos activos: <b>{{ totalActivos }}</b> cursos.</p>
        <p id="orange"><i class="fa-solid fa-bell" style="color: orange;"></i> Cantidad total de cursos: <b>{{ totalCursos }}</b> cursos.</p>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    name: 'TotalesComponent',
    data() {
        return {
        }
    },
    methods: {
        ...mapActions('datos_cursos', ['consultarCursos','consultarDatosTabla'])
    },
    computed: {
        ...mapState('datos_cursos', ['datos_tabla']),
        totalCupos: function() {
            let valorInicial = 0;
            let total = this.datos_tabla.reduce((acumulador, registro) => acumulador + Number(registro.cupos), valorInicial);
            return total;
        },
        totalInscritos: function() {
            let valorInicial = 0;
            let total = this.datos_tabla.reduce((acumulador, registro) => acumulador + Number(registro.inscritos), valorInicial);
            return total;
        },
        totalRestantes: function() {
            let valorInicial = 0;
            let totalCupos = this.datos_tabla.reduce((acumulador, registro) => acumulador + Number(registro.cupos), valorInicial);
            let totalInscritos = this.datos_tabla.reduce((acumulador, registro) => acumulador + Number(registro.inscritos), valorInicial);
            let total = totalCupos - totalInscritos;
            return total;
        },
        totalTerminados: function() {
            let totalTerminados = 0;
            let longitud = this.datos_tabla.length;
            for(let i = 0; i < longitud; i++) {
                if(this.datos_tabla[i].terminado == true) {
                    totalTerminados++;
                }
            }
            return totalTerminados;
        },
        totalActivos: function() {
            let valorInicial = 0;
            let totalActivos = 0;
            totalActivos = this.datos_tabla.reduce((acumulador, registro) => {
                if(registro.terminado === false) {
                    acumulador++;
                }
                return acumulador;
            }, valorInicial);
            return totalActivos
        },
        totalCursos: function() {
            let total = this.datos_tabla.length;
            return total;
        },
    },
}
</script>

<style scoped>
#TotalesComponent {
    width: 77%;
    margin: 0 auto;
    margin-top: 50px;
}
p {
    border: 1px solid black;
    border-radius: 5px;
    padding: 10px;
    text-align: start;
}
#purple {
    color: blueviolet;
    border-color: blueviolet;
}
#blue {
    color: blue;
    border-color: blue;
}
#red {
    color: red;
    border-color: red;
}
#pink {
    color: fuchsia;
    border-color: fuchsia;
}
#activos {
    color: #879523;
    border-color: #879523;
}
#orange {
    color: orange;
    border-color: orange;
}
</style>