import React from 'react';
import  { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      ich bin die AndereSeite
      <Link to="/">Zurück zur Homepage</Link>
    </div>
  )
}
