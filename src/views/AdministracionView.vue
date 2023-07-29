<template>
    <div id="AdministracionView">
        <h3>Administración</h3>
        <b-button variant="primary" @click="modalShow = !modalShow">Agregar curso</b-button>
        <TablaComponent />
        <TotalesComponent />
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
                        <b-button type="submit" variant="success" class="m-3">Agregar</b-button>
                        <b-button type="reset" id="btn2">Limpiar formulario</b-button>
                        <b-button class="m-3" variant="danger" @click="modalShow = !modalShow">Cancelar</b-button>
                    </b-form>
                </div>
            </b-modal>
        </div>
    </div>
</template>

<script>
import TablaComponent from '@/components/TablaComponent.vue'
import TotalesComponent from '@/components/TotalesComponent.vue'
import { mapState, mapActions } from 'vuex'
export default {
    name: 'AdministracionView',
    components: {
        TablaComponent,
        TotalesComponent
    },
    data: function() {
        return {
            modalShow: false,
            form_tabla: {
                id: '',
                img: '',
                curso: '',
                costo: 0,
                duracion: '',
                cupos: 0,
                inscritos: 0,
                terminado: false,
                fecha: '',
                descripcion: ''
            },
            form:{
                id:'',
                nombre: '',
                img: '',
                costo: 0,
                duracion:'',
                cupos:0,
                inscritos:0,
                completado:false,
                fecha_registro:'',
                descripcion:'',
            },
            show: true
        }
    },
    methods: {
        ...mapActions('datos_cursos', ['registrarDatosCards', 'registrarDatosTabla'] ),
        onSubmit(event) {
            event.preventDefault();
            if(Number(this.form.inscritos) > Number(this.form.cupos)) {
                alert('La cantidad de inscritos no debe ser mayor que la cantidad de cupos. Ingrese valores correctos.');
            } 
            else {
                //alert(JSON.stringify(this.form)); //funcion para convertir a json los datos del form
                // //Para generar id:
                let indiceultimo = this.datos.length -1;
                let elidultimo = this.datos[indiceultimo].id;
                let nuevoid = elidultimo + 1;

                this.form.id = nuevoid;
                this.form_tabla.id = this.form.id;
                this.form_tabla.curso = this.form.nombre;
                this.form_tabla.img = this.form.img;
                this.form_tabla.costo = this.form.costo;
                this.form_tabla.duracion = this.form.duracion;
                this.form_tabla.cupos = this.form.cupos;
                this.form_tabla.inscritos = this.form.inscritos;
                this.form_tabla.terminado = this.form.completado;
                let date = new Date(this.form.fecha_registro).toLocaleDateString('es-CL', {timeZone: "UTC"});
                date = date.split('-').join('/');
                this.form_tabla.fecha = date;
                this.form.fecha_registro = date;
                this.form_tabla.descripcion= this.form.descripcion;
                
                let dataCards = {...this.form}
                let dataTabla = {...this.form_tabla}

                this.registrarDatosCards(dataCards);
                this.registrarDatosTabla(dataTabla);
                this.modalShow = false;
                this.onReset(event);
            }
        },
        onReset(event) {
            event.preventDefault()
            // Reset our form values
            this.form.img = '',
            this.form.nombre =  '',
            this.form.costo =  0,
            this.form.duracion =  '',
            this.form.cupos =  0,
            this.form.inscritos =  0,
            this.form.completado =  false,
            this.form.fecha_registro =  '',
            this.form.descripcion =  '',
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
            this.show = true
            })
        }
    },
    computed:{
        ...mapState('datos_cursos',['datos','cursos_no_completados']),
    },
}
</script>

<style scoped>
#AdministracionView {
    margin-top: 30px;
}
h3 {
    margin-bottom: 40px;
}
#btn2 {
    background-color: orange;
    border: 0px;
}
</style>