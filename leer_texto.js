async function leerArchivoDeTexto(txt_file) {
    return await (await fetch((txt_file))).text();
    }

// Luego puedes usar los datos fuera del fetch
async function usarTexto(txt_file) {
    // txt_file="console_log.txt"
    contenido_txt = await leerArchivoDeTexto(txt_file);
    console.log(contenido_txt);
    eval(contenido_txt)
    }

usarTexto("console_log.txt");



