// Following https://www.youtube.com/watch?v=PFpUCnyztJk
class BlogPost extends HTMLElement {
  constructor() {
    super();
    // console.log("this", this); post elem

    // Shadow dom :)
    const shadowRoot = this.attachShadow({ mode: "closed" });

    // Not shadow
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
}
// class MyButton extends HTMLButtonElement {}

// Name be at 2 words for names connected by a dash
// A lot of libs use a prefix like material design uses mat-
customElements.define("sfd-blog-post", BlogPost);
// customElements.define("sfd-my-button", MyButton, { extends: "button" });
