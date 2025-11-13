document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const clearAllBtn = document.getElementById('clear-all-btn');
    const todoContainer = document.getElementById('todo-container');
    const emptyState = document.getElementById('empty-state');
    const backgroundImage = document.getElementById('background-image');
    const homeLink = document.querySelector('a[href="#home"]');
    const logoLink = document.querySelector('.logo-link');
    const aboutLink = document.querySelector('a[href="#about"]');
    const aboutModal = document.getElementById('about-modal');
    const closeModal = document.querySelector('.close-modal');
    const langKorBtn = document.getElementById('lang-kor');
    const langEngBtn = document.getElementById('lang-eng');

    let todos = [];
    let currentLanguage = 'kor'; // 기본 언어: 한국어

    // 언어 데이터
    const languages = {
        kor: {
            title: 'To do List',
            placeholder: '새로운 할 일을 입력하세요',
            addButton: '할 일 추가',
            clearAllButton: '전체 삭제',
            emptyState: '아직 할 일이 없습니다. 새로운 할 일을 추가해보세요!',
            total: '전체:',
            completed: '완료:',
            remaining: '남음:',
            navHome: 'Home',
            navAbout: 'About',
            footerTitle: 'To do List',
            footerDesc: '간단하고 효율적인 할 일 관리 앱으로 일상 생활을 체계적으로 관리하세요. 생산성을 높이고 목표 달성을 지원합니다.',
            footerMenu: '메뉴',
            footerHome: '🏠 홈으로 이동',
            footerAbout: 'ℹ️ 앱 소개',
            footerAdd: '➕ 할 일 추가하기',
            footerFeatures: '특징',
            footerFeature1: '✅ 간편한 할 일 관리',
            footerFeature2: '📱 모바일 최적화',
            footerFeature3: '💾 자동 데이터 저장',
            footerFeature4: '🎯 생산성 향상',
            footerCopyright: '© 2025 To do List 앱. 모든 권리 보유.',
            modalTitle: 'To do List 앱',
            modalDescription: '간단하고 직관적인 할 일 관리 앱입니다. 일상 생활의 할 일들을 체계적으로 관리하고 생산성을 높여보세요.',
            features: {
                add: '간편한 추가',
                toggle: '완료 관리',
                storage: '데이터 저장',
                responsive: '반응형 디자인'
            },
            addDesc: '새로운 할 일을 빠르게 추가할 수 있습니다.',
            toggleDesc: '할 일 완료 상태를 쉽게 토글할 수 있습니다.',
            storageDesc: '브라우저 로컬 스토리지에 자동 저장됩니다.',
            responsiveDesc: '모든 기기에서 완벽하게 작동합니다.',
            howToTitle: '사용 방법',
            howToSteps: [
                '입력 필드에 새로운 할 일을 입력하세요.',
                '할 일 추가 버튼을 클릭하세요.',
                'To do List에서 완료된 항목을 체크하세요.',
                '삭제 버튼으로 불필요한 할 일을 제거하세요.'
            ],
            confirmDelete: '정말로 모든 할 일',
            confirmDeleteEnd: '개를 삭제하시겠습니까?',
            noTodosToDelete: '삭제할 할 일이 없습니다.'
        },
        eng: {
            title: 'Todo List',
            placeholder: 'Enter a new task',
            addButton: 'Add Task',
            clearAllButton: 'Clear All',
            emptyState: 'No tasks yet. Add a new task to get started!',
            total: 'Total:',
            completed: 'Done:',
            remaining: 'Left:',
            navHome: 'Home',
            navAbout: 'About',
            footerTitle: 'Todo List',
            footerDesc: 'A simple and efficient task management app to organize your daily life and boost productivity.',
            footerMenu: 'Menu',
            footerHome: '🏠 Go Home',
            footerAbout: 'ℹ️ About App',
            footerAdd: '➕ Add Task',
            footerFeatures: 'Features',
            footerFeature1: '✅ Easy Task Management',
            footerFeature2: '📱 Mobile Optimized',
            footerFeature3: '💾 Auto Data Save',
            footerFeature4: '🎯 Productivity Boost',
            footerCopyright: '© 2025 Todo List App. All rights reserved.',
            modalTitle: 'Todo List App',
            modalDescription: 'A simple and intuitive task management app. Organize your daily tasks and boost your productivity.',
            features: {
                add: 'Easy Adding',
                toggle: 'Task Management',
                storage: 'Data Storage',
                responsive: 'Responsive Design'
            },
            addDesc: 'Quickly add new tasks.',
            toggleDesc: 'Easily toggle task completion status.',
            storageDesc: 'Automatically saved to browser local storage.',
            responsiveDesc: 'Works perfectly on all devices.',
            howToTitle: 'How to Use',
            howToSteps: [
                'Enter a new task in the input field.',
                'Click the Add Task button.',
                'Check completed items in the task list.',
                'Remove unnecessary tasks with the delete button.'
            ],
            confirmDelete: 'Are you sure you want to delete all',
            confirmDeleteEnd: 'tasks?',
            noTodosToDelete: 'No tasks to delete.'
        }
    };

    // 배경 이미지 로드
    loadDailyBackgroundImage();

    // 로컬 스토리지에서 할 일 불러오기
    loadTodos();

    // 홈 링크 클릭 시 새로고침
    homeLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.reload();
    });

    // 로고 클릭 시 새로고침
    logoLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.reload();
    });

    // 모달 열기
    aboutLink.addEventListener('click', function(e) {
        e.preventDefault();
        aboutModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    // 모달 닫기
    closeModal.addEventListener('click', function() {
        aboutModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', function(e) {
        if (e.target === aboutModal) {
            aboutModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // 할 일 추가 이벤트
    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    // 전체 삭제 이벤트
    clearAllBtn.addEventListener('click', clearAllTodos);

    // 언어 전환 이벤트
    langKorBtn.addEventListener('click', () => switchLanguage('kor'));
    langEngBtn.addEventListener('click', () => switchLanguage('eng'));

    function addTodo() {
        const text = todoInput.value.trim();

        if (!text) {
            // 입력 필드에 에러 효과
            todoInput.style.borderColor = '#ff6b6b';
            todoInput.style.boxShadow = '0 0 0 3px rgba(255, 107, 107, 0.1)';
            setTimeout(() => {
                todoInput.style.borderColor = '#e9ecef';
                todoInput.style.boxShadow = 'none';
            }, 1000);
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        todos.push(todo);
        saveTodos();
        renderTodos();

        // 성공 애니메이션
        const addBtn = document.getElementById('add-btn');
        addBtn.classList.add('success');
        setTimeout(() => {
            addBtn.classList.remove('success');
        }, 600);

        // 입력 필드 초기화
        todoInput.value = '';
        todoInput.focus();
    }

    function toggleTodo(id) {
        const todo = todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            saveTodos();
            renderTodos();

            // 완료 상태 변경 시 성공 효과
            const checkbox = document.querySelector(`[data-id="${id}"]`);
            if (checkbox) {
                const todoItem = checkbox.closest('.todo-item');
                todoItem.classList.add('success');
                setTimeout(() => {
                    todoItem.classList.remove('success');
                }, 600);
            }
        }
    }

    function deleteTodo(id) {
        // 삭제 전 애니메이션 효과
        const todoItem = document.querySelector(`[data-id="${id}"]`).closest('.todo-item');
        todoItem.style.transform = 'translateX(100%)';
        todoItem.style.opacity = '0';

        setTimeout(() => {
            todos = todos.filter(t => t.id !== id);
            saveTodos();
            renderTodos();
        }, 300);
    }

    function clearAllTodos() {
        if (todos.length === 0) {
            alert(languages[currentLanguage].noTodosToDelete);
            return;
        }

        const confirmDelete = confirm(`${languages[currentLanguage].confirmDelete} ${todos.length} ${languages[currentLanguage].confirmDeleteEnd}`);
        if (confirmDelete) {
            todos = [];
            saveTodos();
            renderTodos();

            // 성공 피드백
            clearAllBtn.classList.add('success');
            setTimeout(() => {
                clearAllBtn.classList.remove('success');
            }, 600);
        }
    }

    function renderTodos() {
        // 기존 할 일 항목들 제거 (empty-state 제외)
        const existingTodos = todoContainer.querySelectorAll('.todo-item');
        existingTodos.forEach(item => item.remove());

        if (todos.length === 0) {
            emptyState.style.display = 'block';
            document.getElementById('stats').style.display = 'none';
            return;
        }

        emptyState.style.display = 'none';
        document.getElementById('stats').style.display = 'flex';

        todos.forEach(todo => {
            const todoItem = document.createElement('div');
            todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;

            todoItem.innerHTML = `
                <div class="todo-content">
                    <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} data-id="${todo.id}">
                    <span class="todo-text">${todo.text}</span>
                </div>
                <button class="delete-btn" data-id="${todo.id}">🗑️</button>
            `;

            todoContainer.appendChild(todoItem);
        });

        // 이벤트 리스너 추가
        document.querySelectorAll('.todo-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const id = parseInt(this.dataset.id);
                toggleTodo(id);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                deleteTodo(id);
            });
        });

        updateStats();
    }

    function updateStats() {
        const total = todos.length;
        const completed = todos.filter(todo => todo.completed).length;
        const remaining = total - completed;

        document.getElementById('total-count').textContent = total;
        document.getElementById('completed-count').textContent = completed;
        document.getElementById('remaining-count').textContent = remaining;
    }

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            todos = JSON.parse(savedTodos);
            renderTodos();
        }
    }

    function loadDailyBackgroundImage() {
        const today = new Date().toDateString();
        const cachedImage = localStorage.getItem('dailyBackground');

        if (cachedImage) {
            const cachedData = JSON.parse(cachedImage);
            if (cachedData.date === today) {
                // 오늘의 이미지가 이미 캐시되어 있음
                setBackgroundImage(cachedData.url);
                return;
            }
        }

        // 새로운 이미지 가져오기 (Lorem Picsum 사용 - 무료)
        const imageId = Math.floor(Math.random() * 1000) + 1; // 1-1000 사이의 랜덤 ID
        const imageUrl = `https://picsum.photos/1920/1080?random=${imageId}`;

        const imageData = {
            date: today,
            url: imageUrl
        };

        // 로컬 스토리지에 저장
        localStorage.setItem('dailyBackground', JSON.stringify(imageData));

        // 배경 이미지 설정
        setBackgroundImage(imageUrl);
    }

    function setBackgroundImage(url) {
        // 이미지 preload
        const img = new Image();
        img.onload = function() {
            backgroundImage.style.backgroundImage = `url(${url})`;
            backgroundImage.classList.add('loaded');
        };
        img.onerror = function() {
            console.error('배경 이미지 로드 실패, 기본 배경 사용');
            // 실패 시 기본 그라데이션 유지
        };
        img.src = url;
    }

    function switchLanguage(lang) {
        currentLanguage = lang;
        localStorage.setItem('language', lang);

        // 버튼 상태 업데이트
        langKorBtn.classList.toggle('active', lang === 'kor');
        langEngBtn.classList.toggle('active', lang === 'eng');

        // UI 언어 업데이트
        updateLanguageUI();
    }

    function updateLanguageUI() {
        const lang = languages[currentLanguage];

        // DOM 요소들을 한 번에 가져오기
        const h1 = document.querySelector('h1');
        const todoInput = document.getElementById('todo-input');
        const addBtn = document.getElementById('add-btn');
        const clearAllBtn = document.getElementById('clear-all-btn');
        const emptyStateP = document.querySelector('#empty-state p');
        const homeLink = document.querySelector('.nav-link[href="#home"]');
        const aboutLink = document.querySelector('.nav-link[href="#about"]');

        // 메인 타이틀
        if (h1) h1.textContent = lang.title;

        // 입력 필드
        if (todoInput) todoInput.placeholder = lang.placeholder;

        // 버튼들
        if (addBtn) addBtn.textContent = lang.addButton;
        if (clearAllBtn) clearAllBtn.textContent = lang.clearAllButton;

        // 빈 상태 메시지
        if (emptyStateP) emptyStateP.textContent = lang.emptyState;

        // 통계 레이블
        const stats = document.getElementById('stats');
        if (stats) {
            const statItems = stats.querySelectorAll('.stat-item span:first-child');
            if (statItems.length >= 3) {
                statItems[0].textContent = lang.total;
                statItems[1].textContent = lang.completed;
                statItems[2].textContent = lang.remaining;
            }
        }

        // 네비게이션
        if (homeLink) homeLink.textContent = lang.navHome;
        if (aboutLink) aboutLink.textContent = lang.navAbout;

        // 푸터
        const footerSections = document.querySelectorAll('.footer-section');
        if (footerSections.length >= 3) {
            // 첫 번째 섹션 (제목과 설명)
            footerSections[0].querySelector('h3').textContent = lang.footerTitle;
            footerSections[0].querySelector('p').textContent = lang.footerDesc;

            // 두 번째 섹션 (메뉴)
            footerSections[1].querySelector('h4').textContent = lang.footerMenu;
            const menuLinks = footerSections[1].querySelectorAll('li a');
            if (menuLinks.length >= 3) {
                menuLinks[0].textContent = lang.footerHome;
                menuLinks[1].textContent = lang.footerAbout;
                menuLinks[2].textContent = lang.footerAdd;
            }

            // 세 번째 섹션 (특징)
            footerSections[2].querySelector('h4').textContent = lang.footerFeatures;
            const featureLinks = footerSections[2].querySelectorAll('li');
            if (featureLinks.length >= 4) {
                featureLinks[0].textContent = lang.footerFeature1;
                featureLinks[1].textContent = lang.footerFeature2;
                featureLinks[2].textContent = lang.footerFeature3;
                featureLinks[3].textContent = lang.footerFeature4;
            }
        }

        // 푸터 저작권
        const footerCopyright = document.querySelector('.footer-bottom p');
        if (footerCopyright) {
            footerCopyright.textContent = lang.footerCopyright;
        }

        // 모달
        document.querySelector('.modal-header h2').textContent = lang.modalTitle;
        document.querySelector('.about-content h3').textContent = lang.modalTitle;
        document.querySelector('.about-content p').textContent = lang.modalDescription;

        // 특징들
        const featureItems = document.querySelectorAll('.feature-item');
        if (featureItems.length >= 4) {
            featureItems[0].querySelector('h4').textContent = lang.features.add;
            featureItems[0].querySelector('p').textContent = lang.addDesc;
            featureItems[1].querySelector('h4').textContent = lang.features.toggle;
            featureItems[1].querySelector('p').textContent = lang.toggleDesc;
            featureItems[2].querySelector('h4').textContent = lang.features.storage;
            featureItems[2].querySelector('p').textContent = lang.storageDesc;
            featureItems[3].querySelector('h4').textContent = lang.features.responsive;
            featureItems[3].querySelector('p').textContent = lang.responsiveDesc;
        }

        // 사용 방법
        const howToTitle = document.querySelector('.about-content h4');
        if (howToTitle) {
            howToTitle.textContent = lang.howToTitle;
        }

        const howToList = document.querySelectorAll('.about-content ol li');
        lang.howToSteps.forEach((step, index) => {
            if (howToList[index]) {
                howToList[index].textContent = step;
            }
        });
    }

    // 저장된 언어 불러오기
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && (savedLanguage === 'kor' || savedLanguage === 'eng')) {
        currentLanguage = savedLanguage;
    }
    updateLanguageUI();
    langKorBtn.classList.toggle('active', currentLanguage === 'kor');
    langEngBtn.classList.toggle('active', currentLanguage === 'eng');
});