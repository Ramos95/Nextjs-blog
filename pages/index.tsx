import Head from "next/head";
import { NextPage, GetStaticProps } from "next";
import { getAllFilesFrontMatter } from "lib/mdx";
import Link from "components/Link";
import { useState } from "react";
import Image from "next/image";

type Props = {
  posts: {
    title: string;
    slug: string;
    image: string;
    description: string;
    tags: string[];
  }[];
};

const Home: NextPage<Props> = ({ posts }) => {
  const [search, setSearch] = useState("");

  const filteredPosts = posts.filter((fontMatter) =>
    fontMatter.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <div className={"container w-full max-w-full"}>
      <Head>
        <title>Mi primer blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="h-20  bg-softblue flex items-center">
        <h1 className="text-3xl font-bold text-white ml-5">Nextjs Blog</h1>
      </header>

      <main className="py-8 px-5 grid grid-cols-3 gap-3">
        <div className="relative w-full mb-4 col-span-3">
          <input
            aria-label="Search articles"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title"
            className="px-4 py-2 border border-gray-300 dark:border-gray-900
          focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md bg-white text-gray-900 dark:text-gray-100"
          />
          <svg
            className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {filteredPosts.map((post) => (
          <section
            key={post.slug}
            className="block rounded border border-gray-200  hover:bg-gray-300 col-span-1 shadow-md"
          >
            <Image
              src={post.image}
              loader={() => post.image}
              height={200}
              width={200}
              alt="img"
            />
            <Link href={`/blog/${post.slug}`}>
              <h3 className="hover:text-blue-600 h-10 p-2">{post.title}</h3>
            </Link>
            <p className="h-10 p-2">{post.description}</p>
            <div className="flex flex-row flex-wrap p-2">
              {post.tags.map((tag) => (
                <label
                  key={tag}
                  className="mr-3 bg-blue-600 text-white rounded-full px-3"
                >{`#${tag}`}</label>
              ))}
            </div>
            <style>
              {`section > div:first-child{
                width:100%;
                border-top-left-radius: 0.25rem;
                border-top-right-radius: 0.25rem;
              }`}
            </style>
          </section>
        ))}
      </main>

      <footer className="p-6">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" NEXTJS"}
        </a>
      </footer>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllFilesFrontMatter("posts");

  return { props: { posts } };
};

export default Home;
