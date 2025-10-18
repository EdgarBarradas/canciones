async function usarTexto(txt_file) {
    global letra_acordes = await (await fetch((txt_file))).text();
    console.log(letra_acordes);
    eval(letra_acordes)
    }

usarTexto("console_log.txt");





