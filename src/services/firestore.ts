//our database
import { collection,
         addDoc,
         updateDoc, 
         serverTimestamp } from "firebase/firestore";

import { db } from "../config/firebase";

//add post to database( can be used in list)
/*
Firestore Database Structure
═════════════════════════════════════════════

posts/                              [Collection]
└── {postId}/                      [Document]
    ├── description: string        (listing description)
    ├── price: number              (item price)
    ├── photo: string              (image URL)
    ├── uid: string                (user ID of poster)
    └── createdAt: timestamp       (post creation time)
====================================================================
*/

/*
async function addListingToDB(listingBody, user) {
    try {
        const docRef = await addDoc(collection(db, "listings"), {
            body: listingBody, //body (fields of listing ex."description","price")
            description: descBody

            uid: user.uid, //unique id of user
            createdAt: serverTimestamp() //shows time of creating
        })
        console.log("Document written with ID: ", docRef.id)

    } catch (error) {
        console.error(error.message)
    }

}
*/
