async function leerCanciones(txt_file) {
    canciones = await (await fetch((txt_file))).text();
    return eval(canciones)
    }        
canciones = leerCanciones("canciones.txt")
console.log(await canciones[0].audio)

// async function mostrarLetraAcordes(txt_file) {
//     letra_acordes = await (await fetch((txt_file))).text();
//     eval(letra_acordes)

    
//     console.log(letra)
//     }        

// function filtrar() {
//     document.getElementById('letra').innerHTML=""
//     tiempo=document.getElementById('tiempo').value
//     misa=document.getElementById('misa').value
//     momento=document.getElementById('momento').value
//     texto=document.getElementById('textoBusqueda').value.toLowerCase()

//     document.getElementById("resultados").innerHTML = ""

//     canciones_filtradas = canciones.filter(c =>
//         ( tiempo==="" || (c.tiempos.includes(tiempo))) &&
//         ( misa==="" || (c.misas.includes(misa))) &&
//         ( momento==="" || (c.momentos.includes(momento))) &&
//         ( texto==="" || c.titulo.toLowerCase().includes(texto))
//         )

//     canciones_filtradas.forEach(c => {
//           document.getElementById('resultados').innerHTML += `
//             <div class="cancion">
//               <h3>${c.titulo} </h3>
//               <h4 onclick="mostrarLetraAcordes('${c.txt}')">Ver letra y acordes</h4>
//               <audio controls src="${c.audio}"></audio>
//             </div>`;
//     });
// }

  




















