// Following https://www.youtube.com/watch?v=PFpUCnyztJk
class BlogPost extends HTMLElement {
  constructor() {
    super();
    // console.log("this", this); post elem

    // Shadow dom :)
    // - if "open"... can get to shadowRoot without the return since it is accessible
    const shadowRoot = this.attachShadow({
      mode: "closed", // whether or not accessed shadow root + manipulate from outside
      delegatesFocus: true, // whole element can get focus...  displays :focus if a child element is in focus
    });

    // Not shadow
    // - Can access from dom root
    // this.innerHTML = /*html*/ `
    //   <div class="blog-post">
    //     <h2>Title</h2>
    //     <p>Paragraph hey-a</p>
    //     <a href="">learn more</a>
    //   </div>
    // `;

    // Shadow
    shadowRoot.innerHTML = /*html*/ `
     <div class="blog-post">
       <h2>Title</h2>
       <p>Paragraph hey-a</p>
       <a href="">learn more</a>
     </div>
    `;
  }
  connectedCallback() {
    // like component mount
    console.log("mount");
  }
  disconnectedCallback() {
    // like component unmount
    console.log("unmount");
  }
}
// class MyButton extends HTMLButtonElement {}

// Name be at 2 words for names connected by a dash
// A lot of libs use a prefix like material design uses mat-
customElements.define("sfd-blog-post", BlogPost);
// customElements.define("sfd-my-button", MyButton, { extends: "button" });

// Trying to get shadowRoot... only works if "open"
const post = document.querySelector("sfd-blog-post");
console.log(post.shadowRoot);
