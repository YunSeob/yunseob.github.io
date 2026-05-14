document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 내비게이션 부드러운 스크롤 (Smooth Scroll)
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // 상단 고정 네비게이션 바 높이만큼 오프셋(여백)을 주고 스크롤
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. 카드 클릭 시 상세 내용 확장 (Accordion)
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        // 카드 내의 'summary(보이는 부분)'를 클릭했을 때 이벤트 발생
        const summary = card.querySelector('.card-summary');
        
        summary.addEventListener('click', () => {
            // 다른 열려있는 카드를 닫고 싶다면 아래 두 줄의 주석을 해제하세요. (선택사항)
            // cards.forEach(c => { if(c !== card) c.classList.remove('active'); });

            // 현재 클릭한 카드의 'active' 클래스를 껐다 켰다(toggle) 합니다.
            card.classList.toggle('active');
            
            // 화살표 텍스트 변경
            const icon = card.querySelector('.expand-icon');
            if(card.classList.contains('active')){
                icon.innerHTML = '▲ 닫기';
            } else {
                icon.innerHTML = '▼ 더 보기';
            }
        });
    });

    console.log("Portfolio scripts loaded.");
});