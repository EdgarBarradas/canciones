tonalidades=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']
tonalidades_m=['Cm','C#m','Dm','D#m','Em','Fm','F#m','Gm','G#m','Am','A#m','Bm']

function reverse_indexes(texto,cadena){
  indexes=[]
  i=texto.indexOf(cadena)
  while (i !== -1) {
    indexes.push(i);
    i = texto.indexOf(cadena, i + cadena.length);
  }
  indexes.sort((a, b) => b - a);
return indexes
}

function crear_bloque_letra(letra){////////////////////////////------Esta función dibuja el bloque de la letra y los acordes de una canción
  document.getElementById("bloque_letra").innerHTML = '<h2 id="titulo">'+letra.titulo+'</h2>'
  document.getElementById("bloque_letra").innerHTML += '<h3 id="tonalidad">tonalidad: '+letra.tonalidad+'</h3>'
  document.getElementById("bloque_letra").innerHTML += '<label>Transponer a:</label>'
  document.getElementById("bloque_letra").innerHTML += '<select id="transponer" onchange=transponer(this.value)></select>'
  
  if (letra.tonalidad.charAt(letra.tonalidad.length - 1)=='m'){
    tonalidades_m.forEach((t,i)=>{
      if (letra.tonalidad===t){s=" selected"}
      else{s=""}
      document.getElementById("transponer").innerHTML += '<option value="'+t+'"'+s+'>'+t+'</option>'
      })
  }
  else{
    tonalidades.forEach((t,i)=>{
      if (letra.tonalidad===t){s=" selected"}
      else{s=""}
      document.getElementById("transponer").innerHTML += '<option value="'+t+'"'+s+'>'+t+'</option>'
      })
  }

  lineas = letra.letra.trim().split("\n");
  estilo_letra="letra_estrofa"
  estilo_acorde="acorde_estrofa"

  lineas.forEach((linea, i) => {

    if (lineas[i].includes('ESTRIBILLO')){estilo_letra="letra_estrib";estilo_acorde="acorde_estrib"}
    if (lineas[i]==""){estilo_letra="letra_estrofa";estilo_acorde="acorde_estrofa"}
    lineas[i]=lineas[i].replace(/\]\[/g, " ]        [")
    lineas[i]=lineas[i].replace(/\] /g, "].    ")

    while (lineas[i].includes("[")){
      index_a=lineas[i].indexOf("[")
      index_b=lineas[i].indexOf("]")

      letras_bajo_acorde=1
      avail=lineas[i].substring(index_b+1).substring(0,10).length
      next_index=lineas[i].substring(index_b+1).indexOf("[")
      if (next_index>0){avail=Math.min(next_index,avail)}
      acorde_size=lineas[i].substring(index_a+1,index_b).length
      if (acorde_size===1){letras_bajo_acorde=Math.min(1,avail)}
      if (acorde_size===2){letras_bajo_acorde=Math.min(3,avail)}
      if (acorde_size===3){letras_bajo_acorde=Math.min(4,avail)}
      if (acorde_size===4){letras_bajo_acorde=Math.min(5,avail)}
      if (acorde_size===5){letras_bajo_acorde=Math.min(6,avail)}

      lineas[i]=lineas[i].substring(0,index_a)+
      '<span class="'+estilo_acorde+'"><b>'+lineas[i].substring(index_a+1,index_b)+'</b>'+lineas[i].substring(index_b+1,index_b+1+letras_bajo_acorde)+'</span>'+lineas[i].substring(index_b+1+letras_bajo_acorde)
    }

    //lineas[i]=lineas[i].replaceAll('_','<span class="blancos">_</span>')
    if (lineas[i]==""){
      document.getElementById("bloque_letra").innerHTML += '<br>'
    }
    else{
      document.getElementById("bloque_letra").innerHTML += '<p class="'+estilo_letra+'">'+lineas[i]+'</p>'
    }
  });

}

