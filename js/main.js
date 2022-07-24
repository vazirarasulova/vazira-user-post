const elUserList = document.querySelector(".user__list");
const elPostList = document.querySelector(".post");
const elCommentList = document.querySelector(".comment");
const elUserTemplate = document.querySelector(".user__template").content;
const elPostTemplate = document.querySelector(".post__template").content;
const elCommentTemplate = document.querySelector(".comment__template").content;
const fragmentUser = document.createDocumentFragment();
const fragmentPost = document.createDocumentFragment();
const fragmentComment = document.createDocumentFragment();

const renderUser = (arr, element) => {
  element.innerHTML = "";

  arr.forEach(item => {

    let location = "https://www.google.com/maps/place/"

    const newTemplate = elUserTemplate.cloneNode(true);

    newTemplate.querySelector(".user__item").dataset.userId = item.id;
    newTemplate.querySelector(".user__id").textContent = item.id;
    newTemplate.querySelector(".user__name").textContent = item.name;
    newTemplate.querySelector(".user__username").textContent = item.username;
    newTemplate.querySelector(".user__geo-link").textContent = "user geolocation";
    newTemplate.querySelector(".user__geo-link").href = `${location} + ${item.address.geo.lat}, ${item.address.geo.lng}`;
    newTemplate.querySelector(".user__address-link").textContent = "user address";
    newTemplate.querySelector(".user__address-link").href = `${location} + ${item.address.street},${item.address.suite},${item.address.city},${item.address.zipcode},  `
    newTemplate.querySelector(".user__company-info").textContent = "Company Info"
    newTemplate.querySelector(".user__company-name").textContent = item.company.name;
    newTemplate.querySelector(".user__phrase").textContent = item.company.catchPhrase;
    newTemplate.querySelector(".user__bs").textContent = item.company.bs;
   
    newTemplate.querySelector(".user__link-box");
    newTemplate.querySelector(".user__phone").href = `tel: ${item.phone}`;
    newTemplate.querySelector(".user__phone").src = "/images/phone.png";

    newTemplate.querySelector(".user__email").href = `mailto: ${item.email}`;
    newTemplate.querySelector(".user__email").src = "/images/email.png";

    newTemplate.querySelector(".user__website").href = `https:// + ${item.website}`;
    newTemplate.querySelector(".user__website").src = "/images/website.png";
    


    fragmentUser.appendChild(newTemplate)
  });
  element.appendChild(fragmentUser);
}


const renderPost = (arr, element) => {
  element.innerHTML = "";

  arr.forEach(item => {


    const newTemplate = elPostTemplate.cloneNode(true);

    newTemplate.querySelector(".post__item").dataset.postId = item.id;
    newTemplate.querySelector(".post__id").textContent = item.id;
    newTemplate.querySelector(".post__title").textContent = item.title.split(" ").slice(0 , 3).join(" ");
    newTemplate.querySelector(".post__text").textContent = item.body;
    

    fragmentPost.appendChild(newTemplate)
  })
  element.appendChild(fragmentPost);
}


const renderComment = (arr, element) => {
  element.innerHTML = "";

  arr.forEach(item => {

    const newTemplate = elCommentTemplate.cloneNode(true);

    newTemplate.querySelector(".comment__item").dataset.postId = item.id;
    newTemplate.querySelector(".comment__id").textContent = item.id;
    newTemplate.querySelector(".comment__name").textContent = item.name.split(" ").slice(0 , 3).join(" ");
    newTemplate.querySelector(".comment__text").textContent = item.body;
    newTemplate.querySelector(".comment__email").href = `mailto: ${item.email}`;
    newTemplate.querySelector(".comment__email").src = "/images/email.png";

    fragmentComment.appendChild(newTemplate)
  })
  element.appendChild(fragmentComment);
}


async function getUser() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const data = await response.json();
  if (data) {
    renderUser(data, elUserList);
    console.log(data);
  }
}
getUser()


elUserList.addEventListener("click", async(evt) =>{
 
  if(evt.target.matches(".user__item")){

  let userId = evt.target.dataset.userId;
  let response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  const data = await response.json();
  console.log(data);
  renderPost(data, elPostList);
}
 
})


elPostList.addEventListener("click", async(evt) =>{
 
  if(evt.target.matches(".post__item")){

  let postId = evt.target.dataset.postId;
  let response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  const data = await response.json();
  console.log(data);
  renderComment(data, elCommentList);
}
 
})

