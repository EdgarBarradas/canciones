// async function leerArchivoDeTexto(txt_file) {
//     return await (await fetch((txt_file))).text();
//     }

// Luego puedes usar los datos fuera del fetch
async function usarTexto(txt_file) {
    contenido_txt = await (await fetch((txt_file))).text();
    console.log(contenido_txt);
    eval(contenido_txt)
    }

usarTexto("console_log.txt");




