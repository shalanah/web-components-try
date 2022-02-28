// Following https://www.youtube.com/watch?v=PFpUCnyztJk
// - Setting data
console.log("--- READY ---");

class BlogPost extends HTMLElement {
  #title; // If you want to set as a private property
  constructor() {
    super();
    this.attachShadow({
      mode: "open",
      delegatesFocus: true,
    });
    this.render();
  }

  set title(value) {
    // Also allows validation
    this.#title = value || "";
  }
  get title() {
    return this.#title;
  }

  set data(value) {
    Object.entries(value).map(([name, value]) => {
      this.updateAttr({ name, value });
    });
  }
  static get observedAttributes() {
    // Declare atts that will change that you want to watch
    return ["title", "description", "link"];
  }
  updateAttr({ name, value }) {
    const v = value || "";
    switch (name) {
      case "title":
      case "description": {
        this[`${name}Elem`].textContent = v;
        break;
      }
      case "link": {
        this[`${name}Elem`].setAttribute("href", v);
        break;
      }
      default:
        break;
    }
  }
  attributeChangedCallback(
    name,
    prevVal, // null if first load or attr was removed
    value
  ) {
    // like component did update
    const hasAttr = this.hasAttribute(name);
    updateAttr({ name, value });
    console.log("attr change", { name, prevVal, value, hasAttr });
  }
  connectedCallback() {
    // like component mount
    console.log("connected");
  }
  disconnectedCallback() {
    console.log("disconnected");
  }
  render() {
    console.log("render");
    this.shadowRoot.innerHTML = /*html*/ `
     <div class="blog-post">
       <h2></h2>
       <p></p>
       <a>learn more</a>
     </div>
    `;

    // Don't update everything... just what needs to get updated
    this.titleElem = this.shadowRoot.querySelector("h2");
    this.linkElem = this.shadowRoot.querySelector("a");
    this.descriptionElem = this.shadowRoot.querySelector("p");
  }
}

customElements.define("sfd-blog-post", BlogPost);

const post = document.querySelector("sfd-blog-post");
post.title = "hey there";
// Set data
post.data = {
  title: "My Web Comp",
  description: "Hello world",
  link: "https://example.com",
};

// const changeAttr = (selector) => {
//   const elem = document.querySelector(selector);
//   elem.setAttribute("title", "new");
// };

// changeAttr("sfd-blog-post");
