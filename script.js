async function loadSong(file, transpose = 0) {
  const response = await fetch(`canciones/${file}`);
  const text = await response.text();

  // Crear parser y transponer
  const parser = new ChordSheetJS.ChordProParser();
  const song = parser.parse(text);

  if (transpose !== 0) {
    song.transpose(transpose);
  }

  // Convertir a HTML
  const formatter = new ChordSheetJS.HtmlDivFormatter();
  const display = formatter.format(song);

  document.getElementById("song-display").innerHTML = display;
}

// Inicializar
const songSelect = document.getElementById("song-select");
const transposeSelect = document.getElementById("transpose");

songSelect.addEventListener("change", () => {
  loadSong(songSelect.value, parseInt(transposeSelect.value));
});

transposeSelect.addEventListener("change", () => {
  loadSong(songSelect.value, parseInt(transposeSelect.value));
});

// Cargar la primera canción al inicio
loadSong(songSelect.value);