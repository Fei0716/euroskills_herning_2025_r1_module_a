<script setup>
import {onMounted ,ref} from "vue";


let searchMode = null;
let topRestaurants =  null;
let searchRestaurants = null;
let cuisineOptions = [];
const showBtn = ref(null);
const restaurantList = ref(null);
const searchList  = ref(null);
onMounted(()=>{
  restaurantList.value = document.querySelector('#featured-restaurants');
  searchList.value  = document.querySelector('#dining-spots');
  fetchTopRestaurants();
  fetchSearchRestaurants(3);//initially randomly load 3 restaurants

});
async function fetchTopRestaurants(){
  const response = await fetch('/data/top-rated-restaurants.json');
  topRestaurants =  await response.json();
  topRestaurants.forEach((data , i)=>{
    restaurantList.value.innerHTML += `
            <article class="featured-card">
                <img src="/images/${data.image}" alt="Image of ${data.name}">
                <div class="featured-card-content">
                    <div class="featured-card-header">
                        <h2>${data.name}</h2>
                    </div>
                    <p class="mb-1">${data.description}</p>
                    <a href="#">View restaurant >></a>
                </div>
            </article>

        `;
    //add the rating stars
    const divElement = document.createElement('div');
    divElement.classList.add('rating');
    for(let i = 0; i < 5; i++){
      const star = document.createElement('img');
      star.src = '/images/star.png';
      star.classList.add('star');
      if(i >= data.rating){
        star.classList.add('star-disabled');
      }
      divElement.append(star);

    }

    restaurantList.value.querySelectorAll('.featured-card')[i].querySelector('.featured-card-header').appendChild(divElement);

  });

}
async function fetchSearchRestaurants(count , mode = null){
  const response = await fetch('/data/restaurants.json');
  searchRestaurants =  await response.json();
  searchRestaurants.forEach((data , i) =>{
    //   add the cuisine
    if(!cuisineOptions.includes(data.cuisine)){
      cuisineOptions.push(data.cuisine);
      document.querySelector('#cuisine').innerHTML += `<option value="${data.cuisine}">${data.cuisine}</option>`;
    }
  });
  // reset the list
  searchList.value.innerHTML = '';
  //         filter list based on search mode
  searchRestaurants = searchRestaurants.splice(0,count);
  if(mode === 'simple' && document.querySelector('#simple-search').value !== ''){
    searchRestaurants = searchRestaurants.filter((data)=>{
      console.log()
      return data.name.toLowerCase().includes(document.querySelector('#simple-search').value.toLowerCase()) || data.location.toLowerCase().includes(document.querySelector('#simple-search').value.toLowerCase()) || data.cuisine.toLowerCase().includes(document.querySelector('#simple-search').value.toLowerCase());
    });
  }else if(mode ==='advanced'){
    let cuisine =  document.querySelector('#cuisine').value.toLowerCase();
    let location = document.querySelector('#location').value.toLowerCase();
    let name = document.querySelector('#name').value.toLowerCase();
    searchRestaurants = searchRestaurants.filter((data)=>{
      console.log(cuisine, location , name);
      if(cuisine !== ''){
        if(data.cuisine.toLowerCase() !== cuisine){
          return false;
        }
      }
      if(location !== ''){
        if(!data.location.toLowerCase().includes(location)){
          return false;
        }
      }
      if(name !== ''){
        if(!data.name.toLowerCase().includes(name)){
          return false;
        }
      }
      return true;
    });
  }
  searchRestaurants.forEach((data , i)=>{
    searchList.value.innerHTML += `
        <article class="featured-card">
            <img src="/images/${data.image}" alt="Image of ${data.name}">
            <div class="featured-card-content">
                <div class="featured-card-header">
                    <h2>${data.name}</h2>
                </div>
                <p class="mb-1">${data.description}</p>
                <a href="#">View restaurant >></a>
            </div>
        </article>

    `;
    //add the rating stars
    const divElement = document.createElement('div');
    divElement.classList.add('rating');
    for(let i = 0; i < 5; i++){
      const star = document.createElement('img');
      star.src = '/images/star.png';
      star.classList.add('star');
      if(i >= data.rating){
        star.classList.add('star-disabled');
      }
      divElement.append(star);

    }

    searchList.value.querySelectorAll('.featured-card')[i].querySelector('.featured-card-header').appendChild(divElement);

  });


}

function showMore(e){
  showBtn.value.style.cssText = 'display:none';
  showBtn.value.setAttribute('hidden' ,'');
  fetchSearchRestaurants(15);
}
const search = function(e){
  //hide the show more button

  showBtn.value.style.cssText = 'display:none';
  showBtn.value.setAttribute('hidden' ,'');

  searchMode = document.querySelector('input[name="trigger-search"]:checked').value;
  //fetch all the restaurants
  if(searchMode === 'simple'){
    fetchSearchRestaurants(15 , 'simple');
  }else{
    fetchSearchRestaurants(15 , 'advanced');
  }
}
</script>

