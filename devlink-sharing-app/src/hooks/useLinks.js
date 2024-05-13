import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';


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
    updateLink(id: $id, url: $url, title: $title, description: description) {
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

const useLinks = () => {
  const [links, setLinks] = useState([]);
  const { loading, error, data, refetch } = useQuery(GET_LINKS_QUERY);

  useEffect(() => {
    if (data) {
      setLinks(data.links);
    }
  }, [data]);

  const createLink = async (newLink) => {
    try {
      const { data } = await useMutation(CREATE_LINK_MUTATION)(
        { variables: newLink }
      );
      setLinks([...links, data.createLink]);
      refetch();
    } catch (error) {
      console.error('Error creating link:', error);

    }
  };

  const updateLink = async (updatedLink) => {
    try {
      const { data } = await useMutation(UPDATE_LINK_MUTATION)(
        { variables: updatedLink }
      );
      const updatedLinks = links.map((link) =>
        link.id === updatedLink.id ? data.updateLink : link
      );
      setLinks(updatedLinks);
      refetch();
    } catch (error) {
      console.error('Error updating link:', error);
    }
  };

  const deleteLink = async (linkId) => {
    try {
      await useMutation(DELETE_LINK_MUTATION)({ variables: { id: linkId } });
      setLinks(links.filter((link) => link.id !== linkId));
      refetch();
    } catch (error) {
      console.error('Error deleting link:', error);
    }
  };

  return { links, fetchLinks: refetch, createLink, updateLink, deleteLink }; 
};

export default useLinks;
