import {promises as fs} from 'fs';
import {position} from "@chakra-ui/react";

export default async function Page() {
    async function getPosts() {
        const posts = await fs.readdir(process.cwd() + '/app/(posts)')
        let postData = []
        posts.map(async post => {
            const file = await fs.readFile(process.cwd() + '/app/(posts)/' + post + '/metadata.json', 'utf-8')
            const data = JSON.parse(file);
            postData.push(data)
            console.log(postData.length)
        })
        console.log(postData)
        return postData
    }

    async function mapPosts(){
        return await getPosts()
            .then(posts => {
                return posts.map(post => {
                    return (
                        <div key={post.title}>
                            <h1>{post.title}</h1>
                            <p>{post.description}</p>
                        </div>
                    )
                })

            })
    }

    let data = await mapPosts()

    return (
        <div>
            <h1>Blog Page</h1>
            <ul>
                <li>
                    <p>{data}</p>
                </li>
            </ul>
        </div>
    )
}
