import { BlogPost } from "./blog-post.js"; // don't forget ext
import { BlogPosts } from "./blog-posts.js";

console.log("--- READY ---");

const postsElem = document.querySelector("blog-posts");
postsElem.posts = [
  {
    title: "How to become a web developer in 6 months",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aut eum eveniet fugit repellendus vero!",
  },
  {
    title: "Web Components will enhance Javascript libraries, not replace them",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aut eum eveniet fugit repellendus vero!",
  },
  {
    title: "How to properly build web components to help you scale easily",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aut eum eveniet fugit repellendus vero!",
  },
  {
    title: "How to build a fullstack website start to finish",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aut eum eveniet fugit repellendus vero!",
  },
  {
    title: "NodeJs projects that will make you a full stack",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aut eum eveniet fugit repellendus vero!",
  },
  {
    title: "10 CSS tricks you need to learn for your next project",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aut eum eveniet fugit repellendus vero!",
  },
];
