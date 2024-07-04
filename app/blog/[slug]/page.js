import matter from 'gray-matter';
import path from 'path';
import fs from 'fs';
import cache from 'react';

export const getStaticPaths = cache(async () => {
    const posts = await fs.readdir('./posts/')

    return Promise.all(
        posts
            .filter((file) => path.extname(file) === '.mdx')
            .map(async (file) => {
                const filePath = `./posts/${file}`
                const postContent = await fs.readFile(filePath, 'utf8')
                const { data, content } = matter(postContent)

                if (data.published === false) {
                    return null
                }

                return { ...data, body: content }
            })
    )
});

