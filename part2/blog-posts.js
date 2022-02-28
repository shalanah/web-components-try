export class BlogPosts extends HTMLElement {
  #posts = [];
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "closed" });
  }
  set posts(value) {
    this.#posts = value;
    console.log(value);
    this.render();
  }
  get style() {
    return /*html*/ `
      <style>
        :host {
          display: block /* Always has inline set on it by defaout */
        }
        :host *, :host *:after, :host *:before {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        section .posts {
          padding: 0 20px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          grid-auto-rows: 1fr;
          grid-gap: 25px;
          font-size: 1rem;
        }
        h2, ::slotted([slot="heading"]) {
          font-weight: 500px;
          letter-spacing: 0.05rem;
          border-bottom: 1px solid #0a66a8;
          margin-bottom: 15px;
        }
      </style>
    `;
  }
  render() {
    this.shadow.innerHTML = /*html*/ `${this.style}<section>
          <slot name="heading">
            <h2>Blog Posts</h2>
            <div class="posts">
              ${this.#posts
                .map(({ title, description, link, thumbnail }) => {
                  return /*html*/ `<sfd-blog-post
                    title="${title || ""}"
                    description="${description || ""}"
                    link="${link || ""}"
                    thumbnail="${thumbnail || ""}"
                  ></sfd-blog-post>`;
                })
                .join("")}
            </div>
          </slot>
        </section>
      `;
  }
}

customElements.define("blog-posts", BlogPosts);
