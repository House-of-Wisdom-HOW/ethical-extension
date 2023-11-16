var couponDisplay = document.createElement('div');
var couponHTML = '<p>Be the first to submit a coupon for this site</p>';
couponDisplay.className = '_coupon__list';
couponDisplay.innerHTML = '<h1>Coupons</h1><p>Browse coupons below that have been used for <strong>domain</strong></p>'
+'<p style="font-style:italic;">Click any coupon to copy &amp; use</p>'
+'<ul>'+couponHTML+'</ul>';
couponDisplay.style.display = 'block';
document.body.appendChild(couponDisplay);