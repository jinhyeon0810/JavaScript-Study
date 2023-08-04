// do something!
//theme.css 를 참조하여 해당 star-rating-container DOM 생성 후 묶음

export const StarRating = $container => {
    const starRateCon = document.createElement('div');
    const starRateCon2 = document.createElement('div');
   
    starRateCon.className = 'star-rating-container';
    starRateCon2.className = 'star-rating-container';
    

    const starRating = document.getElementsByClassName('star-rating')[0];
    const starRating2 = document.getElementsByClassName('star-rating')[1];
    
  
    starRating.appendChild(starRateCon);
    starRating2.appendChild(starRateCon2);
      
  
   
    let cssUrl = "star-rating/theme.css";
    let headDOM = document.getElementsByTagName('head')[0];
    let link = document.createElement('link');
    let script = document.getElementsByTagName('script')[0];
    link.rel = "stylesheet";
    link.href = cssUrl;

    headDOM.insertBefore(link,script);

    
    


}