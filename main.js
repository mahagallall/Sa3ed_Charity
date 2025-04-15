const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('visible');
    } else {
        navbar.classList.remove('visible');
    }
});

let currentSlide = 0;
const sliderTrack = document.querySelector('.slider-track');
const dots = document.querySelectorAll('.dot');

function updateSlider() {
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
        if (index === currentSlide) {
            const img = slide.querySelector('img');
            if (img) {
                img.style.opacity = 1; 
            }
        }
    });
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function changeSlide(direction) {
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    updateSlider();
}

function goToSlide(n) {
    currentSlide = n;
    updateSlider();
}
setInterval(() => changeSlide(1), 7000);

let isLoggedIn = false; 
const projectsData = {
    'القاهرة': [
        {
            title: 'مشروع إطعام الفقراء',
            description: 'توفير وجبات غذائية للفقراء والمحتاجين في القاهرة.',
            progress: 75,
            image: 'images/people.jpg'
        },
        {
            title: 'مشروع بناء المدارس',
            description: 'بناء مدارس جديدة في المناطق الفقيرة لتحسين التعليم.',
            progress: 50,
            image: 'images/school.jpg'
        },
        {
            title: 'مشروع توفير الأدوية',
            description: 'توفير الأدوية الأساسية للمحتاجين في المناطق النائية.',
            progress: 60,
            image: 'images/med.jpg'
        }
    ],
    'الإسكندرية': [
        {
            title: 'مشروع كسوة الشتاء',
            description: 'توزيع ملابس شتوية على الفقراء والمحتاجين في الإسكندرية.',
            progress: 80,
            image: 'images/winter.jpg'
        },
        {
            title: 'مشروع دعم الأيتام',
            description: 'تقديم الدعم المالي والنفسي للأيتام في الإسكندرية.',
            progress: 40,
            image: 'images/homles.jpg'
        },
        {
            title: 'مشروع تحسين المساكن',
            description: 'تحسين ظروف المعيشة في المناطق الفقيرة.',
            progress: 55,
            image: 'images/buildings.jpg'
        }
    ],
    'الجيزة': [
        {
            title: 'مشروع مياه نظيفة',
            description: 'توفير مياه نظيفة وصالحة للشرب في المناطق الريفية.',
            progress: 70,
            image: 'images/water.jpg'
        },
        {
            title: 'مشروع الرعاية الصحية',
            description: 'تقديم خدمات الرعاية الصحية المجانية للمحتاجين.',
            progress: 65,
            image: 'images/health.jpg'
        },
        {
            title: 'مشروع التعليم المجاني',
            description: 'توفير فرص التعليم المجاني للأطفال الفقراء.',
            progress: 45,
            image: 'images/learning.jpg'
        }
    ],
    'المنصورة': [
        {
            title: 'مشروع توزيع السلال الغذائية',
            description: 'توزيع سلال غذائية على الأسر المحتاجة في المنصورة.',
            progress: 85,
            image: 'images/foodd.jpg'
        },
        {
            title: 'مشروع دعم الأرامل',
            description: 'تقديم الدعم المالي والنفسي للأرامل في المنصورة.',
            progress: 50,
            image: 'images/dive.jpg'
        },
        {
            title: 'مشروع بناء المستشفيات',
            description: 'بناء مستشفيات جديدة في المناطق الفقيرة لتحسين الرعاية الصحية.',
            progress: 30,
            image: 'images/hospital.jpg'
        }
    ],
    'أسيوط': [
        {
            title: 'مشروع توفير الكتب المدرسية',
            description: 'توفير الكتب المدرسية للأطفال الفقراء في أسيوط.',
            progress: 90,
            image: 'images/books.jpg'
        },
        {
            title: 'مشروع دعم الحرف اليدوية',
            description: 'تقديم الدعم المالي والتدريب للحرفيين في أسيوط.',
            progress: 60,
            image: 'images/handmade.jpg'
        },
        {
            title: 'مشروع تحسين البنية التحتية',
            description: 'تحسين البنية التحتية في المناطق الفقيرة.',
            progress: 40,
            image: 'images/bulis.jpg'
        }
    ],
    'الأقصر': [
        {
            title: 'مشروع توفير الرعاية الطبية',
            description: 'تقديم الرعاية الطبية المجانية للمحتاجين في الأقصر.',
            progress: 75,
            image: 'images/health2.jpg'
        },
        {
            title: 'مشروع دعم التعليم',
            description: 'توفير الدعم المالي والتعليمي للطلاب الفقراء.',
            progress: 55,
            image: 'images/learning.jpg'
        },
        {
            title: 'مشروع بناء المساكن',
            description: 'بناء مساكن جديدة للأسر الفقيرة في الأقصر.',
            progress: 65,
            image: 'images/buildings.jpg'
        }
    ]
};

