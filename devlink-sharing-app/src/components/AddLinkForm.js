import React, { useState } from 'react';

const AddLinkForm = ({ link, onSubmit, onCancel }) => {
  const [url, setUrl] = useState(link ? link.url : '');
  const [title, setTitle] = useState(link ? link.title : '');
  const [description, setDescription] = useState(link ? link.description : '');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newLink = {
      url,
      title,
      description,
    };
    onSubmit(newLink);
    setUrl('');
    setTitle('');
    setDescription('');
  };

  const handleCancel = () => {
    onCancel();
    setUrl('');
    setTitle('');
    setDescription('');
  };

  return (
    <form className="add-link-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="url">URL:</label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows="3"
        />
      </div>
      <div className="form-actions">
        {link ? (
          <>
            <button type="button" onClick={handleCancel}>Cancel</button>
            <button type="submit">Update Link</button>
          </>
        ) : (
          <button type="submit">Add Link</button>
        )}
      </div>
    </form>
  );
};

export default AddLinkForm;
