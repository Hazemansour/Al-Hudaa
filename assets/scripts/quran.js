const endpoint = "../assets/json/quran-chapters.json";
const request = new XMLHttpRequest();
request.open("GET", endpoint);
request.send();


getSurhasMeta();

// get all surahs names and numbers
function getSurhasMeta() {
 
  request.addEventListener("readystatechange", () => {
    if (request.readyState === 4 && request.status === 200) {
      const data = JSON.parse(request.responseText);
      const surahs = data;

      surahs.forEach((sura) => {
        const div = document.createElement("div");
        div.className = "surah-name";
        div.innerText = sura.name;
        const span = document.createElement("span");
        span.innerText = ` (${sura.id})`;
        div.appendChild(span);

        document.querySelector(".fehras").appendChild(div);
      });
      getSurah();
    } else {
      console.log("Somthing get wrong!");
    }
  });


}


function getSurah() {
  // get all sura's
  const surahs = document.querySelectorAll(".surah-name");
  surahs.forEach((el, index) => {
    el.addEventListener("click", () => {
      const endpoint = `../assets/json/quran.json`;
      const req = new XMLHttpRequest();

      req.addEventListener("readystatechange", () => {
        if (req.readyState === 4 && req.status === 200) {
          const data = JSON.parse(req.responseText);
          const verses = data[index].verses
          const theBasmala = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
          
          const basmala = document.createElement("div");
          basmala.className = "basmala";
          const alsurah = document.createElement("div");
          alsurah.className = "alsurah";
          basmala.innerText = theBasmala;
          for (let i = 0; i < verses.length; i++) {
            alsurah.innerHTML += `${verses[i].text} <span class="ayah-number">(${
              verses[i].id
              })</span> `;
              
          }

          if (document.querySelector(".alsurah")) {
            document.querySelector(".alsurah").remove();
            document.querySelector(".basmala").remove();
          }
          if (data[index].name !== "التوبة" && data[index].name !== "الفاتحة") {
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
