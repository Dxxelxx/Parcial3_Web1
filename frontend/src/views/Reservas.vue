<script setup>
import { ref, onMounted } from "vue";
import { getReservas, deleteReserva, getClientes, getServicios } from "../api/api";
import FormReserva from "../components/FormReserva.vue";

const reservas = ref([]);
const clientes = ref([]);
const servicios = ref([]);

async function cargar() {
  const r = await getReservas();
  const c = await getClientes();
  const s = await getServicios();

  reservas.value = r.data;
  clientes.value = c.data;
  servicios.value = s.data;
}

onMounted(cargar);

function eliminar(id) {
  deleteReserva(id).then(cargar);
}

const mostrandoFormulario = ref(false);
const reservaSeleccionada = ref(null);

function nueva() {
  reservaSeleccionada.value = null;
  mostrandoFormulario.value = true;
}

function editar(r) {
  reservaSeleccionada.value = r;
  mostrandoFormulario.value = true;
}

function getClienteNombre(id) {
  const c = clientes.value.find(x => x.id === id);
  return c ? c.nombre : "Desconocido";
}

function getServicioNombre(id) {
  const s = servicios.value.find(x => x.id === id);
  return s ? s.nombre : "Desconocido";
}
</script>

<template>
  <div>
    <h2>Reservas</h2>

    <button @click="nueva">Nueva Reserva</button>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Cliente</th>
          <th>Servicio</th>
          <th>Fecha</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="r in reservas" :key="r.id">
          <td>{{ r.id }}</td>
          <td>{{ getClienteNombre(r.clienteId) }}</td>
          <td>{{ getServicioNombre(r.servicioId) }}</td>
          <td>{{ r.fecha }}</td>

          <td>
            <button @click="editar(r)">Editar</button>
            <button @click="eliminar(r.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <FormReserva 
      v-if="mostrandoFormulario"
      :reserva="reservaSeleccionada"
      @cerrar="mostrandoFormulario = false; cargar()"
    />
  </div>
</template>