function openDonateModal(projectTitle, province) {
    if (!isUserLoggedIn()) {
        alert('يرجى تسجيل الدخول أولاً.');
        openLoginModal();
        return;
    }
    const donateSection = document.getElementById('donateSection');
    const donateProvince = document.getElementById('donateProvince');
    
    donateProvince.value = province;
    updateSections();
    donateSection.value = projectTitle;
    var myModal = new bootstrap.Modal(document.getElementById('donateModal'));
    myModal.show();
}

function updateSections() {
    const province = document.getElementById('donateProvince').value;
    const sectionSelect = document.getElementById('donateSection');
    sectionSelect.innerHTML = '<option value="">اختر القسم</option>';

    if (projectsData[province]) {
        projectsData[province].forEach(project => {
            const option = document.createElement('option');
            option.value = project.title;
            option.textContent = project.title;
            sectionSelect.appendChild(option);
        });
    }
}

function validateDonateForm() {
    const amount = parseInt(document.getElementById('donateAmount').value);
    const province = document.getElementById('donateProvince').value;
    const section = document.getElementById('donateSection').value;
    const frequency = document.getElementById('donateFrequency').value;

    if (isNaN(amount) || province === '' || section === '' || frequency === '') {
        alert('يرجى ملء جميع الحقول');
        return false;
    }

    updateProjectProgress(province, section, amount);

    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
        const userDonations = JSON.parse(localStorage.getItem('userDonations')) || [];
        userDonations.push({ amount, province, section, frequency });
        localStorage.setItem('userDonations', JSON.stringify(userDonations));
        alert(`تم تسجيل تبرعك ${frequency === 'one-time' ? 'مرة واحدة' : frequency === 'monthly' ? 'شهرياً' : 'سنويًا'} بنجاح.`);
    } else {
        alert('يجب التسجيل أولا');
        return false;
    }

    return false;
}

function updateProjectProgress(province, section, amount) {
    const project = projectsData[province].find(p => p.title === section);

    project.progress += (amount / 1000) * 100; 

    if (project.progress >= 100) {
        project.progress = 100;
        showNotification('المشروع اكتمل بنسبة 100%!');
    }

    changeProvince(province);
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function changeProvince(province) {
    const cardsContainer = document.getElementById('cardsContainer');
    const provincesBar = document.getElementById('provincesBar');

    Array.from(provincesBar.children).forEach(button => {
        button.classList.remove('active');
    });

    event.target.classList.add('active');

    cardsContainer.innerHTML = '';

    if (projectsData[province]) {
        projectsData[province].forEach(project => {
            const card = document.createElement('div');
            card.className = 'col-md-4 mb-4';
            card.innerHTML = `
                <div class="card h-100 shadow" onclick="showCardDetails('${project.title}', '${project.description}', ${project.progress}, '${project.image}')">
                    <img src="${project.image}" class="card-img-top grayscale" alt="${project.title}">
                    <div class="card-body">
                        <i class="fas fa-hand-holding-heart icon text-success mb-3"></i>
                        <h2 class="card-title">${project.title}</h2>
                        <p class="card-text">${project.description}</p>
                        <div class="progress mb-3">
                            <div class="progress-bar bg-success" role="progressbar" style="width: ${project.progress}%;" aria-valuenow="${project.progress}" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <p class="card-text"><small class="text-muted">${project.progress}% من الهدف</small></p>
                        <button class="btn btn-success" onclick="openDonateModal('${project.title}', '${province}')">تبرع الآن</button>
                    </div>
                </div>
            `;
            cardsContainer.appendChild(card);
        });
    }
}

function showCardDetails(title, description, progress, image) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDescription').innerText = description;
    document.getElementById('modalImage').src = image;
    document.getElementById('modalProgressBar').style.width = progress + '%';
    document.getElementById('modalProgressBar').setAttribute('aria-valuenow', progress);
    document.getElementById('modalProgressText').innerText = progress + '% من الهدف';

    var myModal = new bootstrap.Modal(document.getElementById('cardDetailModal'));
    myModal.show();
}

