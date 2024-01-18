const BASE_URL = 'https://us-central1-fullstack-api-38a4f.cloudfunctions.net/api/api';

export const getStoryById = async (storyId) => {
    try {
        const response = await fetch(`${BASE_URL}/stories/${storyId}`);

        if (response.ok) {
            const fetchedStoryData = await response.json();
            return fetchedStoryData;
        } else {
            throw new Error('Failed to fetch story data');
        }
    } catch (error) {
        console.error('Error fetching story data:', error);
        throw error;
    }
};

export const updateStory = async (storyId, storyData) => {
    try {
        const response = await fetch(`${BASE_URL}/stories/${storyId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(storyData),
        });

        if (!response.ok) {
            throw new Error(`Failed to update story. Status: ${response.status}`);
        }

        console.log('Story updated successfully');
    } catch (error) {
        console.error('Error updating story:', error.message);
        throw error;
    }
};

export const addStory = async (storyData) => {
    try {
        const response = await fetch(`${BASE_URL}/stories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(storyData),
        });

        if (!response.ok) {
            throw new Error('Failed to add story');
        }

        console.log('Story added successfully');
    } catch (error) {
        console.error('Error adding story:', error.message);
        throw error;
    }
};

export const getChaptersByStoryId = async (storyId) => {
    try {
        const response = await fetch(`${BASE_URL}/stories/${storyId}/chapters`);

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to fetch chapters');
        }
    } catch (error) {
        console.error('Error fetching chapters:', error.message);
        throw error;
    }
};

export const deleteChapter = async (storyId, id) => {
    try {
        const response = await fetch(`${BASE_URL}/stories/${storyId}/chapters/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Failed to delete chapter. Status: ${response.status}`);
        }

        console.log(`Chapter with ID ${id} deleted successfully`);
    } catch (error) {
        console.error('Error deleting chapter:', error.message);
        throw error;
    }
};
