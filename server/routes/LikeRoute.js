const express = require('express');
const likes = express.Router();
const cors = require('cors');
const pool = require('../database/db');

likes.use(cors());

likes.post('/create', async(req, res) => {
    try {
        const { 
            userId, 
            postId,
            createdTime,
        } = req.body;
        const exists = await pool.query(`select count(*) from liked where userid='${userId}' and postid='${postId}'`);
        if (exists.rows[0].count == 0) {
            const like = await pool.query(
                'insert into liked (userId, postId, createdTime) values ($1, $2, $3) returning *',
                [userId, postId, createdTime]
            );
            if (like.rows.length > 0) {
                res.json(like.rows[0]);
            }
            else {
                res.json({ error: 'Failed to like a post' });
            }
        }
        else {
            res.json({ error: 'User already liked this post' });
        }
    }
    catch(err) {
        console.log('Like post', err.message);
    }
});

likes.delete('/delete/:likeId', async(req, res) => {
    try {
        const { likeId } = req.params;
        const like = await pool.query(`delete from liked where likeid='${likeId}'`);
        res.json({ success: 'Removed like successfully' });
    }
    catch(err) {
        console.log('Unlike post', err.message);
    }
});

likes.get('/all/:postId', async(req, res) => {
    try {
        const { postId } = req.params;
        const like = await pool.query(`select * from liked where postId='${postId}' order by createdtime asc`);
        if (like.rows.length > 0) {
            res.json(like.rows);
        }
        else {
            res.json({ error: 'No likes found' });
        }
    }
    catch(err) {
        console.log('Get likes', err.message);
    }
});

module.exports = likes;