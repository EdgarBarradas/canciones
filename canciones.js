canciones = [
    {
        "titulo":"Cristo luz de los pueblos",
        "tiempos":["Ordinario"],
        "misas":["No filtrar"],
        "momentos":["No filtrar"],
        "audio":"audios/CristoLuzDeLosPueblos.mp4",
        "pdf":"pdfs/1.pdf",
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
        "pdf":"pdfs/2.pdf",
        "autor":"xxxxx",
        "tono":"xxxxx",
        "ritmo":"xxxxxx",
        "texto":"2",
      },
]

function mostrar(){
    // console.log("naco")
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
        console.log(c.pdf)
        ll=c.pdf
          document.getElementById('resultados').innerHTML += `
            <div class="cancion">
              <h3>${c.titulo} </h3>
              <h4 onclick="mostrar(${ll})">Ver letra y acordes</h4>
              <audio controls src="${c.audio}"></audio>
            </div>`;
    });
}

  









