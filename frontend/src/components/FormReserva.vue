<script setup>
import { ref, onMounted, watch } from "vue";
import { createReserva, updateReserva, getClientes, getServicios } from "../api/api";

const props = defineProps({
  reserva: { type: Object, default: null }
});

const emit = defineEmits(["cerrar", "saved"]);

const clientes = ref([]);
const servicios = ref([]);

const form = ref({
  id: null,
  clienteId: "",
  servicioId: "",
  fecha: ""
});

// Formatear fecha para el input date
function formatDate(d) {
  if (!d) return "";
  const date = new Date(d);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

async function loadData() {
  try {
    const c = await getClientes();
    const s = await getServicios();

    clientes.value = c.data;   // <-- Axios response
    servicios.value = s.data;
  } catch (e) {
    console.error("Error cargando clientes/servicios:", e);
    alert("No se pudieron cargar las listas");
  }
}

function fillForm(r) {
  form.value = {
    id: r.id,
    clienteId: r.clienteId,
    servicioId: r.servicioId,
    fecha: formatDate(r.fecha)
  };
}

onMounted(async () => {
  await loadData();
  if (props.reserva) fillForm(props.reserva);
});

watch(() => props.reserva, (val) => {
  if (val) fillForm(val);
  else form.value = { id: null, clienteId: "", servicioId: "", fecha: "" };
});

async function guardar() {
  try {
    const payload = {
      clienteId: Number(form.value.clienteId),
      servicioId: Number(form.value.servicioId),
      fecha: form.value.fecha
    };

    let res;

    if (form.value.id) {
      res = await updateReserva(form.value.id, payload);
    } else {
      res = await createReserva(payload);
    }

    emit("saved", res.data);
    emit("cerrar");
  } catch (err) {
    console.error(err);
    alert("Error al guardar la reserva");
  }
}
</script>

<template>
  <div class="modal">
    <h3>{{ form.id ? "Editar Reserva" : "Nueva Reserva" }}</h3>

    <label>Cliente:</label>
    <select v-model="form.clienteId">
      <option value="" disabled>Seleccione cliente</option>
      <option v-for="c in clientes" :key="c.id" :value="c.id">
        {{ c.nombre }}
      </option>
    </select>

    <label>Servicio:</label>
    <select v-model="form.servicioId">
      <option value="" disabled>Seleccione servicio</option>
      <option v-for="s in servicios" :key="s.id" :value="s.id">
        {{ s.nombre }}
      </option>
    </select>

    <label>Fecha:</label>
    <input type="date" v-model="form.fecha" />

    <br /><br />

    <button @click="guardar">Guardar</button>
    <button @click="emit('cerrar')">Cancelar</button>
  </div>
</template>

<style scoped>
.modal {
  padding: 20px;
  background: white;
  border: 1px solid #ccc;
}
</style>
