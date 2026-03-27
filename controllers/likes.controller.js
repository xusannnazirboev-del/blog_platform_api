import pool from "../configs/database.js";

export const getAllLikes = async (req, res) => {

    const { rows: data } = await pool.query((`SELECT * FROM likes ;`));

    res.json({
        success: true,
        data: data,
    });
};

export const createLike = async (req, res) => {
    const { user_id} = req.body;
    const { post_id } = req.params;

    const { rows: data } = await pool.query(
        ` INSERT INTO likes (user_id) VALUES ($1) RETURNING *;`,
        [user_id, post_id, created_at],
    );

    res.json({
        success: true,
        data,
    });
};

export const deletedLike = async (req, res) => {
    const { id } = req.params;
    await pool.query(` DELETE FROM likes WHERE post_id = $1`, [id]);
    res.status(204).send();
};
