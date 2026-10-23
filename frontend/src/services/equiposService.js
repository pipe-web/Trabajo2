const API_URL = 'http://localhost:3000/equipos';

export async function obtenerEquipos() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al obtener el listado de equipos');
  return res.json();
}

export async function obtenerEquipoPorId(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Equipo no encontrado');
  return res.json();
}

export async function crearEquipo(datos) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  if (!res.ok) {
    const errorData = await res.json();
    const mensaje = Array.isArray(errorData.message)
      ? errorData.message.join(', ')
      : errorData.message;
    throw new Error(mensaje || 'Error al registrar equipo');
  }
  return res.json();
}

export async function actualizarEquipo(id, datos) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  if (!res.ok) {
    const errorData = await res.json();
    const mensaje = Array.isArray(errorData.message)
      ? errorData.message.join(', ')
      : errorData.message;
    throw new Error(mensaje || 'Error al actualizar equipo');
  }
  return res.json();
}

export async function eliminarEquipo(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar equipo');
  return res.json();
}