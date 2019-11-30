let data = {
    "lists" : [
        {
            "title": "FavoriteGames of 2019",
            "type": "games",
            "listItems": [
                {
                    "title": "Sekiro: Shadows Die Twice",
                    "rank": 1,
                    "description": "From Software's latest entry into the 'SoulsBorne' franchise, set in a dark fantasy version of fuedal Japan",
                    "img-url": "",
                    "comments": "I loved this game!"
                },
                {
                    "title": "Jedi: Fallen Order",
                    "rank": 2,
                    "description": "Set between episodes 3 and 4, you play as hunted runaway Jedi, Cal Kestis",
                    "img-url": "",
                    "comments": "Great lightsaber combat!"
                },
                {
                    "title": "Fire Emblem Fates",
                    "rank": 3,
                    "description": "Latest entry into Fire Emblem Franchise on Nintendo Switch",
                    "img-url": "",
                    "comments": "Black Eagles 4 life!"
                }
            ]
        },
        {
             "title": "FavoriteTelevision Series of 2019",
             "type": "television",
             "listItems": [
                 {
                     "title": "The Lefovers",
                     "rank": 1,
                     "description": "Created by Damon Lindelhof, The Leftovers depicts the aftermath of a mysterious phenomenon when two percent of the world's population vanishes",
                     "img-url": "",
                     "comments": "Spiritual successor to LOST"
                 }
             ]
         },
         {
             "title": "FavoriteBooks of 2019",
             "type": "books",
             "listItems": [
                 {
                     "title": "The Witcher Novels",
                     "author": "Andrej Sapkowski",
                     "rank": 1,
                     "description": "Epic dark fantasy ",
                     "img-url": "",
                     "comments": "The audio book version has great narration by Peter Kenny."
                 }
             ]
         }
    ] 
 };

document.addEventListener('DOMContentLoaded', function() {
    const app = firebase.app();
});

// function googleLogin() {
//     const provider = new firebase.auth.GoogleAuthProvider();

//     firebase.auth().signInWithPopup(provider)
//         .then(result => {
//             const user = result.user;
//         })
//         .then(function() {
//             const db = firebase.firestore();

//             const lists = db.collection('lists');
        
//             lists.get()
//                 .then( data => {
//                     console.log(data);
//                 })
//         })
// }

const listsWrapper = document.querySelector('.lists-wrapper');

// async function initializeData() {
//     const response = await fetch('data.json')
//         .then((resp) => resp.json())
//         .then(function(data) {
//             sessionData = data;
//             populateLists(data);
//         });
// }

function populateLists(lists) {
    listsWrapper.innerHTML = "";
    lists.forEach(list => {
        const newList = document.createElement('snow-list');
        newList.setAttribute('list-items', JSON.stringify(list.listItems));
        newList.innerHTML = `<h2 slot="list-title">${list.title}</h2>`;
        listsWrapper.appendChild(newList);
    });
}

populateLists(data.lists);