function openLoginModal() {
    var myModal = new bootstrap.Modal(document.getElementById('loginModal'));
    myModal.show();
}

function validateLoginForm() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (email === '' || password === '') {
        alert('يرجى ملء جميع الحقول');
        return false;
    }

    const storedUser = JSON.parse(localStorage.getItem(email));
    if (storedUser && storedUser.password === password) {
        localStorage.setItem('currentUser', JSON.stringify(storedUser));
        showNotification('تم تسجيل الدخول بنجاح!');
        var myModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        myModal.hide();
        return true;
    } else {
        alert('بيانات تسجيل الدخول غير صحيحة');
        return false;
    }
}

function validateRegisterForm() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    if (name === '' || email === '' || password === '' || confirmPassword === '') {
        alert('يرجى ملء جميع الحقول');
        return false;
    }

    if (password !== confirmPassword) {
        alert('كلمتا المرور غير متطابقتين');
        return false;
    }

    const user = { name, email, password };
    localStorage.setItem(email, JSON.stringify(user));
    localStorage.setItem('currentUser', JSON.stringify(user));
    showNotification('تم التسجيل بنجاح! يمكنك الآن تسجيل الدخول.');
    var myModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
    myModal.hide();
    return true;
}

function isUserLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
}

function openProfileModal() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const profileContent = document.getElementById('profileContent');
    if (user) {
        profileContent.innerHTML = `
            <h2>الاسم: ${user.name}</h2>
            <p>البريد الإلكتروني: ${user.email}</p>
            <h3>تفاصيل التبرعات:</h3>
            <ul id="donationDetails"></ul>
        `;
        const donationDetails = document.getElementById('donationDetails');
        const userDonations = JSON.parse(localStorage.getItem('userDonations')) || [];
        donationDetails.innerHTML = ''; // تفريغ القائمة قبل إضافة التبرعات
        userDonations.forEach(donation => {
            const li = document.createElement('li');
            li.innerText = `تبرع بمبلغ ${donation.amount} لقسم ${donation.section} في ${donation.province}`;
            donationDetails.appendChild(li);
        });
    } else {
        profileContent.innerHTML = '<p>يرجى تسجيل الدخول لعرض معلومات البروفايل.</p>';
    }

    var myModal = new bootstrap.Modal(document.getElementById('profileModal'));
    myModal.show();
}

function updateProfilePage() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const profileContent = document.getElementById('profileContent');
    if (user) {
        profileContent.innerHTML = `
            <h2>الاسم: ${user.name}</h2>
            <p>البريد الإلكتروني: ${user.email}</p>
            <h3>تفاصيل التبرعات:</h3>
            <ul id="donationDetails"></ul>
        `;
        const donationDetails = document.getElementById('donationDetails');
        const userDonations = JSON.parse(localStorage.getItem('userDonations')) || [];
        donationDetails.innerHTML = ''; // تفريغ القائمة قبل إضافة التبرعات
        userDonations.forEach(donation => {
            const li = document.createElement('li');
            li.innerText = `تبرع بمبلغ ${donation.amount} لقسم ${donation.section} في ${donation.province}`;
            donationDetails.appendChild(li);
        });
    } else {
        profileContent.innerHTML = '<p>يرجى تسجيل الدخول لعرض معلومات البروفايل.</p>';
    }
}

window.onload = () => {
    // تصفير Local Storage عند تحميل الصفحة
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userDonations');

    changeProvince('القاهرة');
    if (window.location.pathname.endsWith('profile.html')) {
        updateProfilePage();
    }
};

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});