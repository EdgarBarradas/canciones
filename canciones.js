canciones = [
    {
        "titulo":"Cristo luz de los pueblos",
        "tiempos":["Ordinario"],
        "misas":["No filtrar"],
        "momentos":["No filtrar"],
        "mp3":"audios/1.mp3",
        "pdf":"pdfs/1.pdf",
        "autor":"xxxxx",
        "tono":"xxxxx",
        "ritmo":"xxxxxx",
        "textto":"1",
      },
      {
        "titulo":"Himno Jubileo 2025",
        "tiempos":["Pascua"],
        "misas":["No filtrar"],
        "momentos":["No filtrar"],
        "mp3":"audios/2.mp3",
        "pdf":"pdfs/2.pdf",
        "autor":"xxxxx",
        "tono":"xxxxx",
        "ritmo":"xxxxxx",
        "texto":"2",
      },
    ]

    function filtrar() {
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

      console.log(canciones)
      console.log(canciones_filtradas)
      
      
    canciones_filtradas.forEach(c => {
      document.getElementById('resultados').innerHTML += `
        <div class="cancion">
          <h3>${c.titulo} </h3>
          <audio controls src="${c.mp3}"></audio>
        </div>
  `;
});
    }
  