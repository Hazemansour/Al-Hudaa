function getTimes(lat, lon, city, country) {
    const endpoint = `http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=5`;
    const request = new XMLHttpRequest();

    request.addEventListener('readystatechange', () => {
        if (request.readyState === 4 && request.status === 200) {
            // All Prayer Times Data vaiable
            const data = JSON.parse(request.responseText);
            // only Time of prayers data varibale
            const prayerTimes = data.data.timings;
            // only date
            const date = data.data.date;

            const container = document.createElement('div');
            container.className = 'container';

            const sectionTitle = document.createElement('h3');
            const sectionTitleText = document.createTextNode('مواقيت الصلاة');
            sectionTitle.className = 'section-title';
            sectionTitle.appendChild(sectionTitleText);
            // create prayer wrapper
            const prayers = document.createElement('div');
            prayers.className = 'prayers';
            for (let i = 0; i < 5; i++) {
                // create the elements
                const prayer = document.createElement('div');
                prayer.className = 'prayer';
                // assign the id of prayer time (by prayer time name)
                // and append the time of pray to it
                switch (i) {
                    case 0: prayer.id = 'fajr'
                        prayer.innerText = prayerTimes.Fajr;
                        setPrayerName('الفجر', prayer)
                        break;
                    case 1: prayer.id = 'dhuhr';
                        prayer.innerText = prayerTimes.Dhuhr;
                        setPrayerName('الظهر', prayer)
                        break;
                    case 2: prayer.id = 'asr';
                        prayer.innerText = prayerTimes.Asr;
                        setPrayerName('العصر', prayer)
                        break;
                    case 3: prayer.id = 'maghrib';
                        prayer.innerText = prayerTimes.Maghrib;
                        setPrayerName('المغرب', prayer)
                        break;
                    case 4: prayer.id = 'isha';
                        prayer.innerText = prayerTimes.Isha;
                        setPrayerName('العشاء', prayer)
                        break;
                }
                // append the prayers to their container
                prayers.appendChild(prayer);
            }
            const dateAndTime = document.createElement('div');
            dateAndTime.className = 'date-and-time';
            dateAndTime.innerText = `${date.hijri.weekday.ar} - ${date.hijri.day} من ${date.hijri.month.ar} ${date.hijri.year}`
            // append all
            container.appendChild(sectionTitle);
            container.appendChild(prayers);
            container.appendChild(dateAndTime);

            // get prayer times section wrapper
            const prayerTimesSectionWrapper = document.getElementById('prayer-times-section');
            prayerTimesSectionWrapper.appendChild(container);
            // console.log(data)

        } else {
            // console.log('Something get wrong!')
        }
    })

    request.open('GET', endpoint);
    request.send();



    // set prayer name function
    function setPrayerName(name, prayer) {
        const prayerName = document.createElement("p");
        prayerName.innerText = name;
        prayer.appendChild(prayerName);
    }
}



function getPrayerTimes() {
    const requestIP = new XMLHttpRequest();

    requestIP.addEventListener('readystatechange', () => {
        if (requestIP.status === 200 && requestIP.readyState === 4) {
            const data = JSON.parse(requestIP.responseText);
            
            const information = {
                lat: data.location.latitude,
                lon: data.location.longitude,
                city: data.location.city,
                country: data.location.country.name,
            }
            
            // call getTimes function and pass params data
            getTimes(information.lat, information.lon, information.city,information.country);
        } else {
            console.log('Somthing get wrong!')
        }
    })

    requestIP.open("GET", "https://api.ipregistry.co/156.212.17.172?key=v354brr0punu0yl0");
    requestIP.send();
    
}

document.addEventListener('DOMContentLoaded', () => {
    getPrayerTimes();
})