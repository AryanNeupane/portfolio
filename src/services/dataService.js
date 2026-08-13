import { db } from './firebase';
import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, query, where, orderBy, Timestamp, serverTimestamp } from 'firebase/firestore';
import { SEED_PROJECTS, SEED_BLOG_POSTS, PERSONAL_PROFILE } from '../data/seedData';

// Storage keys for offline / development fallback
const STORAGE_PROJECTS_KEY = 'aryan_portfolio_projects';
const STORAGE_BLOG_KEY = 'aryan_portfolio_blog';
const STORAGE_MESSAGES_KEY = 'aryan_portfolio_messages';

// Helper to initialize local storage if empty
const initLocalStorage = () => {
  if (!localStorage.getItem(STORAGE_PROJECTS_KEY)) {
    localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(SEED_PROJECTS));
  }
  if (!localStorage.getItem(STORAGE_BLOG_KEY)) {
    localStorage.setItem(STORAGE_BLOG_KEY, JSON.stringify(SEED_BLOG_POSTS));
  }
  if (!localStorage.getItem(STORAGE_MESSAGES_KEY)) {
    localStorage.setItem(STORAGE_MESSAGES_KEY, JSON.stringify([]));
  }
};

initLocalStorage();

// ==========================================
// PROJECTS SERVICE
// ==========================================
export const getProjects = async (includeUnpublished = false) => {
  try {
    if (db) {
      const q = includeUnpublished 
        ? query(collection(db, 'projects'), orderBy('createdAt', 'desc'))
        : query(collection(db, 'projects'), where('published', '==', true), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    }
  } catch (error) {
    console.warn("Firestore query failed, using local fallback:", error.message);
  }
  
  // Fallback
  const stored = JSON.parse(localStorage.getItem(STORAGE_PROJECTS_KEY) || '[]');
  return includeUnpublished ? stored : stored.filter(p => p.published);
};

export const getProjectBySlug = async (slug) => {
  try {
    if (db) {
      const q = query(collection(db, 'projects'), where('slug', '==', slug));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const docData = snapshot.docs[0];
        return { id: docData.id, ...docData.data() };
      }
    }
  } catch (error) {
    console.warn("Firestore query failed for project slug:", error.message);
  }

  const stored = JSON.parse(localStorage.getItem(STORAGE_PROJECTS_KEY) || '[]');
  return stored.find(p => p.slug === slug) || null;
};

export const saveProject = async (projectData) => {
  const isEdit = Boolean(projectData.id);
  const now = new Date().toISOString();
  
  try {
    if (db) {
      if (isEdit) {
        const ref = doc(db, 'projects', projectData.id);
        await updateDoc(ref, { ...projectData, updatedAt: serverTimestamp() });
        return projectData.id;
      } else {
        const docRef = await addDoc(collection(db, 'projects'), { 
          ...projectData, 
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp() 
        });
        return docRef.id;
      }
    }
  } catch (error) {
    console.warn("Firestore save failed, saving to local fallback:", error.message);
  }

  // Local fallback
  const stored = JSON.parse(localStorage.getItem(STORAGE_PROJECTS_KEY) || '[]');
  if (isEdit) {
    const updated = stored.map(p => p.id === projectData.id ? { ...projectData, updatedAt: now } : p);
    localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(updated));
    return projectData.id;
  } else {
    const newId = 'proj-' + Date.now();
    const newProject = { ...projectData, id: newId, createdAt: now, updatedAt: now };
    stored.unshift(newProject);
    localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(stored));
    return newId;
  }
};

// ==========================================
// BLOG SERVICE
// ==========================================
export const getBlogPosts = async (includeUnpublished = false) => {
  try {
    if (db) {
      const q = includeUnpublished
        ? query(collection(db, 'blogPosts'), orderBy('publishedAt', 'desc'))
        : query(collection(db, 'blogPosts'), where('published', '==', true), orderBy('publishedAt', 'desc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    }
  } catch (error) {
    console.warn("Firestore blog query failed, using fallback:", error.message);
  }

  const stored = JSON.parse(localStorage.getItem(STORAGE_BLOG_KEY) || '[]');
  return includeUnpublished ? stored : stored.filter(b => b.published);
};

export const getBlogPostBySlug = async (slug) => {
  try {
    if (db) {
      const q = query(collection(db, 'blogPosts'), where('slug', '==', slug));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
      }
    }
  } catch (error) {
    console.warn("Firestore blog slug query failed:", error.message);
  }

  const stored = JSON.parse(localStorage.getItem(STORAGE_BLOG_KEY) || '[]');
  return stored.find(b => b.slug === slug) || null;
};

export const saveBlogPost = async (postData) => {
  const isEdit = Boolean(postData.id);
  const now = new Date().toISOString();
  
  try {
    if (db) {
      if (isEdit) {
        const ref = doc(db, 'blogPosts', postData.id);
        await updateDoc(ref, { ...postData, updatedAt: serverTimestamp() });
        return postData.id;
      } else {
        const docRef = await addDoc(collection(db, 'blogPosts'), { 
          ...postData, 
          publishedAt: serverTimestamp(),
          updatedAt: serverTimestamp() 
        });
        return docRef.id;
      }
    }
  } catch (error) {
    console.warn("Firestore blog save failed, using local fallback:", error.message);
  }

  const stored = JSON.parse(localStorage.getItem(STORAGE_BLOG_KEY) || '[]');
  if (isEdit) {
    const updated = stored.map(b => b.id === postData.id ? { ...postData, updatedAt: now } : b);
    localStorage.setItem(STORAGE_BLOG_KEY, JSON.stringify(updated));
    return postData.id;
  } else {
    const newId = 'post-' + Date.now();
    const newPost = { ...postData, id: newId, publishedAt: now, updatedAt: now };
    stored.unshift(newPost);
    localStorage.setItem(STORAGE_BLOG_KEY, JSON.stringify(stored));
    return newId;
  }
};

// ==========================================
// CONTACT MESSAGES SERVICE
// ==========================================
export const submitContactMessage = async (messageData) => {
  const payload = {
    ...messageData,
    read: false,
    createdAt: new Date().toISOString()
  };

  try {
    if (db) {
      const docRef = await addDoc(collection(db, 'contactMessages'), {
        ...messageData,
        read: false,
        createdAt: serverTimestamp()
      });
      return { success: true, id: docRef.id };
    }
  } catch (error) {
    console.warn("Firestore contact message submission failed, saving locally:", error.message);
  }

  const stored = JSON.parse(localStorage.getItem(STORAGE_MESSAGES_KEY) || '[]');
  const newMsg = { id: 'msg-' + Date.now(), ...payload };
  stored.unshift(newMsg);
  localStorage.setItem(STORAGE_MESSAGES_KEY, JSON.stringify(stored));
  return { success: true, id: newMsg.id };
};

export const getContactMessages = async () => {
  try {
    if (db) {
      const q = query(collection(db, 'contactMessages'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    }
  } catch (error) {
    console.warn("Firestore contact messages query failed, using local fallback:", error.message);
  }

  return JSON.parse(localStorage.getItem(STORAGE_MESSAGES_KEY) || '[]');
};