function transponer(nuevo){////////////////////////////------Esta función realiza la trasposcón de acordes de una canción mostrada
      final=nuevo
      actual=document.getElementById("tonalidad").innerHTML
      actual=actual.replace("tonalidad: ","")
      document.getElementById("tonalidad").innerHTML="tonalidad: "+nuevo
    
      if (actual.charAt(actual.length - 1)==='m'){
        actual=actual.substring(0,actual.length - 1)
        nuevo=nuevo.substring(0,nuevo.length - 1)
      }
      cambio=(12+tonalidades.indexOf(nuevo)-tonalidades.indexOf(actual))%12
    
      indexes=reverse_indexes(letra.letra,"[")
      indexes.forEach((index,i)=>{
        text_to_replace=letra.letra.substring(index+1,index+3)
        if (text_to_replace[1]!='#'){text_to_replace=text_to_replace[0]}
        replacing_text=tonalidades[(12+tonalidades.indexOf(text_to_replace)+cambio)%12]
        letra.letra=letra.letra.substring(0,index)+letra.letra.substring(index).replace(text_to_replace,replacing_text)
      })
      letra.tonalidad=final
      document.getElementById("bloque_letra").innerHTML=" "
      //crear_bloque_letra(letra) 
      crear_bloque_letra(letra)
}

async function fileExist(ruta) {
    try {
        const resp = await fetch(ruta, { method: "HEAD" });
        return resp.ok;   // true si existe (200), false si no (404)
    } catch (e) {
        return false;     // error de red → tratar como que no existe
    }
}

async function mostrarAudioLetraAcordes(audio_file, tono_audio, txt_file) {
  fileExist(audio_file).then(exist => {
    if (exist) {
      document.getElementById("bloque_audio").innerHTML = '<audio controls src="'+audio_file+'"></audio>'
      document.getElementById("bloque_audio").innerHTML += '<p style="color: grey;">Versión de audio por '+tono_audio+'</p>'
    } else {
      document.getElementById("bloque_audio").innerHTML = '<audio controls src="'+audio_file+'"></audio>'
      document.getElementById("bloque_audio").innerHTML += '<p style="color: grey;">Aun no hemos incluido un audio para esta canción</p>'
    }
});
  letra_acordes = await (await fetch((txt_file))).text();
  eval(letra_acordes)
  crear_bloque_letra(letra)
}        

async function showIfAudio(audio_file) {
  fileExist(audio_file).then(exist => {
    if (exist) {return 8}
    else {return 9}
  })
}

async function buscarCanciones(canciones) {
    function sinAcentos(t) {
      return t.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      }  
  document.getElementById('bloque_audio').innerHTML=""
  document.getElementById('bloque_letra').innerHTML=""
  tiempo=document.getElementById('tiempo').value
  misa=document.getElementById('misa').value
  momento=document.getElementById('momento').value
  texto=document.getElementById('textoBusqueda').value.toLowerCase()

  document.getElementById("resultados").innerHTML = ""

  canciones_filtradas = canciones.filter(c =>
      ( tiempo==="" || (c.tiempos.includes(tiempo))) &&
      ( misa==="" || (c.misas.includes(misa))) &&
      ( momento==="" || (c.momentos.includes(momento))) &&
      ( texto==="" || sinAcentos(c.titulo).toLowerCase().includes(sinAcentos(texto)))
      )

  canciones_filtradas.sort((a,b)=>a.titulo.localeCompare(b.titulo))

  canciones_filtradas.forEach(c => {
        simbol = await showIfAudio(c.audio)
        showing_text = c.titulo+" "+simbol+"♫"
        document.getElementById('resultados').innerHTML += `
          <div class="cancion">
            <h3 class="result" onclick="mostrarAudioLetraAcordes('${c.audio}', '${c.tono_audio}', '${c.txt}')">${showing_text}</h3>
          </div>`;
  });  
}


async function listarCanciones(txt_file) {///////---- función asíncrona que lee la lista de todas las canciones
    canciones = await (await fetch((txt_file))).text();
    canciones = eval(canciones)
    document.getElementById("tiempo").addEventListener("change", () => buscarCanciones(canciones));
    document.getElementById("misa").addEventListener("change", () => buscarCanciones(canciones));
    document.getElementById("momento").addEventListener("change", () => buscarCanciones(canciones));
    document.getElementById("textoBusqueda").addEventListener("change", () => buscarCanciones(canciones));
    document.getElementById("btnBuscar").addEventListener("click", () => buscarCanciones(canciones));
}
 
listarCanciones("canciones.txt")




  




































































































