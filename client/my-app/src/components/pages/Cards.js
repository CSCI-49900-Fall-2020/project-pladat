import React, { Component, useState, useEffect } from 'react';

import './styles/Cards.css'; 

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
    ]);

    useEffect(() => {

    })

    return (
        <div className="page-wrapper" id="main-page-wrapper">
            <div className="card-container">
                {users.map((user) => (
                    <div className="swipe" key={user.email} preventSwipe={['up', 'down']}>

                        <div style={{ backgroundImage: `url(${user.url})` }} className="card">
                            <h3>{user.firstname} {user.lastname} 
                            <br></br> 
                            {user.university}
                            <br></br> 
                            {user.email} </h3>

                        </div>
                    </div>
                ))}
            </div>

        </div>
    )

}

export default Cards