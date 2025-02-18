export async function fetchJson(folder, fileName) {
  try {
    const url = `/json/${folder}/${fileName}.json`
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Error al cargar ${fileName}`)

    const json = await response.json()

    if (!json?.data) throw new Error(`Formato inesperado en ${fileName}`)

    return json.data // Devuelve los datos directamente
  } catch (error) {
    console.error(`Error cargando ${fileName}:`, error)
    return null
  }
}
