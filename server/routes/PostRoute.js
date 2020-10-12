const express = require('express');
const posts = express.Router();
const cors = require('cors');
const pool = require('../database/db');

posts.use(cors());

posts.post('/create', async(req, res) => {
    try {
        const {
            userId,
            locationId,
            caption,
            mediaId,
            createdTime,
            updatedTime
        } = req.body;

        const post = await pool.query(
            'insert into post (userid, locationid, caption, mediaid, createdtime, updatedtime) values($1, $2, $3, $4, $5, $6) returning *',
            [userId, locationId, caption, mediaId, createdTime, updatedTime]
        );
        
        if (post.rows.length > 0) {
            res.json(post.rows[0]);
        }
        else {
            res.json({ error: 'Failed to create post' });
        }
    }
    catch(err) {
        console.log('Create post', err.message);
    }
});

posts.get('/all/:id', async(req, res) => {
    try {
        const {
            id
        } = req.params;
        const post = await pool.query(`SELECT * FROM post WHERE userid='${id}' ORDER BY createdtime ASC`);
        if (post.rows.length > 0) {
            res.json(post.rows);
        }
        else {
            res.json({ error: 'No posts found' });
        }
    }
    catch(err) {
        console.log('Get posts', err.message);
    }
});

posts.delete('/delete/:id', async(req, res) => {
    try {
        const {
            id
        } = req.params;
        const removeLikes = await pool.query(`DELETE FROM liked WHERE postid='${id}'`);
        const removeComments = await pool.query(`DELETE FROM comment WHERE postid='${id}'`);
        const removePost = await pool.query(`DELETE FROM post WHERE postid='${id}'`);
        res.json({ success: 'Removed post successfully' });
    }
    catch(err) {
        console.log('Delete post', err.message);
    }
});

posts.post('/edit', async(req, res) => {
    try {
        const {
            postId,
            locationId,
            caption,
            mediaId,
            updatedTime
        } = req.body;

        const post = await pool.query(
            `UPDATE post SET locationid=$2, caption=$3, mediaid=$4, updatedtime=$5 WHERE postid=$1`,
            [postId, locationId, caption, mediaId, updatedTime]
        );

        res.json({ success: 'Edited post successfully' });
    }
    catch(err) {
        console.log('Create post', err.message);
    }
});

module.exports = posts;