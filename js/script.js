/* dynamic */
const loadAllData = async (category) => {
  //make dynamic search by if else
  /*   if (category) {
    console.log(
      `https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`
    );
  } else {
    console.log(`https://openapi.programming-hero.com/api/retro-forum/posts`);
  } */
  //make dynamic search by turnery
  console.log(
    `https://openapi.programming-hero.com/api/retro-forum/posts${
      category ? `?category=${category}` : ""
    }`
  );
  const response = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts${
      category ? `?category=${category}` : ""
    }`
  );
  const data = await response.json();
  loadAllPost(data.posts);
};
loadAllData();

const loadAllPost = (posts) => {
  const postContainer = document.getElementById("dynamic-section");
  document.getElementById("dynamic-section").innerHTML="";

  posts.forEach((post) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="rounded-2xl bg-[#F3F3F5]">
            <div class="flex flex-col md:flex-row gap-5 p-6">
                <div class="relative w-28">
                    <img src="${post.image}" alt="${
      post.title
    }" class="h-28 w-28 rounded-md" />
                    <div class="absolute border-transparent rounded-full w-4 h-4 ${
                      post.isActive ? "bg-green-600" : "bg-red-600"
                    } -top-1 -right-1"></div>
                </div>
                <div class="space-y-2">
                    <div class="flex gap-8">
                        <p>#${post.category}</p>
                        <p>Author: ${post.author.name}</p>
                    </div>
                    <h2 class="text-2xl font-bold">${post.title}</h2>
                    <p class="text-sm">${post.description}</p>
                    <div class="divider"></div>
                    <div class="flex justify-between items-center gap-10">
                        <div class="flex gap-8">
                            <p>${post.comment_count} Comments</p>
                            <p>${post.view_count} Views</p>
                            <p>${post.posted_time}</p>
                        </div>
                        <button id="addToList" onclick="markAsRead('${
                          post.description
                        }','${
      post.view_count
    }')" class="bg-green-600 btn-circle rounded-full h-8 w-8">
                        <i class="fa-solid fa-envelope text-xl"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    postContainer.appendChild(div);
  });
};

const handleSearchByCategory = () => {
  const searchText = document.getElementById("searchPosts").value;
  /* calling dynamic by its Parameter  */
  loadAllData(searchText);
};

const markAsRead = (description, view_count) => {
  // console.log(description,view_count);
  let viewCount = parseInt(view_count);
  const markAsReadContainer = document.getElementById("markAsReadContainer");
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="flex p-2 bg-white rounded-lg justify-between items-center">
        <p>${description}</p>
        <div>
            <i class="fa-regular fa-eye"></i>
            <p>${viewCount}</p>
        </div>
    </div>
    `;
  markAsReadContainer.appendChild(div);
  clickHandle();
};

const clickHandle = () => {
  const handleCount = document.getElementById("markAsReadCounter").innerText;
  const convertCount = parseInt(handleCount);
  const sum = convertCount + 1;
  document.getElementById("markAsReadCounter").innerText = sum;
};
/* latest post */
const latestPost = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/latest-posts`
  );
  const data = await response.json();
  showLatestPost(data);
};
latestPost();

const showLatestPost = (data) => {
  const latestPostContainer = document.getElementById("latest-post-container");
  data.forEach((post) => {
    const div = document.createElement("div");
    div.innerHTML = `
          <div
            class="card lg:w-96 w-full bg-base-100 shadow-lg rounded-3xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-primary"
          >
            <figure class="lg:px-6 px-4 pt-4 lg:pt-8">
              <img
                src="${post.cover_image}"
                alt="Cover image for Post Title"
                class="rounded-xl w-full object-cover"
              />
            </figure>
            <div class="p-5 lg:p-8 space-y-5">
              <p class="opacity-50 text-start text-sm lg:text-base">
                <i class="fa-solid fa-calendar-days me-2"></i> ${post.author?.posted_date ?? "No Publish Date"}
              </p>
              <h2 class="card-title text-start font-bold text-xl lg:text-2xl">
                ${post.title}
              </h2>
              <p class="text-start text-sm lg:text-base opacity-90">
                ${post.description}
              </p>
              <div class="card-actions flex gap-5 items-center">
                <div class="avatar">
                  <div
                    class="lg:w-14 w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                  >
                    <img src="${post.profile_image}" alt="Author Profile" />
                  </div>
                </div>
                <div>
                  <h3 class="text-start font-semibold text-base lg:text-lg">
                   ${post.author.name}
                  </h3>
                  <p class="text-start opacity-60 text-sm lg:text-base">
                    ${post.author?.designation ?? "Unknown"}
                  </p>
                </div>
              </div>
            </div>
          </div>

    `
    latestPostContainer.appendChild(div);
  });
};
