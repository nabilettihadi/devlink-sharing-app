import React from 'react';
import LinkCard from './LinkCard';

const LinkList = ({ links, onEdit, onDelete }) => {
  return (
    <div className="link-list">
      {links.map((link) => (
        <LinkCard key={link.id} link={link} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default LinkList;
