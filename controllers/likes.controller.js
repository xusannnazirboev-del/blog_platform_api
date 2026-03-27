import pool from "../configs/database.js";

export const getAllLikes = async (req, res) => {
    const { rows: data } = await pool.query(`SELECT * FROM likes ;`);

    res.json({
        success: true,
        data: data,
    });
};

export const createLike = async (req, res) => {
    const { user_id } = req.body;
    const { id:post_id } = req.params;

    const { rows: data } = await pool.query(
        ` SELECT user_id, post_id FROM likes WHERE user_id = $1 AND post_id = $2`,
    );

    if (liked.length !== 0) {
        return res
            .status(400)
            .send({ success: false, message: "Already liked" });
    }
    try {
        await pool.query(
            ` INSERT INTO likes (user_id, post_id) VALUES ($1,$2);`,
            [user_id, post_id, created_at],
        );
        res.json({
            success: true,
            data,
        });
    } catch (error) {
        return res
            .status(400)
            .send({ success: false, error:error });
    }
};

export const deletedLike = async (req, res) => {
    const { id } = req.params;
    await pool.query(` DELETE FROM likes WHERE post_id = $1`, [id]);
    res.status(204).send();
};
