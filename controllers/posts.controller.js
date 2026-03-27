import pool from "../configs/database.js";

export const getAllPosts = async (req, res) => {
    const {
        limit = 10,
        page = 1,
        search,
        sortBy,
        sortOrder = "asc",
        author,
    } = req.query;

    let query = ` SELECT * FROM posts `;
    const offset = (page - 1) * limit;

    //searching
    if (search) {
        query += ` WHERE title ILIKE '%${search}%' OR content ILIKE '%${search}%'`;
    }

    if (author) {
        query += ` WHERE user_id = ${author}`;
    }

    // sorting
    const SORTABLE_FIELDS = ["id", "title"];
    if (sortBy) {
        if (!SORTABLE_FIELDS.includes(sortBy)) {
            return res.status(400).send({
                success: false,
                message: `Faqat ushbu ${SORTABLE_FIELDS.join(", ")} ustunlar boyicha tartiblash mumkin`,
            });
        }
        query += ` ORDER BY ${sortBy} ${sortOrder.toUpperCase()}`;
    }
    const countQuery = query
        .replace("SELECT *", "SELECT COUNT(*)")
        .replace(/ORDER BY.+/i, "");

    const { rows: totalCount } = await pool.query(countQuery);

    const { rows: data } = await pool.query(
        (query += ` LIMIT ${limit} OFFSET ${offset};`),
    );

    res.json({
        success: true,
        limit: Number(limit),
        page: Number(page),
        totalCount: Number(totalCount[0]?.count),
        data: data,
    });
};
export const getOnePost = async (req, res) => {
    const { id } = req.params;
    const { rows: data } = await pool.query(
        ` SELECT * FROM posts WHERE id = $1`,
        [id],
    );
    res.json({
        success: true,
        data,
    });
};
export const createPosts = async (req, res) => {
    const { title, content, user_id } = req.body;
    const { rows: data } = await pool.query(
        ` INSERT INTO posts (title,content,user_id) VALUES ($1, $2, $3) RETURNING *;`,
        [title, content, user_id],
    );

    res.json({
        success: true,
        data,
    });
};

export const updatedPost = async (req, res) => {
    const { id } = req.params;
    const { title, content, user_id } = req.body;

    await pool.query(
        `UPDATE posts SET title = $1, content = $2, user_id = $3 WHERE id = $4`,
        [title, content, user_id, id],
    );
    res.status(204).send();
};

export const deletedPost = async (req, res) => {
    const { id } = req.params;
    await pool.query(` DELETE FROM posts WHERE id = $1`, [id]);
    res.status(204).send();
};

export const getPostsByComment = async (req, res) => {
    const { id: post_id } = req.params;
    const { rows: data } = await pool.query(
        ` SELECT * FROM comments WHERE post_id = $1`,
        [post_id],
    );
    res.json({
        success: true,
        data,
    });
};

export const getPostsCountLikes= async (req, res) => {
    const { id: post_id } = req.params;
    const { rows: data } = await pool.query(
        ` SELECT COUNT(*) FROM likes WHERE post_id = $1`,
        [post_id],
    );
    res.json({
        success: true,
        count: Number(data[0]?.count),
    });
};
