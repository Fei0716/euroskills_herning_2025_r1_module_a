/*
 * RestaurantCard web component
 */
document.addEventListener('DOMContentLoaded', function(){
    class RestaurantCard extends HTMLElement {
        constructor() {
            super();

            // Create a shadow root
            const shadowRoot = this.attachShadow({mode: 'open'});


            // style
            const style = document.createElement('style');
            style.textContent = `
                :host{
                    box-sizing: border-box;
                }
                .restaurant-card{
                    position: relative;
                    border-radius: 0.5rem;
                    padding: 0.75rem;
                    display: flex;
                    width: 300px;
                    box-shadow: 2px 2px 10px rgb(7 7 7 / 20%);
                    background-color: var(--primary-color);
                    flex-direction: column;
                }
                .card-image{
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                    border-radius: 0.5rem;
                }
                .card-title{
                    margin: 1rem 0;
                }
                p{
                    padding:  0;
                    margin-top: 0!important;
                    margin-bottom: 1.5rem;
                }
                slot {
                    color: #797979;
                    font-size: 1rem;
                }
                .card-btn{
                    color: #8a26f6;
                    font-size: 0.8rem;
                    font-weight: bold;
                    display: block;
                    width: 100%;
                    text-align: end;
                    position: absolute;
                    bottom: 0.75rem;
                    right: 0.75rem;
                    border: none;
                    background-color: transparent;      
                    cursor: pointer;          
                }
            `;

            //Title
            const title = document.createElement('h2');
            title.classList.add('card-title');
            title.textContent = this.getAttribute('title');

            // Continue
            const button = document.createElement('button');
            button.textContent = 'Continue >>';
            button.classList.add('card-btn');
            //Image
            const image = document.createElement('img');
            image.classList.add('card-image');
            image.src = this.getAttribute('imageSrc');
            image.alt = 'Image of ' + this.getAttribute('title');
            image.loading = 'lazy';
            const article = document.createElement('article');
            article.classList.add('restaurant-card');
            article.appendChild(image);
            article.appendChild(title);
            article.appendChild(button);

            article.innerHTML += '<p><slot></slot></p>';

            shadowRoot.appendChild(style);
            shadowRoot.appendChild(article);




        }
        //mounted
        connectedCallback() {
            this.update();
            this.shadowRoot.querySelector('button').addEventListener('click', ()=>{
                console.log('button clicked');
                this.dispatchEvent(new CustomEvent('select', {
                    detail: {
                        id: this.id
                    }
                }));
            });
        }
        attributeChangedCallback(name, oldValue, newValue) {
            if (name === 'layout' && oldValue !== newValue) {
                this.update();
            }
        }
        // Define the observed attributes
        static get observedAttributes() {
            return ['layout'];
        }
        update(){
            const style = document.createElement('style');

            if(this.getAttribute('layout') === 'horizontal'){
                style.textContent += `
                     .restaurant-card{
                       position: relative;
                        flex-direction: row!important;
                        width: fit-content;
                        flex-wrap: wrap;
                        box-sizing: border-box;
                        gap: 1rem;
                     }
                     .card-title{
                        order: -1!important;
                        flex-basis: 100%;
                     }
                     img, p{
                        width: 48%!important;
                        flex: 0 1 48%;
                     }
                     .card-btn{
                            top: 1.55rem;
                            right: 0.75rem;
                            height: fit-content;
                    }
                    .card-title{
                        margin: 0;
                    }
                `;

                this.shadowRoot.appendChild(style);
            }else{
                style.textContent += `
                     .restaurant-card{
                        flex-direction: column!important;
                        position: relative;
                        width: 300px;
                        flex-wrap: no-wrap;
                        box-sizing: border-box;
                        gap: 0rem;
                     }
                    .card-title{
                        margin: 1rem 0;
                    }
                    .card-title{
                        order: 0!important;
                        flex-basis: 100%;
                     }
                     img, p{
                        width: 100%!important;
                        flex: 0 1 100%;
                     }
                     .card-btn{
                        top: auto;
                        bottom: 0.75rem!important;
                        right: 0.75rem;
                        height: fit-content!important;
                    }
                    .card-title{
                        margin: 0;
                    }
                `;

                this.shadowRoot.appendChild(style);
            }
        }
        //unmounted
        disconnectedCallback() {

        }
    }


    if('customElements' in window){
        customElements.define('restaurant-card', RestaurantCard);
    }

});
