const express = require('express');
const comments = express.Router();
const cors = require('cors');
const pool = require('../database/db');

comments.use(cors());

comments.post('/post', async (req, res) => {
    try {
        const {
            userId,
            postId,
            content,
            imageSrc,
            createdTime
        } = req.body;

        const comment = await pool.query(
            `INSERT INTO comment (userId, postId, content, imageSrc, createdTime) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [userId, postId, content, imageSrc, createdTime]
        );

        if (comment.rows.length > 0) {
            res.json(comment.rows[0]);
        }
        else {
            res.json({ error: 'Failed to comment a post' });
        }
    }
    catch (err) {
        console.log('Create comment', err.message);
    }
});

comments.get('/all/:id', async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const comment = await pool.query(`SELECT * FROM comment WHERE postid='${id}' ORDER BY createdtime ASC`);

        if (comment.rows.length > 0) {
            res.json(comment.rows);
        }
        else {
            res.json({ error: 'No comments found' });
        }
    }
    catch (err) {
        console.log('Get comments', err.message);
    }
});

comments.delete('/delete/:id', async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const comment = await pool.query(`DELETE FROM comment WHERE commentid='${id}'`);
        res.json({ success: 'Comment removed' });
    }
    catch (err) {
        console.log('Delete comment', err.message);
    }
});

comments.post('/edit', async (req, res) => {
    try {
        const {
            commentId,
            content,
            imageSrc,
            updatedTime,
        } = req.body;

        const comment = await pool.query(
            `UPDATE comment SET content=$2, imagesrc=$3, updatedtime=$4 WHERE commentid=$1`,
            [commentId, content, imageSrc, updatedTime]
        );

        res.json({ success: 'Edited comment successfully '});
    }
    catch (err) {
        console.log('Edit comment', err.message)
    }
});

module.exports = comments;