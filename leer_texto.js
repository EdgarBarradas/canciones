async function cargarDatos(txt_file) {
    const respuesta = await fetch(txt_file);
    const song_data = await respuesta.json();
    return song_data;
    }
// Luego puedes usar los datos fuera del fetch
async function main() {
    txt_file="console_log.txt"
    const song_data = await cargarDatos(txt_file);
    console.log(song_data); // ✅ Aquí ya puedes usar los datos
    }
main();