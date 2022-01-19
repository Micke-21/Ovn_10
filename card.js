
const newCardBtn = document.querySelector('#btnNew');
const shuffleCardBtn = document.querySelector('#btnShuffle');
const drawCardBtn = document.querySelector('#btnDraw');

const statusField = document.querySelector('#statusField');
const cardSection = document.querySelector('#cardSection');

const cardData = {
    deckId: '',
    reminingCard: 0
}

const getNewCard = async () => {
    let uri = '';
    if (cardData.deckId === '') {
        //const res = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/');
        uri = 'https://deckofcardsapi.com/api/deck/new/shuffle/';
    }
    else{
        //const res = await fetch('https://deckofcardsapi.com/api/deck/' + cardData.deckId + '/return/');
        uri = 'https://deckofcardsapi.com/api/deck/' + cardData.deckId + '/return/';
    }
    const res = await fetch(uri);

    console.log(res);

    if (res.status !== 200)
        throw new Error('Faile to get card')

    const data = await res.json();
    console.log(data);

    if (data.success) {
        cardData.deckId = data.deck_id
        cardData.reminingCard = data.remaining;

        cardSection.innerHTML = '';

        statusField.innerHTML = `Ny kortlek skapad.<br>`
        statusField.innerHTML += `${cardData.reminingCard} kort kvar.<br>`;
        statusField.innerHTML += `Deck id: "${cardData.deckId}".<br>`;

    }

}

newCardBtn.addEventListener('click', getNewCard);



const drawCard = async () => {

    if (cardData.deckId === '') {
        statusField.innerHTML += 'Ingen kortlek.'; ''
    }
    else {


        const res = await fetch('https://deckofcardsapi.com/api/deck/' + cardData.deckId + '/draw/?count=1')

        const data = await res.json();
        if (data.success) {
            console.log('Success ' + data.cards[0].code);
            cardData.reminingCard = data.remaining;
            console.log('Remining cardData' + cardData.reminingCard);
            console.log('Remining data' + data.remaining);

            //cardSection.innerHTML = '';
            statusField.innerHTML += `${cardData.reminingCard} kort kvar.`;

            data.cards.forEach(c => {
                console.log('Data.cards: ' + c.code);

                //addCardDataInnerHTML(c);
                addCardDataCreatElement(c);
            });

            function addCardDataCreatElement(c) {          
                let divCol = crateDiv('col mb-2');
                let divCard = crateDiv('card');
                let divCardBody = crateDiv('card-body');
                let imgChild = creatImg("card-img-top", c.image, 'Card ' +c.suit +' ' + c.value );
                let head = creatHeader('card-title', c.suit + ' '+ c.value );
                let par = createP('card-text', 'Kortkod: '+ c.code);
                
                divCardBody.appendChild(head);
                divCardBody.appendChild(par);

                divCard.appendChild(imgChild);
                divCard.appendChild(divCardBody);

                divCol.appendChild(divCard);
         
                cardSection.appendChild(divCol);
            }

            function crateDiv(classValue) {
                let div1 = document.createElement('div');
                let divclassAtt = document.createAttribute('class');
                divclassAtt.value = classValue;
                div1.setAttributeNode(divclassAtt);

                return div1;
            }
            function creatHeader(classValue, text) {
                let h = document.createElement('h5');
                let hClassAtt = document.createAttribute('class');
                hClassAtt.value = classValue;
                h.setAttributeNode(hClassAtt);
                h.innerText = text;

                return h;
            }
            function createP(classValue, text) {
                let p = document.createElement('p');
                let pClassAtt = document.createAttribute('class');
                pClassAtt.value = classValue;
                p.setAttributeNode(pClassAtt);
                p.innerText = text;

                return p;
            }
            function creatImg(classValue, imgSrc, alt){
                let img = document.createElement('img');
                let imgClassAtt = document.createAttribute('class');
                imgClassAtt.value = classValue;
                img.setAttributeNode(imgClassAtt);
                img.setAttribute("src", imgSrc);
                img.setAttribute("alt", alt);

                return img;
            }

            function addCardDataInnerHTML(c) {
                cardSection.innerHTML +=
                    `
                    <div class="col mb-2">
                        <div class="card">
                            <img src="${c.image}" class="card-img-top" alt="Card ${c.suit} ${c.value}">
                            <div class="card-body">
                                <h5 class="card-title">${c.suit} ${c.value}</h5>
                                <p class="card-text">card code ${c.code}</p>
                                <!-- <a href="#" class="btn btn-primary">Go somewhere</a>-->
                            </div>
                        </diV>
                    </div>
                    `;
            }

        }
    }
}

drawCardBtn.addEventListener('click', drawCard);

const shuffleCard = async () => {

    const remaining = true;

    if (cardData.deckId === '') {
        statusField.innerHTML += 'Ingen kortlek.'; ''
    }
    else {
        const res = await fetch('https://deckofcardsapi.com/api/deck/' + cardData.deckId + '/shuffle/?remaining=' + remaining);

        const data = await res.json();
        if (data.success) {
            cardData.reminingCard = data.remaining;

            statusField.innerHTML += `Kortleken blandad.`;
            statusField.innerHTML += `${cardData.reminingCard} kort kvar.`;
        }
    }
}

shuffleCardBtn.addEventListener('click', shuffleCard);
