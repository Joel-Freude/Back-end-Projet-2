const express = require('express');
const axios = require('axios');
const router = express.Router();

const GITHUB_API_URL = 'https://api.github.com';

router.get('/user/:username/repos', async (req, res) => {
    const { username} = req.params;
    
    try{
        const userRes = await axios.get(`${GITHUB_API_URL}/user/${username}`,
            {
                headers: {
                    Authorization:`token ${process.env.GITHUB_TOKEN}`
             }
            });
        const reposRes = await axios.get(`${GITHUB_API_URL}/users/${username}/repos?per_page=100`,
            {
                headers: {
                    Authorization: `token ${process.env.GITHUB_TOKEN}`
                }
            });
        const eventsRes = await axios.get(`${GITHUB_API_URL}/users/${username}/events`, {
                headers: {
                Authorization: `token ${process.env.GITHUB_TOKEN}`
                }
            });

            res.json({
                user: userRes.data,
                repos:vreposRes.data,
                recentActivity: eventsRes.data
            });

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
});

module.exports = router;