<template>
    <div id="TablaComponent">
        <table>
            <thead>
                <tr>
                    <th>Curso</th>
                    <th>Cupos</th>
                    <th>Inscritos</th>
                    <th>Duración</th>
                    <th>Costo</th>
                    <th>Terminado</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="dato in datos_tabla" :key="dato.id">
                    <td>{{ dato.curso }}</td>
                    <td>{{ dato.cupos }}</td>
                    <td>{{ dato.inscritos }}</td>
                    <td>{{ dato.duracion }}</td>
                    <td><p class="color">${{ dato.costo }}</p></td>
                    <td v-if="dato.terminado == false"><p class="estado estiloNo">No</p></td>
                    <td v-else><p class="estado estiloSi">Sí</p></td>
                    <td><p class="color">{{ dato.fecha }}</p></td>
                    <td><a href=""><i v-on:click.prevent="activarEditar(dato.id)" class="fa-solid fa-pencil" style="color: #ee961b;"></i></a><a href=""><i v-on:click.prevent="eliminar(dato.id)" class="fa-solid fa-trash-can" style="color: #f00000;"></i></a></td>
                </tr>
            </tbody>
        </table>
        <!--Modal-->
        <div>
            <b-modal v-model="modalShow" hide-footer>
                <div>
                    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                        <b-form-group label="Nombre:" label-for="nombre" class="mb-3">
                            <b-form-input id="nombre" v-model="form.nombre" placeholder="" required></b-form-input>
                        </b-form-group>
                        <b-form-group label="URL de la imagen:" label-for="img" class="mb-3">
                            <b-form-input id="img" v-model="form.img" placeholder="" required></b-form-input>
                        </b-form-group>
                        <b-form-group label="Cupos del curso:" label-for="cupos" class="mb-3">
                            <b-form-input id="cupos" v-model="form.cupos" placeholder="" required type="number"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Inscritos en el curso:" label-for="inscritos" class="mb-3">
                            <b-form-input id="inscritos" v-model="form.inscritos" placeholder="" required type="number"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Duración del curso:" label-for="duracion" class="mb-3">
                            <b-form-input id="duracion" v-model="form.duracion" placeholder="" required></b-form-input>
                        </b-form-group>
                        <b-form-group label="Fecha de registro:" label-for="fecha" class="mb-3">
                            <b-form-input id="fecha" v-model="form.fecha_registro" placeholder="" required type="date"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Costo del curso:" label-for="costo" class="mb-3">
                            <b-form-input id="costo" v-model="form.costo" placeholder="" required type="number"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Descripción del curso:" label-for="textarea" class="mb-4">
                            <b-form-textarea id="textarea" v-model="form.descripcion" placeholder="Ingrese aquí la descripción" rows="3" max-rows="6"></b-form-textarea>
                        </b-form-group>
                        <b-button type="submit" variant="success" class="m-2">Editar</b-button>
                        <b-button class="m-2" variant="danger" @click="modalShow = !modalShow">Cerrar</b-button>
                    </b-form>
                </div>
            </b-modal>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
    name: 'TablaComponent',
    props: {
    },
    data: function () {
        return {
            modalShow: false,
            form: {
                id: '',
                nombre: '',
                img: '',
                costo: 0,
                duracion: '',
                cupos: 0,
                inscritos: 0,
                completado: false,
                fecha_registro: '',
                descripcion: '',
            },
            form_tabla: {
                id: '',
                curso: '',
                img: '',
                costo: 0,
                duracion: '',
                cupos: 0,
                inscritos: 0,
                terminado: false,
                fecha: '',
                descripcion: '',
            },
            show: true,
            mostrarTabla: true,
        }
    },
    methods: {
        ...mapActions('datos_cursos', ['consultarDatosTabla', 'eliminarCurso', 'consultarCursosEditarCard', 'consultarCursosEditarTabla', 'editarDatosCard', 'editarDatosTabla']),
        eliminar: function (elid) {
            let respuesta = confirm('¿Está seguro que desea eliminar el curso?');
            if (respuesta == true) {
                this.eliminarCurso(elid);
            }
        },
        onSubmit(event) {
            event.preventDefault();
            this.$nextTick(() => {
                this.editarDatosCard(this.form);
            });
            this.form_tabla.id = this.form.id;
            this.form_tabla.curso = this.form.nombre;
            this.form_tabla.img = this.form.img;
            this.form_tabla.costo = this.form.costo;
            this.form_tabla.duracion = this.form.duracion;
            this.form_tabla.cupos = this.form.cupos
            this.form_tabla.inscritos = this.form.inscritos;
            this.form_tabla.terminado = this.form.completado;
            let date = new Date(this.form.fecha_registro).toLocaleDateString('es-CL', {timeZone: "UTC"});
            date = date.split('-').join('/');
            this.form_tabla.fecha = date;
            this.form.fecha_registro = date;
            this.form_tabla.descripcion = this.form.descripcion;

            this.$nextTick(() => {
                this.editarDatosTabla(this.form_tabla);
            })

            this.$nextTick(() => {
                this.mostrarTabla = true
            })

            this.modalShow = false;
        },
        onReset(event) {
            event.preventDefault()
            this.form.nombre = '';
            this.form.img = '',
            this.form.costo = 0;
            this.form.duracion = '';
            this.form.cupos = 0;
            this.form.inscritos = 0;
            this.form.completado = false;
            this.form.fecha_registro = '';
            this.form.descripcion = '';
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        },
        activarEditar(unid) {
            this.$nextTick(() => {
                this.mostrarTabla = false;
            })
            this.consultarCursosEditarCard(unid);
            this.consultarCursosEditarTabla(unid);
            this.modalShow = true;
            this.form.id = unid;
            this.form.nombre = this.curso_editar_card.nombre;
            this.form.img = this.curso_editar_card.img;
            this.form.costo = this.curso_editar_card.costo;
            this.form.duracion = this.curso_editar_card.duracion;
            this.form.cupos = this.curso_editar_card.cupos;
            this.form.inscritos = this.curso_editar_card.inscritos;
            this.form.completado = this.curso_editar_card.completado;
            this.form.fecha_registro = this.curso_editar_card.fecha_registro;
            this.form.descripcion = this.curso_editar_card.descripcion;
        },
    },
    computed: {
        ...mapState('datos_cursos', ['datos_tabla', 'curso_editar_card', 'curso_editar_tabla']),
    },
}
</script>

<style scoped>
#TablaComponent {
    width: 80%;
    margin: 0 auto;
    margin-top: 50px;
    overflow-x: auto;
}
table {
    margin: 0 auto;
}
td, th {
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    border-bottom: 1px solid rgb(180, 180, 180);
    text-align: start;
}
a {
    margin-right: 10px;
    margin-left: 10px;
}
.color {
    background-color: rgb(0 200 83);
    border-radius: 20px;
    color: white;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 0px;
}
.estado, .estiloNo {
    background-color: #bcaaa4;
    width: 50px;
    border-radius: 50px;
    color: white;
    padding: 5px;
    padding-left: 2px;
    padding-right: 2px;
    margin-bottom: 0px;
    margin: 0 auto;
    text-align: center;
}
.estiloSi {
    background-color:#00b0ff;
}
</style>