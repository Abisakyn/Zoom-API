require('dotenv').config();
const axios = require('axios');
const token = process.env.token


// Function to get meetings
async function getMeetings() {
    try {
        const response = await axios.get('https://api.zoom.us/v2/users/me/meetings', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        console.error('Error fetching meetings:', err.response ? err.response.data : err.message);
    }
}

// Function to create a meeting
async function createMeeting() {
    try {
        const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', {
            topic: 'Test Meeting',
            type: 2,
            start_time: '2021-09-20T10:00:00Z',
            duration: 60,
            timezone: 'Asia/Kolkata',
            settings: {
                host_video: true,
                participant_video: true,
                join_before_host: true,
                mute_upon_entry: true,
                waiting_room: true
            }
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (err) {
        console.error('Error creating meeting:', err.response ? err.response.data : err.message);
    }
}

// Main function to get and create meetings
(async () => {
    const meetings = await getMeetings();
    console.log('Existing meetings:', meetings);

    const newMeeting = await createMeeting();
    console.log('Created meeting:', newMeeting);
})();
