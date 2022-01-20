const btn = document.querySelector('#searchBtn');
btn.addEventListener('click', (e) => {
    e.preventDefault();
    getApi();
});

const query = document.querySelector('#swInput');
const starWarText = document.querySelector('#starWarText');

function getApi() {
    const fullUri = 'https://www.swapi.tech/api/people?name=' + query.value.trim();

    fetch(fullUri)
        .then(res => res.json())
        .then(data => {
            console.log('Data: ' + data.result)
            //console.log(data.result[0].properties.height);

            if (data.result !== undefined && data.result.length > 0) {
                starWarText.value = '';

                data.result.forEach(element => {
                    // starWarText.value += 'Desription: ' + element.description;
                    // starWarText.value += ('\nNamn: ' + element.properties.name);
                    // starWarText.value += ('\nLängd: ' + element.properties.height);
                    // starWarText.value += ('\nFödelseår: ' + element.properties.birth_year);
                    // starWarText.value += ('\nVikt: ' + element.properties.mass);
                    // starWarText.value += ('\nKön: ' + element.properties.gender);
                    // starWarText.value += ('\nHårfärg: ' + element.properties.hair_color);

                    let swt =
                        `Description: ${element.description}, 
Namn: ${element.properties.name}
Längd: ${element.properties.height},
Födelseår: ${element.properties.birth_year},
Vikt: ${element.properties.mass},
Kön: ${element.properties.gender},
Hårfärg: ${element.properties.hair_color}`;

                    starWarText.value = swt;

                });
            }
            else {
                starWarText.value = 'Hittade inte.';
            }
        })
        .catch(err => console.log('Error ' + err));

}