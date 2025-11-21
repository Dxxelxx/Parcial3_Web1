<script setup>
import { ref, watch } from "vue";
import { createCliente, updateCliente } from "../api/api";

const props = defineProps({
  cliente: Object
});

const emit = defineEmits(["cerrar"]);

const form = ref({
  nombre: "",
  email: "",
  telefono: ""
});

// Si está editando, rellenar los campos
watch(
  () => props.cliente,
  (val) => {
    console.log("Cliente recibido en modal:", val);

    if (val) {
      form.value = { ...val };
    } else {
      form.value = { nombre: "", email: "", telefono: "" };
    }
  },
  { immediate: true }
);

const guardar = async () => {
  console.log("Datos enviados al backend:", form.value);

  if (props.cliente) {
    // Editar cliente
    await updateCliente(props.cliente.id, form.value);
  } else {
    // Crear cliente
    await createCliente(form.value);
  }

  emit("cerrar"); // Cerrar modal y recargar lista
};
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <h3>{{ props.cliente ? "Editar Cliente" : "Nuevo Cliente" }}</h3>

      <label>Nombre:</label>
      <input v-model="form.nombre" type="text" />

      <label>Email:</label>
      <input v-model="form.email" type="email" />

      <label>Teléfono:</label>
      <input v-model="form.telefono" type="text" />

      <div class="buttons">
        <button @click="guardar">Guardar</button>
        <button @click="emit('cerrar')">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  width: 350px;
  border-radius: 8px;
}

label {
  display: block;
  margin-top: 10px;
}

input {
  width: 100%;
  margin-top: 5px;
  padding: 6px;
  box-sizing: border-box;
}

.buttons {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}
</style>
