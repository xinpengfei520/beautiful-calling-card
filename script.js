document.addEventListener('DOMContentLoaded', function() {
    const inputs = {
        name: document.getElementById('name'),
        title: document.getElementById('title'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        wechat: document.getElementById('wechat'),
        description: document.getElementById('description'),
        theme: document.getElementById('theme')
    };

    const cardElements = {
        name: document.getElementById('card-name'),
        title: document.getElementById('card-title'),
        email: document.getElementById('card-email'),
        phone: document.getElementById('card-phone'),
        wechat: document.getElementById('card-wechat'),
        description: document.getElementById('card-description')
    };

    const card = document.getElementById('card');
    const downloadBtn = document.getElementById('download-btn');

    function updateCard() {
        cardElements.name.textContent = inputs.name.value || '姓名';
        cardElements.title.textContent = inputs.title.value || '职位';
        cardElements.email.textContent = inputs.email.value || '邮箱';
        cardElements.phone.textContent = inputs.phone.value || '电话';
        cardElements.wechat.textContent = inputs.wechat.value || '微信';
        cardElements.description.textContent = inputs.description.value || '个人简介';

        updateTheme();
    }

    function updateTheme() {
        const theme = inputs.theme.value;
        
        card.className = 'card';
        
        switch(theme) {
            case 'blue':
                card.classList.add('theme-blue');
                break;
            case 'green':
                card.classList.add('theme-green');
                break;
            case 'purple':
                card.classList.add('theme-purple');
                break;
            case 'orange':
                card.classList.add('theme-orange');
                break;
        }
    }

    Object.values(inputs).forEach(input => {
        input.addEventListener('input', updateCard);
    });

    downloadBtn.addEventListener('click', downloadCard);

    function downloadCard() {
        const originalBoxShadow = card.style.boxShadow;
        const originalTransform = card.style.transform;
        
        card.style.boxShadow = 'none';
        card.style.transform = 'scale(1)';

        html2canvas(card, {
            scale: 3,
            backgroundColor: null,
            logging: false,
            useCORS: true
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = `个人名片-${inputs.name.value || '名片'}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();

            card.style.boxShadow = originalBoxShadow;
            card.style.transform = originalTransform;
        }).catch(error => {
            console.error('下载失败:', error);
            alert('下载失败，请重试');
            card.style.boxShadow = originalBoxShadow;
            card.style.transform = originalTransform;
        });
    }

    updateCard();
});