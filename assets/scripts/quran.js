document.addEventListener('DOMContentLoaded', () => {
  getSurhasMeta();
})

// get all surahs names and numbers
function getSurhasMeta() {
  const endpoint = "http://api.alquran.cloud/v1/meta";
  const request = new XMLHttpRequest();

  request.addEventListener("readystatechange", () => {
    if (request.readyState === 4 && request.status === 200) {
      const data = JSON.parse(request.responseText);
      const surahs = data.data.surahs.references;

      surahs.forEach((sura) => {
        const div = document.createElement("div");
        div.className = "surah-name";
        div.innerText = sura.name;
        const span = document.createElement("span");
        span.innerText = ` (${sura.number})`;
        div.appendChild(span);

        document.querySelector(".fehras").appendChild(div);
      });
      getSurah();
    } else {
      console.log("Somthing get wrong!");
    }
  });

  request.open("GET", endpoint);
  request.send();
}


function getSurah() {
  // get all sura's
  const surahs = document.querySelectorAll(".surah-name");
  surahs.forEach((el, index) => {
    el.addEventListener("click", () => {
      const endpoint = `http://api.alquran.cloud/v1/surah/${index + 1}`;
      const req = new XMLHttpRequest();

      req.addEventListener("readystatechange", () => {
        if (req.readyState === 4 && req.status === 200) {
          const data = JSON.parse(req.responseText);
          const theBasmala = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
          const surahData = {
            ayahs: data.data.ayahs,
            name: data.data.name,
          };
          // replace the basmala with empty string
          surahData.ayahs[0].text = surahData.ayahs[0].text.replace(
            theBasmala,
            ""
          );
          const basmala = document.createElement("div");
          basmala.className = "basmala";
          const alsurah = document.createElement("div");
          alsurah.className = "alsurah";
          basmala.innerText = theBasmala;
          for (let index = 0; index < surahData.ayahs.length; index++) {
            alsurah.innerHTML += `${surahData.ayahs[index].text} <span class="ayah-number">(${
                index + 1
              })</span> `;
          }

          if (document.querySelector(".alsurah")) {
            document.querySelector(".alsurah").remove();
            document.querySelector(".basmala").remove();
          }
          if (surahData.name !== "سُورَةُ التَّوۡبَةِ") {
            document.querySelector(".maincontent").appendChild(basmala);
          } else {
            basmala.innerText = "أَعُوذُ بِاللَّهِ مِنَ الشَّيطَانِ الرَّجِيمِ";
            document.querySelector(".maincontent").appendChild(basmala);
          }
          document.querySelector(".maincontent").appendChild(alsurah);
        }
      });

      req.open("GET", endpoint);
      req.send();

      surahs.forEach((el) => {
        el.style.backgroundColor = "";
      });
      el.style.backgroundColor = "#fff";
    });
  });
  surahs[0].click();
}
