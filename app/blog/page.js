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

    // sort posts by date
    posts.sort((a, b) => {
        return new Date(b.publishDate) - new Date(a.publishDate);
    });

    return posts;
}

export default async function Page() {
    const posts = await getPosts();

    return (
        <div className={'bg-slate-100 min-h-screen w-screen flex flex-col'}>
            <h1 className={'font-inter font-semibold text-6xl pt-16 mx-auto'}>Blog</h1>
            <div className={'grid grid-cols-1 md:grid-cols-2 md:mx-10 my-20'}>
                {posts ? posts.map((post) => {
                    return (
                        <Link href={`/${post.ID}`} key={post.ID} className={'mb-6 sm:transition sm:ease-in-out sm:hover:scale-105'}>
                            <div
                                className={'bg-slate-100 border border-slate-400 hover:border-slate-600 hover:shadow-md rounded-lg mx-4 p-4 h-full'}>
                                <div className={'flex flex-col md:flex-row justify-between'}>
                                    <h2 className={'font-inter font-semibold text-3xl mr-4'}>{post.title}</h2>
                                    <p className={'mt-2 md:mt-0 font-inter'}>{post.publishDate}</p>
                                </div>
                                <p className={'mt-2 font-inter'}>{post.excerpt}</p>
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