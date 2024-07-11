import {promises as fs} from 'fs';
import Link from "next/link";
import Footer from "@/app/components/mdx/Footer";

async function getPosts() {
    // Fetch all blog posts
    const postFolderList = await fs.readdir('./app/(posts)'); // list of folders
    let posts = [];
    for (let i = 0; i < postFolderList.length; i++) {
        let postMetadata = await fs.readFile(`./app/(posts)/${postFolderList[i]}/metadata.json`, 'utf-8');
        postMetadata = JSON.parse(postMetadata);
        posts.push(postMetadata);
    }
    return posts;
}

export default async function Page() {
    const posts = await getPosts();

    return (
        <div className={'bg-slate-100 min-h-screen w-screen flex flex-col'}>
            <h1 className={'font-inter font-semibold text-5xl pt-16 mx-auto'}>Blog</h1>
            <div className={'grid grid-cols-2 mx-2 my-20'}>
                {posts ? posts.map((post) => {
                    return (
                        <Link href={`/${post.ID}`} key={post.ID}>
                            <div
                                className={'border border-slate-400 hover:border-slate-600 hover:shadow-lg rounded-lg mx-4 p-4'}>
                                <div className={'flex flex-col md:flex-row justify-between'}>
                                    <h2 className={'font-inter font-semibold text-2xl mr-4'}>{post.title}</h2>
                                    <p className={'mt-2 md:mt-0'}>{post.publishDate}</p>
                                </div>
                                <p className={'mt-2'}>{post.excerpt}</p>
                            </div>
                        </Link>
                    )
                }) : <p>Loading...</p>}
            </div>
            <div className={'w-fit h-fit mt-auto'}>
                <Footer/>
            </div>
        </div>
    )
}