import React from 'react';

export default function Logout() {
  
    localStorage.removeItem('secret_token');
    return (
      <div>
       
        { localStorage.getItem('secret_token')
          ? (<h4>{"Logout Failed"}</h4>)
          : (<h4>{"Logout Success"}</h4>)
        }
      </div>

    );
  }

