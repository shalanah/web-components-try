export const templates = {
  get blogPost() {
    const template = document.createElement("template");
    template.innerHTML = /*html*/ `
     <div class="blog-post">
       <slot name="title"><h2>TITLE</h2></slot>
       <p>DESC</p>
       <slot name="link"><a href="/">learn more</a></slot>
       <slot name="thumbnail"><img src="" title="" alt="" /></slot>
     </div>
    `;
    return template;
  },
};
