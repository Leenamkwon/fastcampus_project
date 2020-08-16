const postsContainer = document.getElementById('posts-container');
const loader = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

// Fetch posts from API
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  return data;
}

// Show posts in DOM
async function showPosts() {
  try {
    const posts = await getPosts();

    posts.forEach((post) => {
      const postEl = document.createElement('div');
      postEl.classList.add('post');
      postEl.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>
    `;

      postsContainer.appendChild(postEl);
    });
  } catch {
    console.log('err');
  }
}

async function showLoader() {
  loader.classList.add('show');

  // await page++;
  // await loader.classList.remove('show');
  // await showPosts();
  setTimeout(() => {
    loader.classList.remove('show');
    page++;
    setTimeout(showPosts, 300);
  }, 600);
}

const debounce = (fn, delay = 650) => {
  let timeOut;
  return (...arg) => {
    if (timeOut) {
      clearTimeout(timeOut);
    }

    timeOut = setTimeout(() => {
      fn.apply(null, arg);
    }, delay);
  };
};

function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach((post) => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const senetence = post.querySelector('.post-body').innerText.toUpperCase();
    if (title.indexOf(term) > -1 || senetence.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }

    if (!term.length) post.style.display = 'none';
  });
}

showPosts();

filter.addEventListener('input', debounce(filterPosts));

window.addEventListener('scroll', () => {
  // scrollHeight 도큐먼트 전체 높이, 화면 사이즈에 영향을 받지 않음
  // scrollTop 스크롤이 뷰포트에 맞춰서 상단 값, 스크롤을 내릴수록 값이 올라감
  // clientHeight 사용자 화면에서의 높이값, 즉 브라우저를 늘리거나 줄이면 전체 높이값이 달라짐
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoader();
  }
});
