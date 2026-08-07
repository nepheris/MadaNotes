// Protection légère uniquement : ce mécanisme n'est PAS une authentification sécurisée.
// Le code temporaire actuel est "Madajoel". Remplacer ACCESS_HASH pour changer le code.
const ACCESS_HASH = "91152282e1a3e936c614bcf9a353598445376c0cb64ee181618d986d49af3631";

async function sha256(value) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2,"0")).join("");
}

function unlock() {
  sessionStorage.setItem("madaNotesAccess", "1");
  document.getElementById("access-gate").hidden = true;
  document.getElementById("site-content").hidden = false;
}

document.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("madaNotesAccess") === "1") {
    unlock();
    return;
  }
  const form = document.getElementById("access-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const code = document.getElementById("access-code").value;
    if (await sha256(code) === ACCESS_HASH) {
      unlock();
    } else {
      document.getElementById("access-error").textContent = "Code incorrect.";
    }
  });
});
