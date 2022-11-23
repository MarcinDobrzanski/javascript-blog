{
  const titleClickHandler = function (event) {
    event.preventDefault();

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    const clickedElement = this;
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);

    /* add class 'active' to the correct article */

    targetArticle.classList.add('active');

  };
  // const links = document.querySelectorAll('.titles a');
  // console.log(links);
  // for (let link of links) {
  // 	link.addEventListener('click', titleClickHandler);
  // }

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post .post-author',
    optTagsListSelector = '.tags',
    optCloudClassCount = 4,
    optCloudClassPrefix = 'tag-size-';

  const generateTitleLinks = function (customSelector = '') {
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);

    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html = '';

    for (let article of articles) {
      /* get the article id */
      const articleId = article.getAttribute('id');

      /* find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* get the title from the title element */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      /* create HTML of the link */
      //titleList.insertAdjacentHTML('afterbegin', linkHTML);
      /* insert link into titleList */
      html = html + linkHTML;
    }

    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();




  const calculateTagsParams = function (tags) {
    const params = {};
    console.log('params', params);
    params.max = 0;
    params.min = 999999;

    for (let tag in tags) {
      console.log(tag + ' is used ' + tags[tag] + ' times');
      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);
    }

    return params;
  };


  const calculateTagClass = function (count, params) {
    classNumber = Math.floor(((count - params.min) / (params.max - params.min)) * optCloudClassCount + 1);
    return optCloudClassPrefix + classNumber;
  };


  const generateTags = function () {
    /* [DONE] create a new variable allTags with an empty object */
    let allTags = {};
    console.log('allTags', allTags);

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      const tagsList = article.querySelector(optArticleTagsSelector);

      /* make html variable with empty string */
      let html = '';
      console.log('html', html);

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {

        /* generate HTML of the link */
        const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
        console.log('tagHTML', tagHTML);

        /* add generated code to html variable */
        html = html + tagHTML;

        /* [DONE] check if this link is NOT already in allTags */
        if (!allTags[tag]) {

          /* [DONE] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsList.innerHTML = html;
      /* END LOOP: for every article: */
    }
    /* [DONE] find list of tags in right column */

    const tagList = document.querySelector(optTagsListSelector);

    const tagsParams = calculateTagsParams(allTags);

    console.log('tagsParams:', tagsParams);

    /* [DONE] create variable for all links HTML code */
    let allTagsHTML = '';
    console.log('allTagsHTML', allTagsHTML);

    /* [DONE] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /* [DONE] generate code of a link and add it to allTagsHTML */
      const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li> ';

      console.log('tagLinkHTML:', tagLinkHTML);

      allTagsHTML += tagLinkHTML;

      /* [done] END LOOP: for each tag in allTags: */
    }
    /*[DONE] add HTML from allTagsHTML to tagList */

    tagList.innerHTML = allTagsHTML;

  };

  generateTags();

  const tagClickHandler = function (event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('ClickedElement: ', href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log(tag);
    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log(activeTags);
    /* START LOOP: for each active tag link */
    for (let activeTag of activeTags) {

      /* remove class active */
      activeTag.classList.remove('active');

      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {

      /* add class active */
      tagLink.classList.add('active');
      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };

  const addClickListenersToTags = function () {
    /* find all links to tags */
    const linksTag = document.querySelectorAll('a[href^="#tag-"]');
    /* START LOOP: for each link */
    for (let linkTag of linksTag) {

      /* add tagClickHandler as event listener for that link */
      linkTag.addEventListener('click', tagClickHandler);
      /* END LOOP: for each link */
    }
  };
  addClickListenersToTags();

  const generateAuthors = function () {
    /* find all autors */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);
    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find autor wrapper */
      const articleAuthor = article.querySelector(optArticleAuthorSelector);
      /* get autor from data-autor attribute */
      const authorsName = article.getAttribute('data-author');
      console.log(articleAuthor);
      /* make a new constant with HTML autor */
      const authorHTML = '<a href="#author-' + authorsName + '">by ' + authorsName + '</a>';
      console.log(authorHTML);
      //   /* END LOOP: for each tag */
      /* insert HTML of all the links into the tags wrapper */
      articleAuthor.innerHTML = authorHTML;
      /* END LOOP: for every article: */
    }
  };

  generateAuthors();

  const authorClickHandler = function (event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('ClickedElement: ', href);
    /* make a new constant "tag" and extract author from the "href" constant */
    const author = href.replace('#author-', '');
    console.log(author);
    /* find all autors links with class active */
    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

    /* START LOOP: for each active author link */
    for (let activeAuthor of activeAuthors) {

      /* remove class active */
      activeAuthor.classList.remove('active');

      /* END LOOP: for each active author link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found author link */
    for (let authorLink of authorLinks) {

      /* add class active */
      authorLink.classList.add('active');
      /* END LOOP: for each found author link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  };

  const addClickListenersToAuthors = function () {
    /* find all links to autors */
    const authorLinks = document.querySelectorAll('a[href^="#author-"]');
    /* START LOOP: for each link */
    for (let authorLink of authorLinks) {

      /* add tagClickHandler as event listener for that link */
      authorLink.addEventListener('click', authorClickHandler);
      /* END LOOP: for each link */
    }
  };
  addClickListenersToAuthors();

}
