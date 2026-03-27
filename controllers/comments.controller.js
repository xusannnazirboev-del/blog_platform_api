import pool from "../configs/database.js";

export const getAllComments = async (req, res) => {
    const { rows: data } = await pool.query(`SELECT * FROM comments ;`);

    res.json({
        success: true,
        data: data,
    });
};

export const getpostsWithComment = async (req, res) => {
    const { id } = req.params;
    const { rows: data } = await pool.query(
        ` SELECT * FROM comments WHERE post_id = $1`,
        [id],
    );
    res.json({
        success: true,
        data,
    });
};
export const createComment = async (req, res) => {
    const {text,post_id,user_id } = req.body;
    const { rows: data } = await pool.query(
        ` INSERT INTO comments (text,post_id,user_id) VALUES ($1, $2, $3);`,
        [text, post_id, user_id],
    );

    res.json({
        success: true,
        data,
    });
};

export const deletedComment = async (req, res) => {
    const { id } = req.params;
    await pool.query(` DELETE FROM comments WHERE id = $1`, [id]);
    res.status(204).send();
};
