document.addEventListener("DOMContentLoaded", async () => {
  const input = document.getElementById("searchInput");
  const results = document.getElementById("resultsContainer");

  let songs = [];

  try {
    const res = await fetch("songs.json");
    songs = await res.json();
  } catch (e) {
    results.innerHTML = "<p>No se pudo cargar songs.json. Usa un servidor local.</p>";
    return;
  }

  input.addEventListener("input", () => {
    const search = input.value.toLowerCase().trim();
    results.innerHTML = "";

    const filtered = songs.filter(song =>
      song.title.toLowerCase().includes(search) ||
      song.artist.toLowerCase().includes(search)
    );

    if (filtered.length === 0) {
      results.innerHTML = "<p>🎶 No se encontraron canciones.</p>";
      return;
    }

    filtered.forEach(song => {
      const card = document.createElement("div");
      card.className = "song-card";
      card.innerHTML = `
        <div class="song-title">${song.title}</div>
        <div class="song-artist">${song.artist}</div>
      `;
      card.addEventListener("click", () => {
        window.location.href = `song.html?id=${song.id}`;
      });
      results.appendChild(card);
    });
  });
});
