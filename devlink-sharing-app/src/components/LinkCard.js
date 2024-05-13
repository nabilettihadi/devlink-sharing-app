import React from 'react';

const LinkCard = ({ link, onEdit, onDelete }) => {
  return (
    <div className="link-card">
      <a href={link.url} target="_blank" rel="noopener noreferrer">
        <h3>{link.title}</h3>
        <p>{link.description || 'No description available'}</p>
      </a>
      {onEdit && <button onClick={() => onEdit(link)}>Edit</button>}
      {onDelete && <button onClick={() => onDelete(link.id)}>Delete</button>}
    </div>
  );
};

export default LinkCard;
