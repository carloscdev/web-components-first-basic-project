class ProductCard extends HTMLElement {
  constructor() {
    super() 
    this.attachShadow({ mode: "open"})
  }

  static get observedAttributes() {
    return ['color', 'title', 'image', 'description', 'price']
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (oldVal !== newVal) {
      this[attr] = newVal
    }
  }

  getTemplate() {
    const template = document.createElement("template")
    template.innerHTML = `
      <main class="product">
        <section class="product-card">
          <div class="product-image">
            <img src="${this.image}" alt="${this.color} ${this.title}" />
          </div>
          <div class="product-description">
            <span>
            ${this.color}
            </span>
            <h1>${this.title}</h1>
            <p class="description">
              ${this.description}
            </p>
            <div class="interactive">
              <p>
                <span>$</span>
                ${this.price}
              </p>
              <button>
                <strong>ADD TO CART</strong>
              </button>
            </div>
          </div>
        </section>
      </main>
      ${this.getStyles()}
    `
    return template
  }
  getStyles() {
    return `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;900&display=swap');
        :host {
          --primary-color: #2258C3;
          --secondary-color: #001E4D;
          --button-color: #0041C2;
        }
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }
        .product {
          background-color: var(--secondary-color);
          width: 540px;
          max-width: 100%;
          min-height: 100px;
          position: relative;
          overflow: hidden;
          font-family: 'Montserrat', sans-serif;
          border-radius: 10px;
          padding: 50px 30px;
        }
        .product::before {
          content: '';
          position: absolute;
          background-color: var(--primary-color);
          height: 200%;
          width: 50%;
          transform: rotate(30deg);
          top: -50%;
          left: -20%;
          z-index: 0;
        }
        .product::after {
          background: linear-gradient(131.03deg, rgba(0, 30, 77, 0) 29.9%, rgba(0, 30, 77, 0.7) 93.9%);
          background-blend-mode: multiply;
          content: '';
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
        }
        .product-card {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 0.8fr 1fr;
          align-items: center;
          gap: 10px;
          min-height: 100%;
        }
        .product-image img {
          width: 100%;
        }
        .product-description {
          color: white;
        }
        .product-description span {
          color: var(--primary-color);
          font-weight: 900;
          font-size: 30px;
        }
        .product-description h1 {
          font-weight: 900;
          font-size: 60px;
          line-height: 45px;
        }
        .product-description .description {
          font-weight: 300;
          font-size: 9px;
          margin: 20px 0;
        }
        .product-description .interactive {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .product-description .interactive p {
          font-weight: 900;
          font-size: 25px;
        }
        .product-description .interactive span {
          display: inline-block;
          font-size: 13px;
          transform: translateY(-10px);
        }
        .product-description button {
          background-color: var(--button-color);
          transform: skew(-20deg);
          height: 40px;
          border: none;
          cursor: pointer;
          padding: 0 20px;
          position: relative;
        }
        .product-description button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -20px;
          background-color: var(--button-color);
          height: 40px;
          width: 15px;
        }
        .product-description button::after {
          content: '';
          position: absolute;
          top: 0;
          left: -30px;
          background-color: var(--button-color);
          height: 40px;
          width: 5px;
        }
        .product-description button strong {
          display: inline-block;
          color: white;
          transform: skew(20deg);
          font-size: 10px;
        }
        @media (max-width: 480px) {
          .product {
            padding: 20px;
          }
          .product::before {
            transform: rotate(-60deg);
            top: -110%;
            left: -20%;
            width: 400px;
          }
          .product-card {
            grid-template-columns: 1fr;
          }
        }
      </style>
    `
  }

  render() {
    this.shadowRoot.append(this.getTemplate().content.cloneNode(true))
  }

  connectedCallback() {
    this.render()
  }
}

customElements.define("product-card", ProductCard)