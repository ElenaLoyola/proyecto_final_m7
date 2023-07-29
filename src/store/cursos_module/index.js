import axios from 'axios'
const datos_cursos = {
    namespaced: true,
    state: {
        datos: [],
        datos_tabla: [],
        curso_editar_card: {},
        curso_editar_tabla: {}
    },
    getters: {
        consultarNoCompletados:(state)=>{
            let nuevoArray = state.datos.filter(curso => curso.completado === false);
            return nuevoArray;
        }
    },
    mutations: {
        CONSULTAR_CURSOS: (state, unoscursos) => {
            state.datos = unoscursos; //se envia info a objeto datos en el state
        },
        ASIGNAR_CURSOS_NO_COMPLETADOS: (state, nocompletados) => {
            state.cursos_no_completados = nocompletados;
        },
        CONSULTAR_DATOS_TABLA: (state, datosprocesados) => {
            state.datos_tabla = datosprocesados;
        },
        ELIMINAR_CURSO: (state, unid) => {
            let indice = state.datos_tabla.findIndex(registro => registro.id == unid);
            state.datos_tabla.splice(indice, 1);
            let indiceLista = state.datos.findIndex(registro => registro.id == unid);
            state.datos.splice(indiceLista, 1);
        },
        REGISTRAR_DATOS_CARDS: (state, curso) => {
            state.datos.push(curso);
        },
        REGISTRAR_DATOS_TABLA: (state, curso) => {
            state.datos_tabla.push(curso);
        },
        CONSULTAR_CURSOS_EDITAR_CARD: (state, id) => {
            let elindice =  state.datos.findIndex(registro => registro.id == id);
            state.curso_editar_card = state.datos[elindice];
        },
        CONSULTAR_CURSOS_EDITAR_TABLA:(state, id)=>{
            let elindice =  state.datos_tabla.findIndex(registro => registro.id == id);
            state.curso_editar_tabla = state.datos_tabla[elindice];
        },
        EDITAR_DATOS_CARD:(state,objetoregistro)=>{
            let elindice =  state.datos.findIndex(registro => registro.id == objetoregistro.id);
            state.datos.splice(elindice,1,objetoregistro);
        },
        EDITAR_DATOS_TABLA:(state,objetoregistro)=>{
            let elindice =  state.datos_tabla.findIndex(registro => registro.id == objetoregistro.id);
            state.datos_tabla.splice(elindice,1,objetoregistro);
        },
    },
    actions: {
        consultarCursos: (context)=> {
            let url = "datoscursos.json"; //si lo guardo en carpeta public
            //let url = 'http://localhost:3000/cursos' //si se usa json-server (hay que guardar el json en una carpeta y luego levantar el servidor en esa carpeta (fake_api) con comando json-server --watch nombreArchivo.json) (solo envio respuesta.data)
            axios.get(url)
            .then(respuesta => {
                context.commit('CONSULTAR_CURSOS', respuesta.data.cursos)//llamamos al mutation
            })
            .catch(error => {
                console.log(error);
            });
        },
        consultarDatosTabla: (context) => {
            let url = "datoscursos.json";
            axios.get(url)
            .then(respuesta => {
                let longitud = respuesta.data.cursos.length;
                let nuevoArreglo = []
                for(let i = 0; i < longitud; i ++) {
                    let registro = {}
                    registro.id = respuesta.data.cursos[i].id;
                    registro.curso = respuesta.data.cursos[i].nombre;
                    registro.cupos = respuesta.data.cursos[i].cupos;
                    registro.inscritos = respuesta.data.cursos[i].inscritos;
                    registro.duracion = respuesta.data.cursos[i].duracion;
                    registro.costo = respuesta.data.cursos[i].costo;
                    registro.terminado = respuesta.data.cursos[i].completado;
                    registro.fecha = respuesta.data.cursos[i].fecha_registro;
                    registro.acciones = '';
                    nuevoArreglo.push(registro);
                };
                context.commit('CONSULTAR_DATOS_TABLA', nuevoArreglo)
            })
            .catch(error => {
                console.log(error);
            });
        },
        consultarCursosEditarCard:(context, id)=>{
            context.commit('CONSULTAR_CURSOS_EDITAR_CARD', id);
        },
        consultarCursosEditarTabla:(context, id)=>{
            context.commit('CONSULTAR_CURSOS_EDITAR_TABLA', id);
        },
        editarDatosCard:(context, objetoregistro)=>{
            context.commit('EDITAR_DATOS_CARD',objetoregistro);
        },
        editarDatosTabla:(context, objetoregistro)=>{
            context.commit('EDITAR_DATOS_TABLA',objetoregistro);
        },
        eliminarCurso: (context, id) => {
            context.commit('ELIMINAR_CURSO', id);
        },
        registrarDatosCards: (context, nuevocurso) => {
            context.commit('REGISTRAR_DATOS_CARDS', nuevocurso);
        },
        registrarDatosTabla: (context, nuevocurso) => {
            context.commit('REGISTRAR_DATOS_TABLA', nuevocurso);
        }
    },
    modules: {}
};

export default datos_cursos;