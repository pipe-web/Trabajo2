<script setup>
import { ref, computed, onMounted } from 'vue';
import {
  obtenerEquipos,
  crearEquipo,
  actualizarEquipo,
  eliminarEquipo,
} from './services/equiposService';

const equipos = ref([]);
const cargando = ref(true);
const errorApi = ref('');
const busqueda = ref('');
const editandoId = ref(null);

const formulario = ref({
  codigoInventario: '',
  nombre: '',
  tipo: '',
  marca: '',
  modelo: '',
  ubicacion: '',
  estado: 'Disponible',
  fechaAdquisicion: '',
  observaciones: '',
});

const estados = ['Disponible', 'En uso', 'Mantención', 'Baja'];

const equiposFiltrados = computed(() => {
  const q = busqueda.value.toLowerCase().trim();
  return equipos.value.filter(
    (e) =>
      e.nombre.toLowerCase().includes(q) ||
      e.codigoInventario.toLowerCase().includes(q) ||
      e.tipo.toLowerCase().includes(q) ||
      e.ubicacion.toLowerCase().includes(q) ||
      e.estado.toLowerCase().includes(q)
  );
});

async function cargar() {
  cargando.value = true;
  errorApi.value = '';
  try {
    equipos.value = await obtenerEquipos();
  } catch (e) {
    errorApi.value = e.message;
  } finally {
    cargando.value = false;
  }
}

function limpiarFormulario() {
  editandoId.value = null;
  formulario.value = {
    codigoInventario: '',
    nombre: '',
    tipo: '',
    marca: '',
    modelo: '',
    ubicacion: '',
    estado: 'Disponible',
    fechaAdquisicion: '',
    observaciones: '',
  };
}

async function guardar() {
  errorApi.value = '';
  try {
    if (editandoId.value) {
      await actualizarEquipo(editandoId.value, formulario.value);
    } else {
      await crearEquipo(formulario.value);
    }
    limpiarFormulario();
    await cargar();
  } catch (e) {
    errorApi.value = e.message;
  }
}

function seleccionarParaEditar(item) {
  editandoId.value = item.id;
  formulario.value = { ...item };
}

async function borrar(id) {
  if (confirm('¿Está seguro de que desea eliminar este equipo?')) {
    try {
      await eliminarEquipo(id);
      await cargar();
    } catch (e) {
      errorApi.value = e.message;
    }
  }
}

onMounted(cargar);
</script>

<template>
  <div class="contenedor">
    <h1>Inventario de Equipamiento Tecnológico</h1>

    <!-- Mensaje de error general -->
    <div v-if="errorApi" class="alerta error">
      {{ errorApi }}
    </div>

    <!-- Formulario -->
    <section class="card">
      <h2>{{ editandoId ? 'Editar Equipo' : 'Registrar Nuevo Equipo' }}</h2>
      <form @submit.prevent="guardar" class="grid-form">
        <input v-model="formulario.codigoInventario" placeholder="Código (mín. 3)" required />
        <input v-model="formulario.nombre" placeholder="Nombre (mín. 3)" required />
        <input v-model="formulario.tipo" placeholder="Tipo (ej. Notebook, PC)" required />
        <input v-model="formulario.marca" placeholder="Marca" required />
        <input v-model="formulario.modelo" placeholder="Modelo" required />
        <input v-model="formulario.ubicacion" placeholder="Ubicación" required />
        <select v-model="formulario.estado" required>
          <option v-for="est in estados" :key="est" :value="est">{{ est }}</option>
        </select>
        <input v-model="formulario.fechaAdquisicion" type="date" required />
        <input v-model="formulario.observaciones" placeholder="Observaciones (opcional)" class="full" />
        
        <div class="acciones full">
          <button type="submit" class="btn principal">
            {{ editandoId ? 'Guardar Cambios' : 'Registrar Equipo' }}
          </button>
          <button v-if="editandoId" type="button" @click="limpiarFormulario" class="btn secundario">
            Cancelar Edición
          </button>
        </div>
      </form>
    </section>

    <!-- Filtro y Listado -->
    <section class="card">
      <h2>Equipos Almacenados</h2>
      <input
        v-model="busqueda"
        placeholder="Buscar por código, nombre, tipo, ubicación o estado..."
        class="buscador"
      />

      <p v-if="cargando" class="cargando">Cargando equipos desde MySQL...</p>

      <div v-else-if="equiposFiltrados.length === 0" class="vacio">
        No se encontraron equipos registrados.
      </div>

      <table v-else class="tabla">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Ubicación</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in equiposFiltrados" :key="item.id">
            <td><strong>{{ item.codigoInventario }}</strong></td>
            <td>{{ item.nombre }}</td>
            <td>{{ item.tipo }}</td>
            <td>{{ item.ubicacion }}</td>
            <td><span :class="['badge', item.estado.toLowerCase().replace(' ', '-')]">{{ item.estado }}</span></td>
            <td>
              <button @click="seleccionarParaEditar(item)" class="btn-sm edit">Editar</button>
              <button @click="borrar(item.id)" class="btn-sm del">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style scoped>
.contenedor { max-width: 1000px; margin: 0 auto; padding: 20px; font-family: system-ui, sans-serif; }
.card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-bottom: 20px; }
.grid-form { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; }
.full { grid-column: 1 / -1; }
input, select { padding: 8px 12px; border: 1px solid #ccc; border-radius: 4px; }
.buscador { width: 100%; box-sizing: border-box; margin-bottom: 15px; }
.btn { padding: 10px 16px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
.principal { background: #0066cc; color: white; }
.secundario { background: #666; color: white; margin-left: 8px; }
.alerta { padding: 12px; border-radius: 4px; margin-bottom: 15px; }
.error { background: #ffe6e6; color: #cc0000; border: 1px solid #ff0000; }
.tabla { width: 100%; border-collapse: collapse; text-align: left; }
.tabla th, .tabla td { padding: 10px; border-bottom: 1px solid #eee; }
.badge { padding: 4px 8px; border-radius: 12px; font-size: 0.85em; font-weight: bold; background: #eee; }
.btn-sm { padding: 4px 8px; margin-right: 4px; border: none; border-radius: 4px; cursor: pointer; }
.edit { background: #ffaa00; color: white; }
.del { background: #cc0000; color: white; }
</style>