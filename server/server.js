const express = require('express');
const app = express();
const cors = require('cors');

const userRoute = require('./routes/UserRoute');
const postRoute = require('./routes/PostRoute');
const likeRoute = require('./routes/LikeRoute');
const commentRoute = require('./routes/CommentRoute');

app.use(cors());
app.use(express.json());

app.use('/user', userRoute);
app.use('/post', postRoute);
app.use('/like', likeRoute);
app.use('/comment', commentRoute);

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});