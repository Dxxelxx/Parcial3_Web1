<script setup>
import { ref, onMounted } from "vue";
import { getServicios, deleteServicio } from "../api/api";
import FormServicio from "../components/FormServicio.vue";

const servicios = ref([]);

const cargar = async () => {
  const r = await getServicios();
  servicios.value = r.data;
};

onMounted(cargar);

const mostrandoFormulario = ref(false);
const servicioSeleccionado = ref(null);

const nuevo = () => {
  servicioSeleccionado.value = null;
  mostrandoFormulario.value = true;
};

const editar = (s) => {
  servicioSeleccionado.value = s;
  mostrandoFormulario.value = true;
};

const eliminar = async (id) => {
  await deleteServicio(id);
  cargar();
};
</script>

<template>
  <div>
    <h1>Servicios</h1>

    <button @click="nuevo">Nuevo Servicio</button>

    <table border="1" style="margin-top: 15px;">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="s in servicios" :key="s.id">
          <td>{{ s.id }}</td>
          <td>{{ s.nombre }}</td>
          <td>${{ s.precio }}</td>
          <td>
            <button @click="editar(s)">Editar</button>
            <button @click="eliminar(s.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <FormServicio
      v-if="mostrandoFormulario"
      :servicio="servicioSeleccionado"
      @cerrar="mostrandoFormulario = false; cargar()"
    />
  </div>
</template>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
}

button {
  margin: 4px;
  padding: 6px 12px;
}
</style>
