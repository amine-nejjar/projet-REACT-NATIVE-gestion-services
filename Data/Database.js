import Firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCqItK8rcSio8oli4Wim59VTfFwxKDyVdw",
    authDomain: "khadamati-86562.firebaseapp.com",
    databaseURL: "https://khadamati-86562.firebaseio.com",
    projectId: "khadamati-86562",
    storageBucket: "khadamati-86562.appspot.com",
    messagingSenderId: "864213111293",
    appId: "1:864213111293:web:acf93e55a7a57706e9c994",
    measurementId: "G-859KX4SPTF"
  };

export default firebaseConfig
// if (!Firebase.apps.length) {
//     Firebase.initializeApp(firebaseConfig);
//  }


// export function getUsersWithTxt(text){
//     var users =[];
//     var snapshot=Firebase.database().ref('Specialiste').once('value', (data) => {
//         data.toJSON();
//     })
//     snapshot.forEach((doc) => {
//         users.push(doc.data());
//     });
//     console.log(users);
// }