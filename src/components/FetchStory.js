import { useEffect } from 'react';

const FetchStory = ({ setStories }) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    'https://us-central1-fullstack-api-38a4f.cloudfunctions.net/api/api/stories'
                );

                if (response.ok) {
                    const data = await response.json();
                    setStories(data);
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [setStories]);

};

export default FetchStory;
