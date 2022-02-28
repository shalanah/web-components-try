// Following https://www.youtube.com/watch?v=PFpUCnyztJk
// Setting up a web comp and listening to attr on it
console.log("--- READY ---");

class BlogPost extends HTMLElement {
  // Default values
  title = "";
  description = "";
  link = "";
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
    // Shadow dom :)
    this.attachShadow({
      mode: "open", // whether or not accessed shadow root + manipulate from outside
      // - if "open"... no need for `const shadowRoot` can use `this.shadowRoot` instead
      delegatesFocus: true, // whole element can get focus... + displays comp :focus if a child element is in focus
    });
    this.render();
  }
  adoptedCallback() {
    // Great with iframes, embedding, or when using `adoptNode` changing document context
    console.log("adopted");
  }
  connectedCallback() {
    // like component mount
    console.log("connected");
  }
  set data(value) {}
  static get observedAttributes() {
    // Declare atts that will change that you want to watch
    return ["title", "description", "link"];
  }
  attributeChangedCallback(
    name,
    prevVal, // null if first load or attr was removed
    value
  ) {
    // like component did update
    const hasAttr = this.hasAttribute(name);
    const v = value || "";
    switch (name) {
      case "title":
      case "description":
        // this[name] = v;
        this[`${name}Elem`].textContent = v;
        break;
      case "link":
        // this[name] = v;
        this[`${name}Elem`].setAttribute("href", v);
        break;
      default:
        break;
    }
    console.log("attr change", { name, prevVal, value, hasAttr });
  }
  disconnectedCallback() {
    // like component unmount - great place to cleanup
    console.log("disconnected");
  }
  render() {
    this.shadowRoot.innerHTML = /*html*/ `
     <div class="blog-post">
       <h2>${this.title}</h2>
       <p>${this.description}</p>
       <a href=${this.link}>learn more</a>
     </div>
    `;

    // Don't update everything... just what needs to get updated
    this.titleElem = this.shadowRoot.querySelector("h2");
    this.linkElem = this.shadowRoot.querySelector("a");
    this.descriptionElem = this.shadowRoot.querySelector("p");
  }
}
// class MyButton extends HTMLButtonElement {}

// Name be at 2 words connected by a dash
// A lot of libs use a prefix like material design uses mat-
customElements.define("sfd-blog-post", BlogPost);
// customElements.define("sfd-my-button", MyButton, { extends: "button" }); // extends not supported by Safari... still

// Trying to get shadowRoot... only works if "open"
const post = document.querySelector("sfd-blog-post");
// console.log(post.shadowRoot ? "open" : "closed");

const disconnectComp = (selector) => {
  const elem = document.querySelector(selector);
  setTimeout(() => {
    elem.remove();
  }, 2000);
};

const changeAttr = (selector) => {
  const elem = document.querySelector(selector);
  elem.setAttribute("title", "new");
};

// disconnectComp("sfd-blog-post");
changeAttr("sfd-blog-post");
