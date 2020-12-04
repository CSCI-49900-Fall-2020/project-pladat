import React, { Component, useState, useEffect, useMemo } from 'react';
import TinderCard from 'react-tinder-card';

import './styles/Cards.css'; 
import "./styles/Buttons.css"

import Redo from '../uiComponents/redo.svg';
import Dislike from '../uiComponents/dislike.svg';
import SuperLike from '../uiComponents/superLike.svg';
import Like from '../uiComponents/like.svg';
import Boost from '../uiComponents/lightning.svg';

function Cards() {
    const [users, setUsers] = useState([
    {
        firstname: 'Bruce',
        lastname: 'Wayne',
        email: 'brucewayne@gmail.com',
        university: 'Yale University',
        url: 'https://i.pinimg.com/originals/7c/fd/bf/7cfdbfc2114c7a2475a3fee006b87e43.jpg'

    },
    {
        firstname: 'Elon',
        lastname: 'Musk',
        email: 'elonmusk@gmail.com',
        university: 'University of Pennsylvania',
        url: 'https://cdn.britannica.com/54/188754-050-A3613741/Elon-Musk-2010.jpg'
    },
    {
        firstname: 'Kobe',
        lastname: 'Bryant',
        email: 'kobebryant@gmail.com',
        university: 'Lower Merion High School',
        url: 'https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5756e7c2a7ea43396db26e8d%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D126%26cropX2%3D575%26cropY1%3D37%26cropY2%3D487'
    }
    ])
    const [lastDirection, setLastDirection] = useState()

    const alreadyRemoved = []
    const likedemails = []
    let charactersState = users

    const childRefs = useMemo(() => Array(users.length).fill(0).map(i => React.createRef()), [])

    useEffect(() => {
    })

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction)
        alreadyRemoved.push(nameToDelete)
      }

      const outOfFrame = (email) => {
        console.log(email + ' left the screen!')
        charactersState = charactersState.filter(user => user.email !== email)
        setUsers(charactersState)
      }

      const swipe = (dir) => {
        const cardsLeft = users.filter(user => !alreadyRemoved.includes(user.email))
        if (cardsLeft.length) {
          const toBeRemoved = cardsLeft[cardsLeft.length - 1].email // Find the card object to be removed
          const index = users.map(user => user.email).indexOf(toBeRemoved) // Find the index of which to make the reference to
          alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
          childRefs[index].current.swipe(dir) // Swipe the card!
        }
      }

    return (
        <div className="page-wrapper" id="main-page-wrapper">
            <div className="card-container">
                {users.map((user, index) => (
                     <TinderCard ref={childRefs[index]} className='swipe' key={user.email} onSwipe={(dir) => swiped(dir, user.email)} onCardLeftScreen={() => outOfFrame(user.email)}>
                     <div style={{ backgroundImage: `url(${user.url})` }} className='card'>
                     <h3>{user.firstname} {user.lastname} 
                            <br></br> 
                            {user.university}
                            <br></br> 
                            {user.email}
                            </h3>
                     </div>
                   </TinderCard>

                ))}
            </div>

            <div className="buttons">
            <button className="button_1">
                <img src={Redo} alt="Redo" className="buttonimg" />
            </button>
            <button onClick={() => swipe('left')} className="button_2">
                <img src={Dislike} alt="Dislike" className="buttonimg" />
            </button>
            <button onClick={() => swipe('up')} className="button_3">
                <img src={SuperLike} alt="SuperLike" className="buttonimg" />
            </button>
            <button onClick={() => swipe('right')} className="button_4">
                <img src={Like} alt="Like" className="buttonimg" />
            </button>
        </div>
        </div>
    )
}

export default Cards