<script setup>
import { ref, onMounted } from "vue";
import { getClientes, deleteCliente } from "../api/api";
import FormCliente from "../components/FormCliente.vue";

const clientes = ref([]);

const cargar = async () => {
  const r = await getClientes();
  clientes.value = r.data;
};

onMounted(cargar);

const mostrandoFormulario = ref(false);
const clienteSeleccionado = ref(null);

const nuevo = () => {
  clienteSeleccionado.value = null;
  mostrandoFormulario.value = true;
};

const editar = (c) => {
  clienteSeleccionado.value = c;
  mostrandoFormulario.value = true;
};

const eliminar = async (id) => {
  await deleteCliente(id);
  cargar();
};
</script>

<template>
  <div>
    <h1>Clientes</h1>

    <button @click="nuevo">Nuevo Cliente</button>

    <table border="1" style="margin-top: 15px;">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="c in clientes" :key="c.id">
          <td>{{ c.id }}</td>
          <td>{{ c.nombre }}</td>
          <td>{{ c.email }}</td>
          <td>{{ c.telefono }}</td>
          <td>
            <button @click="editar(c)">Editar</button>
            <button @click="eliminar(c.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Formulario modal -->
    <FormCliente
      v-if="mostrandoFormulario"
      :cliente="clienteSeleccionado"
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