<template>
    <section aria-label="Hero Section" id="hero-section">
      <div class="container" id="hero-wrapper">
        <div id="hero-content" >
          <h1>DineEase:Exceptional Dining Awaits.</h1>
          <p>Dive into culinary wonders with DineEase. We curate top-rated restaurants, each with distinct flavors and ambiance. From international dishes to traditional delights and gastronomic adventures, find your perfect spot with DineEase.
          </p>
          <button class="btn"> <img src="../assets/images/Search Icon@2x.png" alt="Search Icon"> Explore Restaurants</button>

        </div>
        <div>
          <img src="../assets/images/Hero%20Illustration@3x.png" alt="Image of Hero Section" id="img-hero">
        </div>
      </div>
    </section>

    <!--        featured restaurants section-->
    <section aria-label="Featured Restaurant Section" id="featured-section" class="container">
      <h1>Featured Restaurants</h1>
      <small class="mb-1">Discover Unforgettable Dining Destinations</small>
      <div id="featured-restaurants" class="featured-container">
      </div>
    </section>
    <!--        guest experience section-->
    <section aria-label="Guest Experience Section" id="guest-section" >
      <div id="guest-wrapper" class="container">
        <img src="../assets/images/Quote mark@3x.png" alt="">
        <h1 class="mb-1">Delightful Experiences Shared by Our Guests</h1>
        <div class="guest-experiences">
          <div>
            <article class="guest-experience guest-experience-small">
              <svg width="142" height="116" viewBox="0 0 142 116" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="1" clip-path="url(#clip0_2540_7248)">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M141.377 18.1171C120.202 28.1823 109.615 40.0086 109.615 53.5965C118.64 54.603 126.103 58.1677 132.005 64.2907C137.906 70.4136 140.857 77.501 140.857 85.5531C140.857 94.1085 137.993 101.322 132.265 107.193C126.537 113.064 119.334 116 110.656 116C100.936 116 92.5185 112.184 85.4023 104.551C78.286 96.9183 74.728 87.6501 74.728 76.7462C74.728 44.0345 93.6465 18.4527 131.484 0L141.377 18.1171ZM66.6493 18.1171C45.3006 28.1823 34.6264 40.0086 34.6264 53.5965C43.8254 54.603 51.3755 58.1677 57.2767 64.2907C63.178 70.4136 66.1286 77.501 66.1286 85.5531C66.1286 94.1085 63.2214 101.322 57.4069 107.193C51.5924 113.064 44.3461 116 35.6678 116C25.948 116 17.5736 112.184 10.5441 104.551C3.51467 96.9183 0 87.6501 0 76.7462C0 44.0345 18.8317 18.4527 56.4957 0L66.6493 18.1171Z" fill="#7C3AED"/>
                </g>
                <defs>
                  <clipPath id="clip0_2540_7248">
                    <rect width="142" height="116" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <div class="guest-content">
                <p class="mb-1">Exquisite flavors, impeccable service, and a memorable ambiance – DineEase made our celebration truly special!</p>
                <strong>Robert & Emily</strong>
              </div>
            </article>
          </div>
          <div>
            <article class="guest-experience guest-experience-big">
              <svg width="142" height="116" viewBox="0 0 142 116" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="1" clip-path="url(#clip0_2540_7248)">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M141.377 18.1171C120.202 28.1823 109.615 40.0086 109.615 53.5965C118.64 54.603 126.103 58.1677 132.005 64.2907C137.906 70.4136 140.857 77.501 140.857 85.5531C140.857 94.1085 137.993 101.322 132.265 107.193C126.537 113.064 119.334 116 110.656 116C100.936 116 92.5185 112.184 85.4023 104.551C78.286 96.9183 74.728 87.6501 74.728 76.7462C74.728 44.0345 93.6465 18.4527 131.484 0L141.377 18.1171ZM66.6493 18.1171C45.3006 28.1823 34.6264 40.0086 34.6264 53.5965C43.8254 54.603 51.3755 58.1677 57.2767 64.2907C63.178 70.4136 66.1286 77.501 66.1286 85.5531C66.1286 94.1085 63.2214 101.322 57.4069 107.193C51.5924 113.064 44.3461 116 35.6678 116C25.948 116 17.5736 112.184 10.5441 104.551C3.51467 96.9183 0 87.6501 0 76.7462C0 44.0345 18.8317 18.4527 56.4957 0L66.6493 18.1171Z" fill="#7C3AED"/>
                </g>
                <defs>
                  <clipPath id="clip0_2540_7248">
                    <rect width="142" height="116" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <div class="guest-content">
                <p class="mb-1">With DineEase, we've uncovered culinary treasures right in our city. Every dining recommendation feels like an exclusive invitation to a world of flavors. We thought we knew our local dining scene, but DineEase introduced us to so much more.</p>

                <strong>Emma & Jacob</strong>
              </div>
            </article>
            <article class="guest-experience guest-experience-small">
              <svg width="142" height="116" viewBox="0 0 142 116" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="1" clip-path="url(#clip0_2540_7248)">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M141.377 18.1171C120.202 28.1823 109.615 40.0086 109.615 53.5965C118.64 54.603 126.103 58.1677 132.005 64.2907C137.906 70.4136 140.857 77.501 140.857 85.5531C140.857 94.1085 137.993 101.322 132.265 107.193C126.537 113.064 119.334 116 110.656 116C100.936 116 92.5185 112.184 85.4023 104.551C78.286 96.9183 74.728 87.6501 74.728 76.7462C74.728 44.0345 93.6465 18.4527 131.484 0L141.377 18.1171ZM66.6493 18.1171C45.3006 28.1823 34.6264 40.0086 34.6264 53.5965C43.8254 54.603 51.3755 58.1677 57.2767 64.2907C63.178 70.4136 66.1286 77.501 66.1286 85.5531C66.1286 94.1085 63.2214 101.322 57.4069 107.193C51.5924 113.064 44.3461 116 35.6678 116C25.948 116 17.5736 112.184 10.5441 104.551C3.51467 96.9183 0 87.6501 0 76.7462C0 44.0345 18.8317 18.4527 56.4957 0L66.6493 18.1171Z" fill="#7C3AED"/>
                </g>
                <defs>
                  <clipPath id="clip0_2540_7248">
                    <rect width="142" height="116" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <div class="guest-content">
                <p class="mb-1">DineEase guided us to hidden gems we never knew existed! We've become food adventurers, thanks to this platform.</p>

                <strong>Lisa & Mark</strong>
              </div>
            </article>
          </div>

        </div>
      </div>
    </section>

    <!--        search section-->
    <section aria-label="Search Dining Spot Section" id="dining-section">
      <div class="container">
        <h1>Find Your Perfect Dining Spot</h1>
        <small>Search by Cuisine, Location, or Name</small>

        <div class=" mb-1" id="search">
          <div id="simple-search-container">
            <label for="simple-search" class="visually-hidden"></label>
            <input type="text" name="simple-search" id="simple-search" placeholder="Search for restaurants" class="form-control">
            <label for="trigger-advance-search" id="trigger-advance-search-label"><img src="../assets/images/Filter Icon.png" alt="Filter Icon" aria-pressed="false" role="button"></label>
            <input type="radio" name="trigger-search" value="advance" id="trigger-advance-search" hidden>
          </div>
          <div id="advance-search-container">
            <div>
              <label for="cuisine" class="visually-hidden"></label>
              <select name="cuisine" id="cuisine"  class="form-control" required>
                <option value="" selected disabled>Cusine</option>
              </select>
            </div>
            <div>
              <label for="location" class="visually-hidden"></label>
              <input type="text" name="location" id="location" placeholder="Location"  class="form-control">
            </div>
            <div>
              <label for="name" class="visually-hidden"></label>
              <input type="text" name="name" id="name" placeholder="Name"  class="form-control">
            </div>
          </div>

          <button id="btn-search">
            <img src="../assets/images/Search Iconvector.svg" alt="Search Button" @click="search">
          </button>

        </div>
        <label role="button" id="btn-simple" for="trigger-simple">Simple Search</label>
        <input type="radio" name="trigger-search" id="trigger-simple" value="simple" checked hidden>
        <!--                    button to switch back to simple search-->
        <div id="dining-spots" class="featured-container">
        </div>
        <div id="btn-show" role="button" @click="showMore" ref="showBtn">
          Show more <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path id="chevron-down" fill-rule="evenodd" clip-rule="evenodd" d="M4.41107 6.91076C4.73651 6.58533 5.26414 6.58533 5.58958 6.91076L10.0003 11.3215L14.4111 6.91076C14.7365 6.58533 15.2641 6.58533 15.5896 6.91076C15.915 7.2362 15.915 7.76384 15.5896 8.08928L10.5896 13.0893C10.2641 13.4147 9.73651 13.4147 9.41107 13.0893L4.41107 8.08928C4.08563 7.76384 4.08563 7.2362 4.41107 6.91076Z" fill="#111827"/>
        </svg>

        </div>
      </div>
    </section>

</template>

<style scoped>

</style>