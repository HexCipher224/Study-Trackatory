const STORAGE_KEYS = {
  profile: 'studyProfile',
  session: 'studyLoggedIn',
};

const defaultProfile = { username: 'student', password: 'study123' };

const getProfile = () => {
  const raw = localStorage.getItem(STORAGE_KEYS.profile);
  if (!raw) {
    localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(defaultProfile));
    return defaultProfile;
  }
  try {
    return JSON.parse(raw);
  } catch {
    localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(defaultProfile));
    return defaultProfile;
  }
};

const saveProfile = (profile) => {
  localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile));
};

const isLoggedIn = () => localStorage.getItem(STORAGE_KEYS.session) === 'true';
const setLogged = (value) => {
  if (value) {
    localStorage.setItem(STORAGE_KEYS.session, 'true');
  } else {
    localStorage.removeItem(STORAGE_KEYS.session);
  }
};

const redirectTo = (url) => {
  window.location.href = url;
};

const bindNavigation = () => {
  document.querySelectorAll('[data-logout="true"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      event.preventDefault();
      setLogged(false);
      redirectTo('index.html');
    });
  });
};

const bindLogin = () => {
  const form = document.getElementById('loginForm');
  const message = document.getElementById('loginMessage');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = form.querySelector('input[name="username"]')?.value.trim() ?? '';
    const password = form.querySelector('input[name="password"]')?.value ?? '';
    const stored = getProfile();
    if (username === stored.username && password === stored.password) {
      setLogged(true);
      if (message) message.textContent = 'Login successful. Redirecting...';
      setTimeout(() => redirectTo('tracker.html'), 400);
      return;
    }
    if (message) message.textContent = 'Wrong username or password.';
  });
};

const bindRegister = () => {
  const form = document.getElementById('registerForm');
  const message = document.getElementById('registerMessage');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = form.querySelector('input[name="username"]')?.value.trim() ?? '';

    const password = form.querySelector('input[name="password"]')?.value ?? '';
    if (!username || !password) {
      if (message) message.textContent = 'Please add both username and password.';
      return;
    }
    saveProfile({ username, password });
    setLogged(true);
    if (message) message.textContent = 'Profile saved. Redirecting to Tracker...';
    setTimeout(() => redirectTo('tracker.html'), 400);
  });
};

const protectPages = () => {
  const isPublic = document.body?.dataset?.public === 'true';
  if (document.getElementById('loginForm') || isPublic) return;
  if (!isLoggedIn()) {
    redirectTo('index.html');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  bindNavigation();
  bindLogin();
  bindRegister();
  protectPages();
});
