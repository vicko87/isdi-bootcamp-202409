/* import { errors } from 'com'
import { extractPayloadFromJWT } from '../../util'
const { SystemError } = errors

export default async (userId, data) => {
    console.log(data)

    try {
        // Extract user from the JWT
        const user = extractPayloadFromJWT(sessionStorage.token);

        // Check if user exists in the token
        if (!user) {
            throw new SystemError('User not authenticated');
        }

        // Ensure the userId matches the one in the token
        if (user.sub !== userId) {
            throw new SystemError('Unauthorized: userId does not match the authenticated user');
        }

    const url = `http://${import.meta.env.VITE_API_URL}/users/center/center-info`;
    const requestOptions = {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.token}`, },
        body: JSON.stringify(data),
    };

    // Perform the API request
    const response = await fetch(url, requestOptions);

    // Validate the response
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new SystemError(`Failed to update center info: ${response.status} - ${errorMessage}`);
    }

    // Parse and return the response data
    return await response.json();
} catch (error) {
    console.error('Error in updateCenterInfo:', error.message);
    throw new SystemError(error.message);
}}; */

import { errors } from 'com'
import { extractPayloadFromJWT } from '../../util'
const { SystemError } = errors

const formatTelephone = (telephone) => {
    if (typeof telephone !== 'string') {
        return null;
    }
    // Keep "+" if present, remove all non-numeric characters
    return telephone.replace(/[^+\d]/g, '');
};

export default async (userId, data) => {
  try {
    console.log('Data before formatting:', data);

    // Format the telephone field
    if (data.telephone) {
      data.telephone = formatTelephone(data.telephone);
    }

    console.log('Data after formatting:', data);

    const user = extractPayloadFromJWT(sessionStorage.token);
    if (!user || user.sub !== userId) {
      throw new SystemError('Unauthorized: userId does not match the authenticated user');
    }

    const url = `http://${import.meta.env.VITE_API_URL}/users/center/center-info`;

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.token}`,
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new SystemError(`Failed to update center info: ${response.status} - ${errorResponse.message}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in updateCenterInfo:', error.message);
    throw new SystemError(error.message);
  }
};