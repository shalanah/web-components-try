import { templates } from "./templates.js";

export class BlogPost extends HTMLElement {
  // Default values
  title = "";
  description = "";
  link = "";
  thumbnail = "";
  constructor() {
    super();
    this.attachShadow({
      mode: "open",
      delegatesFocus: true,
    });
    this.render();
  }
  static get observedAttributes() {
    // Declare atts that will change that you want to watch
    return ["title", "description", "link", "thumbnail"];
  }
  updateAttr({ name, value }) {
    const v = value || (name === "title" ? "NO TITLE" : "");
    switch (name) {
      case "title":
      case "description":
      case "link":
      case "thumbnail": {
        this[`${name}`] = v;
        break;
      }
      default:
        break;
    }
  }
  attributeChangedCallback(name, prevVal, value) {
    this.updateAttr({ name, value });
    this.render(); // should not happen often so ok to do here... not always the case
  }
  get style() {
    return /*html*/ `
      <style>
        /* Can use css vars to make it into shadow root */
        :host {
          display: block /* Always has inline set on it by defaout */
        }
        :host *, :host *:after, :host *:before {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        .blog-post { 
          background: #f6f6f6;
          padding: 10px 10px 25px;
          border-radius: 5px;
          height: 100%;
        }
        .blog-post .thumbnail {
          background: #ddd;
          height: 150px;
          overflow: hidden;
          margin-bottom: 10px;
        }
        .blog-post .thumbnail img[href=""] {
          display: none;
        }
        p, h2, .thumbnail {
          margin-bottom: 10px !important;
        }
      </style>
    `;
  }
  get template() {
    return /*html*/ `
     <div class="blog-post">
       <div class="thumbnail">
       ${
         this.thumbnail
           ? `<slot name="thumbnail" <img src=${this.thumbnail} title=${this.title} /></slot>`
           : ``
       }  
       </div>
       <slot name="title"><h2>${this.title}</h2></slot>
       <p>${this.description || "Backup text"}</p>
       <slot name="link"><a href=${this.link}>learn more</a></slot>
       
     </div>
    `;
  }
  render() {
    // const template = templates.blogPost;
    // console.log(templates);
    // this.shadowRoot.appendChild(template.content);
    this.shadowRoot.innerHTML = `${this.style}${this.template}`;
  }
}

customElements.define("sfd-blog-post", BlogPost);
