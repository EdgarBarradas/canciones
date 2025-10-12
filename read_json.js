async function cargarDatos(json_file) {
    const respuesta = await fetch(json_file);
    const song_data = await respuesta.json();
    return song_data;
  }
  
  // Luego puedes usar los datos fuera del fetch
  async function main() {
    json_file='Santo.json'
    const song_data = await cargarDatos(json_file);
    console.log(song_data); // ✅ Aquí ya puedes usar los datos
  }
  

  main();
