const titleClickHandler = function (event) {
	event.preventDefault();
	console.log('Link was clicked!');
	console.log(event);

	/* [DONE] remove class 'active' from all article links  */

	const activeLinks = document.querySelectorAll('.titles a.active');

	for (let activeLink of activeLinks) {
		activeLink.classList.remove('active');
	}

	/* [IN PROGRESS] add class 'active' to the clicked link */
	const clickedElement = this;
	{
		clickedElement.classList.add('active');
	}
	console.log('clickedElement:', clickedElement);

	/* [DONE] remove class 'active' from all articles */

	const activeArticles = document.querySelectorAll('.posts article.active');

	for (let activeArticle of activeArticles) {
		activeArticle.classList.remove('active');
	}

	/* get 'href' attribute from the clicked link */

	const articleSelector = clickedElement.getAttribute('href');
	console.log(articleSelector);

	/* find the correct article using the selector (value of 'href' attribute) */

	/* add class 'active' to the correct article */
};

const links = document.querySelectorAll('.titles a');

for (let link of links) {
	link.addEventListener('click', titleClickHandler);
}
