import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';


const GET_PROFILE_QUERY = gql`
  query GetProfile {
    profile {
      id
      firstName
      lastName
      email
    }
  }
`;

const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($id: ID!, $firstName: String, $lastName: String, $email: String) {
    updateProfile(id: $id, firstName: $firstName, lastName: $lastName, email: $email) {
      id
      firstName
      lastName
      email
    }
  }
`;

const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const { loading, error, data, refetch } = useQuery(GET_PROFILE_QUERY);

  useEffect(() => {
    if (data) {
      setProfile(data.profile);
    }
  }, [data]);

  const updateProfile = async (updatedProfile) => {
    try {
      const { data } = await useMutation(UPDATE_PROFILE_MUTATION)(
        { variables: updatedProfile }
      );
      setProfile(data.updateProfile);
      refetch();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return { profile, updateProfile, fetchProfile: refetch };
};

export default useProfile;
