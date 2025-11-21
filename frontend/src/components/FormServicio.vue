<script setup>
import { ref, watch } from "vue";
import { createServicio, updateServicio } from "../api/api";

const props = defineProps({
  servicio: Object
});

const emit = defineEmits(["cerrar"]);

const form = ref({
  nombre: "",
  precio: ""
});

// Autocompletar si es edición
watch(
  () => props.servicio,
  (val) => {
    if (val) {
      form.value = { ...val };
    } else {
      form.value = { nombre: "", precio: "" };
    }
  },
  { immediate: true }
);

const guardar = async () => {
  if (props.servicio) {
    await updateServicio(props.servicio.id, form.value);
  } else {
    await createServicio(form.value);
  }
  emit("cerrar");
};
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <h3>{{ props.servicio ? "Editar Servicio" : "Nuevo Servicio" }}</h3>

      <label>Nombre:</label>
      <input v-model="form.nombre" type="text" />

      <label>Precio:</label>
      <input v-model="form.precio" type="number" min="0" />

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
