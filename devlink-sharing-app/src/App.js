import React, { useState, useEffect, Suspense } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Query, Mutation } from '@apollo/client/react';
import { useToasts } from 'react-toastify';
import { TailwindProvider } from 'tailwindcss-react';
import { useLinks } from './hooks/useLinks';
import { useProfile } from './hooks/useProfile';
import { LinkList, AddLinkForm, Profile } from './components';


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});


const GET_LINKS_QUERY = gql`
  query GetLinks {
    links {
      id
      url
      title
      description
      user {
        id
        firstName
        lastName
      }
    }
  }
`;

const CREATE_LINK_MUTATION = gql`
  mutation CreateLink($url: String!, $title: String, $description: String) {
    createLink(url: $url, title: $title, description: $description) {
      id
      url
      title
      description
      user {
        id
        firstName
        lastName
      }
    }
  }
`;

const UPDATE_LINK_MUTATION = gql`
  mutation UpdateLink($id: ID!, $url: String, $title: String, $description: String) {
    updateLink(id: $id, url: $url, title: $title, description: $description) {
      id
      url
      title
      description
      user {
        id
        firstName
        lastName
      }
    }
  }
`;

const DELETE_LINK_MUTATION = gql`
  mutation DeleteLink($id: ID!) {
    deleteLink(id: $id) {
      id
    }
  }
`;

function App() {
  const [isEditingLink, setIsEditingLink] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);
  const { links, fetchLinks, createLink, updateLink, deleteLink } = useLinks();
  const { profile, fetchProfile, updateProfile } = useProfile();
  const { toast } = useToasts();

  useEffect(() => {
    fetchLinks();
    fetchProfile();
  }, [fetchLinks, fetchProfile]);

  const handleAddLink = async (newLink) => {
    try {
      await createLink(newLink);
      fetchLinks();
      toast('Link created successfully!');
    } catch (error) {
      console.error('Error creating link:', error);
      toast('Error creating link: ' + error.message);
    }
  };

  const handleUpdateLink = async (updatedLink) => {
    try {
      await updateLink(updatedLink);
      fetchLinks();
      setIsEditingLink(false);
      toast('Link updated successfully!');
    } catch (error) {
      console.error('Error updating link:', error);
      toast('Error updating link: ' + error.message);
    }
  };

  const handleDeleteLink = async (linkId) => {
    try {
      await deleteLink(linkId);
      fetchLinks();
      toast('Link deleted successfully!');
    } catch (error) {
      console.error('Error deleting link:', error);
      toast('Error deleting link: ' + error.message);
    }
  };

  const handleEditLink = (link) => {
    setSelectedLink(link);
    setIsEditingLink(true);
  };

  const handleCancelEdit = () => {
    setIsEditingLink(false);
    setSelectedLink(null);
  };

  return (
    <ApolloProvider client={client}>
      <TailwindProvider>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Link Sharer</h1>

          <Query query={GET_LINKS_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <div>Loading...</div>;
              if (error) return <div>Error: {error.message}</div>;

              return (
                <div className="flex flex-col">
                  <LinkList links={data.links} onEdit={handleEditLink} onDelete={handleDeleteLink} />

                  {isEditingLink && selectedLink && (
                    <AddLinkForm
                      link={selectedLink}
                      onSubmit={handleUpdateLink}
                      onCancel={handleCancelEdit}
                    />
                  )}

                  {!isEditingLink && <AddLinkForm onSubmit={handleAddLink} />}

                  {profile && (
                    <div className="mt-8">
                      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
                      <Profile profile={profile} updateProfile={updateProfile} />
                    </div>
                  )}
                </div>
              );
            }}
          </Query>
        </div>
      </TailwindProvider>
    </ApolloProvider>
  );
}

export default App;
