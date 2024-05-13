import React from 'react';
import LinkList from './LinkList';
import LinkForm from './LinkForm';

const App = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-4">Link Sharing App</h1>
      <LinkForm />
      <LinkList />
    </div>
  );
};

export default App;