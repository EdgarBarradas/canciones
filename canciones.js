canciones = [
    {
        "titulo":"Cristo luz de los pueblos",
        "tiempos":["Ordinario"],
        "misas":["No filtrar"],
        "momentos":["No filtrar"],
        "audio":"audios/CristoLuzDeLosPueblos.mp4",
        "txt":"letras/1.txt",
        "autor":"xxxxx",
        "tono":"xxxxx",
        "ritmo":"xxxxxx",
        "texto":"1",
      },
      {
        "titulo":"Himno Jubileo 2025",
        "tiempos":["Pascua"],
        "misas":["No filtrar"],
        "momentos":["No filtrar"],
        "audio":"audios/2.mp3",
        "txt":"letras/2.txt",
        "autor":"xxxxx",
        "tono":"xxxxx",
        "ritmo":"xxxxxx",
        "texto":"2",
      },
]

async function mostrarLetraAcordes(txt_file) {
    letra_acordes = await (await fetch((txt_file))).text();
    eval(letra_acordes)
    console.log(letra)
    }        

function filtrar() {
    document.getElementById('letra').innerHTML=""
    tiempo=document.getElementById('tiempo').value
    misa=document.getElementById('misa').value
    momento=document.getElementById('momento').value
    texto=document.getElementById('textoBusqueda').value.toLowerCase()

    document.getElementById("resultados").innerHTML = ""

    canciones_filtradas = canciones.filter(c =>
        ( tiempo==="" || (c.tiempos.includes(tiempo))) &&
        ( misa==="" || (c.misas.includes(misa))) &&
        ( momento==="" || (c.momentos.includes(momento))) &&
        ( texto==="" || c.titulo.toLowerCase().includes(texto))
        )

    canciones_filtradas.forEach(c => {
          document.getElementById('resultados').innerHTML += `
            <div class="cancion">
              <h3>${c.titulo} </h3>
              <h4 onclick="mostrarLetraAcordes('${c.txt}')">Ver letra y acordes</h4>
              <audio controls src="${c.audio}"></audio>
            </div>`;
    });
}

  














