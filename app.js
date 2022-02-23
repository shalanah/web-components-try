// Following https://www.youtube.com/watch?v=PFpUCnyztJk
class BlogPost extends HTMLElement {
  constructor() {
    super();
    // console.log("this", this); blog post elem
    // Not shadow
    // - Can access from dom root
    // this.innerHTML = /*html*/ `
    //   <div class="blog-post">
    //     <h2>Title</h2>
    //     <p>Paragraph hey-a</p>
    //     <a href="">learn more</a>
    //   </div>
    // `;
  }
  connectedCallback() {
    // like component mount
    console.log("connected");
    this.render();
  }
  render() {
    // Shadow dom :)
    const shadowRoot = this.attachShadow({
      mode: "closed", // whether or not accessed shadow root + manipulate from outside
      // - if "open"... no need for `const shadowRoot` can use `this.shadowRoot` instead
      delegatesFocus: true, // whole element can get focus... + displays comp :focus if a child element is in focus
    });
    shadowRoot.innerHTML = /*html*/ `
     <div class="blog-post">
       <h2>Title</h2>
       <p>Paragraph hey-ya</p>
       <a href="">learn more</a>
     </div>
    `;
  }
  adoptedCallback() {
    // Great with iframes, embedding, or when using `adoptNode` changing document context
    console.log("adopted");
  }
  static get observedAttributes() {
    return ["title", "description", "link"];
  }
  attributeChangedCallback(name, prevVal, nextValue) {
    // like component did update
    const hasAttr = this.hasAttribute(name);
    console.log({ name, prevVal, nextValue, hasAttr });
  }
  disconnectedCallback() {
    // like component unmount
    // great place to cleanup
    console.log("disconnected");
  }
}
// class MyButton extends HTMLButtonElement {}

// Name be at 2 words connected by a dash
// A lot of libs use a prefix like material design uses mat-
customElements.define("sfd-blog-post", BlogPost);
// customElements.define("sfd-my-button", MyButton, { extends: "button" }); // extends not supported by Safari... still

// Trying to get shadowRoot... only works if "open"
const post = document.querySelector("sfd-blog-post");
console.log(post.shadowRoot); // null if "closed"

// In order to see disconnected callback
const disconnectComp = (selector) => {
  const elem = document.querySelector("sfd-blog-post");
  setTimeout(() => {
    elem.remove();
  }, 2000);
};

// disconnectComp("sfd-blog-post");
