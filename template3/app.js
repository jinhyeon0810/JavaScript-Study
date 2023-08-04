import { StarRating } from './star-rating/index.js';

const $containers = [...document.querySelectorAll('.star-rating')];
const $currentRatings = document.querySelectorAll('.current-rating > span');



$containers.forEach(($container, i) => {
  // star-rating 컨테이너 요소의 참조를 StarRating 함수에 전달해 star 요소들로 구성된 star-rating 요소를 동적 생성한다.
  StarRating($container);
  const maxRating = $container.getAttribute('data-max-rating');
  const starRatingCon = $container.getElementsByClassName('star-rating-container')[0];
 
  //star아이콘 생성 
  for (let i = 0; i < maxRating; i++) {
    const starIcon = document.createElement('i');
    starIcon.className = 'bx bxs-star';
    starIcon.setAttribute('star', `${i + 1}`);
    starRatingCon.appendChild(starIcon);

    const starIcons = $container.querySelectorAll('i'); 
    let selectedRating = 0;

    for(let i =0; i< starIcons.length; i++){
      //마우스호버
      starIcons[i].addEventListener('mouseover', () => {
        for(let j=0; j<= i; j++){
        starIcons[j].classList.add('hovered');
      }
      })
      //마우스out
      starIcons[i].addEventListener('mouseout', ()=>{
        for(let j =0; j<= i; j++){
          starIcons[j].classList.remove('hovered');
        }
      })
      //클릭시 color변경
      starIcons[i].addEventListener('click', ()=>{
        starIcons.forEach((starIcon)=>{
          starIcon.classList.remove('selected')
        })
        for(let j =0; j<=i; j++){
          starIcons[j].classList.add('selected');
        } 
        //클릭시 rating 결정 , 결정되면 ratingevent통해 외부방출
        selectedRating = Number(starIcons[i].getAttribute('star'));
        console.log(selectedRating);

      const ratingEvent = new CustomEvent('rating-change', {
         detail: { star: selectedRating } 
        });
      $container.dispatchEvent(ratingEvent);
      })
    }
  }
  // 이벤트 'rating-change'를 캐치해 화면에 표시한다.
  $container.addEventListener('rating-change', e => {
    const rating = e.detail.star;
    $currentRatings[i].textContent = rating;
  });
 });









