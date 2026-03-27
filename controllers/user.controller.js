import pool from "../configs/database.js";

export const getAllUsers = async (req, res) => {
    const { search } = req.query;

    let query = ` SELECT * FROM users `;

    //searching
    if (search) {
        query += ` WHERE name ILIKE '%${search}%' OR email ILIKE '%${search}%'`;
    }

    const { rows: data } = await pool.query(query);

    res.json({
        success: true,
        data: data,
    });
};
export const getOneUser = async (req, res) => {
    const { id } = req.params;
    const { rows: data } = await pool.query(
        ` SELECT * FROM users WHERE id = $1`,
        [id],
    );
    res.json({
        success: true,
        data,
    });
};
export const createUser = async (req, res) => {
    const { name, email } = req.body;
    const { rows: data } = await pool.query(
        ` INSERT INTO users (name,email) VALUES ($1, $2) RETURNING *;`,
        [name, email],
    );

    res.json({
        success: true,
        data,
    });
};

export const updatedUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    await pool.query(`UPDATE users SET name = $1, email = $2 WHERE id = $3`, [
        name,
        email,
        id,
    ]);
    res.status(204).send();
};

export const deletedUser = async (req, res) => {
    const { id } = req.params;
    await pool.query(` DELETE FROM users WHERE id = $1`, [id]);
    res.status(204).send();
};


export const getPostsByUserId = async (req, res) => {
    const { id: user_id } = req.params;
    const { rows: data } = await pool.query(
        ` SELECT * FROM posts WHERE user_id = $1`,
        [user_id],
    );
    res.json({
        success: true,
        data,
    });
};

export const getPostsCountByUserId = async (req, res) => {
    const { id: user_id } = req.params;
    const { rows: data } = await pool.query(
        ` SELECT COUNT(*) FROM posts WHERE user_id = $1`,
        [user_id],
    );
    res.json({
        success: true,
        count: Number(data[0]?.count),
    });
};
